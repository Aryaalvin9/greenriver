import { trackVisit } from "lib/store";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
  const { visitorId, pathname } = req.body || {};
  if (!visitorId || !pathname || String(visitorId).length > 100 || String(pathname).length > 300) return res.status(400).json({ message: "Invalid tracking event" });
  return res.status(200).json(await trackVisit({ visitorId: String(visitorId), pathname: String(pathname) }));
}
