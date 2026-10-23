import { requireAdmin } from "lib/adminAuth";
import { updateInquiry } from "lib/store";

const statuses = ["new", "contacted", "closed"];

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  if (req.method !== "PATCH") return res.status(405).json({ message: "Method not allowed" });
  const { status } = req.body || {};
  if (!statuses.includes(status)) return res.status(400).json({ message: "Invalid status" });
  const inquiry = await updateInquiry(req.query.id, { status });
  return inquiry ? res.status(200).json({ inquiry }) : res.status(404).json({ message: "Inquiry not found" });
}
