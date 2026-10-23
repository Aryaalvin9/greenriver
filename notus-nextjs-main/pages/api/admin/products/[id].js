import { requireAdmin } from "lib/adminAuth";
import { deleteProduct, updateProduct } from "lib/store";

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  const { id } = req.query;
  if (req.method === "PUT") {
    const { name, desc, image, active } = req.body || {};
    if (!name?.trim()) return res.status(400).json({ message: "Product name is required" });
    const product = await updateProduct(id, { name: name.trim(), desc: String(desc || "").trim(), image: String(image || "/img/imageProduct.png").trim(), active: Boolean(active) });
    return product ? res.status(200).json({ product }) : res.status(404).json({ message: "Product not found" });
  }
  if (req.method === "DELETE") return (await deleteProduct(id)) ? res.status(200).json({ success: true }) : res.status(404).json({ message: "Product not found" });
  return res.status(405).json({ message: "Method not allowed" });
}
