import { ADMIN_COOKIE, createSessionToken, credentialsConfigured, sessionCookie, verifyCredentials } from "lib/adminAuth";
import { allowRequest } from "lib/rateLimit";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
  if (!allowRequest(req, { key: "admin-login", limit: 10, windowMs: 15 * 60 * 1000 })) return res.status(429).json({ message: "Too many login attempts. Please try again later." });
  if (!credentialsConfigured()) return res.status(503).json({ message: "Admin credentials are not configured" });
  const { username, password } = req.body || {};
  if (!verifyCredentials(username, password)) return res.status(401).json({ message: "Invalid username or password" });
  res.setHeader("Set-Cookie", sessionCookie(createSessionToken(username)));
  return res.status(200).json({ username, cookie: ADMIN_COOKIE });
}
