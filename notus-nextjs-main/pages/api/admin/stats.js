import { requireAdmin } from "lib/adminAuth";
import { getDashboardStats } from "lib/store";

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });
  return res.status(200).json({ stats: await getDashboardStats() });
}
