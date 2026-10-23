import { getProducts } from "lib/store";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ products: await getProducts() });
}
