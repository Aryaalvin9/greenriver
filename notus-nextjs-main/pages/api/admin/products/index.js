import { requireAdmin } from "lib/adminAuth";
import { createProduct, getProducts } from "lib/store";

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  if (req.method === "GET") return res.status(200).json({ products: await getProducts({ includeInactive: true }) });
  if (req.method === "POST") {
    const { name, desc = "", image = "/img/imageProduct.png", active = true } = req.body || {};
    if (!name?.trim()) return res.status(400).json({ message: "Product name is required" });
    const product = await createProduct({ name: name.trim(), desc: desc.trim(), image: image.trim() || "/img/imageProduct.png", active: Boolean(active) });
    return res.status(201).json({ product });
  }
  return res.status(405).json({ message: "Method not allowed" });
}
