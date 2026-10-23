import crypto from "crypto";

export const ADMIN_COOKIE = "greenriver_admin";
const sessionDuration = 60 * 60 * 12;

function secret() {
  return process.env.ADMIN_SESSION_SECRET || "";
}

function safeEqual(left, right) {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function signature(value) {
  return crypto.createHmac("sha256", secret()).update(value).digest("base64url");
}

export function credentialsConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && secret());
}

export function verifyCredentials(username, password) {
  if (!credentialsConfigured()) return false;
  return safeEqual(username, process.env.ADMIN_USERNAME || "admin") && safeEqual(password, process.env.ADMIN_PASSWORD);
}

export function createSessionToken(username) {
  const payload = Buffer.from(JSON.stringify({ username, expires: Date.now() + sessionDuration * 1000 })).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function verifySessionToken(token = "") {
  if (!secret()) return null;
  const [payload, providedSignature] = token.split(".");
  if (!payload || !providedSignature || !safeEqual(signature(payload), providedSignature)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return session.expires > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export function sessionFromRequest(req) {
  const cookies = Object.fromEntries((req.headers.cookie || "").split(";").filter(Boolean).map((part) => {
    const index = part.indexOf("=");
    return [part.slice(0, index).trim(), decodeURIComponent(part.slice(index + 1))];
  }));
  return verifySessionToken(cookies[ADMIN_COOKIE]);
}

export function requireAdmin(req, res) {
  const session = sessionFromRequest(req);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return null;
  }
  return session;
}

export function sessionCookie(token) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${ADMIN_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${sessionDuration}${secure}`;
}

export function clearSessionCookie() {
  return `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
