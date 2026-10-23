import { sessionFromRequest } from "lib/adminAuth";

export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });
  const session = sessionFromRequest(req);
  if (!session) return res.status(401).json({ message: "Unauthorized" });
  return res.status(200).json({ username: session.username });
}
