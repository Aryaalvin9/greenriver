import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { requireAdmin } from "lib/adminAuth";

const allowedTypes = {
  "image/jpeg": { extension: "jpg", valid: (buffer) => buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff },
  "image/png": { extension: "png", valid: (buffer) => buffer.subarray(0, 8).toString("hex") === "89504e470d0a1a0a" },
  "image/webp": { extension: "webp", valid: (buffer) => buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WEBP" },
};

export const config = { api: { bodyParser: { sizeLimit: "6mb" } } };

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { dataUrl } = req.body || {};
  const match = typeof dataUrl === "string" && dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if (!match || !allowedTypes[match[1]]) return res.status(400).json({ message: "Only JPG, PNG and WebP images are allowed" });

  const type = match[1];
  const buffer = Buffer.from(match[2], "base64");
  if (!buffer.length || buffer.length > 4 * 1024 * 1024) return res.status(400).json({ message: "Image must be smaller than 4 MB" });
  if (!allowedTypes[type].valid(buffer)) return res.status(400).json({ message: "The uploaded file is not a valid image" });

  const filename = `${crypto.randomUUID()}.${allowedTypes[type].extension}`;
  const directory = process.env.GREENRIVER_UPLOAD_DIR || path.join(process.cwd(), "public", "uploads", "products");
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(path.join(directory, filename), buffer, { flag: "wx" });
  return res.status(201).json({ url: `/uploads/products/${filename}`, filename, size: buffer.length });
}
