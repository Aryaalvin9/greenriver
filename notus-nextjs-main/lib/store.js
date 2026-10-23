import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { defaultProducts } from "./defaultProducts";

const dataDirectory = process.env.GREENRIVER_DATA_DIR || path.join(process.cwd(), "data", "runtime");
let writeQueue = Promise.resolve();

const normalizeProduct = (product, index = 0) => ({
  id: product.id || `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${index + 1}`,
  name: product.name,
  desc: product.desc || "",
  image: product.image || "/img/imageProduct.png",
  active: product.active !== false,
  createdAt: product.createdAt || new Date(0).toISOString(),
  updatedAt: product.updatedAt || new Date(0).toISOString(),
});

const seededProducts = defaultProducts.map(normalizeProduct);

async function readJson(filename, fallback) {
  try {
    return JSON.parse(await fs.readFile(path.join(dataDirectory, filename), "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

async function writeJson(filename, data) {
  const operation = async () => {
    await fs.mkdir(dataDirectory, { recursive: true });
    const target = path.join(dataDirectory, filename);
    const temporary = `${target}.${process.pid}.tmp`;
    await fs.writeFile(temporary, JSON.stringify(data, null, 2));
    await fs.rename(temporary, target);
  };
  writeQueue = writeQueue.then(operation, operation);
  return writeQueue;
}

export async function getProducts({ includeInactive = false } = {}) {
  const products = await readJson("products.json", seededProducts);
  return includeInactive ? products : products.filter((product) => product.active !== false);
}

export async function createProduct(input) {
  const products = await getProducts({ includeInactive: true });
  const now = new Date().toISOString();
  const product = normalizeProduct({ ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now });
  products.unshift(product);
  await writeJson("products.json", products);
  return product;
}

export async function updateProduct(id, input) {
  const products = await getProducts({ includeInactive: true });
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) return null;
  products[index] = normalizeProduct({ ...products[index], ...input, id, updatedAt: new Date().toISOString() }, index);
  await writeJson("products.json", products);
  return products[index];
}

export async function deleteProduct(id) {
  const products = await getProducts({ includeInactive: true });
  const next = products.filter((product) => product.id !== id);
  if (next.length === products.length) return false;
  await writeJson("products.json", next);
  return true;
}

export async function createInquiry(input) {
  const inquiries = await readJson("inquiries.json", []);
  const inquiry = {
    id: crypto.randomUUID(),
    productId: input.productId || null,
    productName: input.productName || "General inquiry",
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company || "",
    message: input.message || "",
    status: "new",
    emailSent: false,
    createdAt: new Date().toISOString(),
  };
  inquiries.unshift(inquiry);
  await writeJson("inquiries.json", inquiries);
  return inquiry;
}

export async function getInquiries() {
  return readJson("inquiries.json", []);
}

export async function updateInquiry(id, input) {
  const inquiries = await getInquiries();
  const index = inquiries.findIndex((item) => item.id === id);
  if (index === -1) return null;
  inquiries[index] = { ...inquiries[index], ...input, id };
  await writeJson("inquiries.json", inquiries);
  return inquiries[index];
}

export async function trackVisit({ visitorId, pathname }) {
  const traffic = await readJson("traffic.json", []);
  const day = new Date().toISOString().slice(0, 10);
  const exists = traffic.some((event) => event.visitorId === visitorId && event.pathname === pathname && event.day === day);
  if (!exists) {
    traffic.push({ id: crypto.randomUUID(), visitorId, pathname, day, createdAt: new Date().toISOString() });
    await writeJson("traffic.json", traffic.slice(-20000));
  }
  return { recorded: !exists };
}

export async function getDashboardStats() {
  const [traffic, inquiries, products] = await Promise.all([
    readJson("traffic.json", []),
    getInquiries(),
    getProducts({ includeInactive: true }),
  ]);
  const uniqueVisitors = new Set(traffic.map((event) => event.visitorId)).size;
  const lastSevenDays = Array.from({ length: 7 }, (_, offset) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - offset));
    const day = date.toISOString().slice(0, 10);
    return { day, visits: traffic.filter((event) => event.day === day).length };
  });
  return {
    pageViews: traffic.length,
    uniqueVisitors,
    inquiries: inquiries.length,
    newInquiries: inquiries.filter((item) => item.status === "new").length,
    activeProducts: products.filter((product) => product.active).length,
    totalProducts: products.length,
    lastSevenDays,
  };
}
