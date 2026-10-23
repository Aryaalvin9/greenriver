export default function handler(req, res) {
  res.status(410).json({ message: "This endpoint has moved to /api/inquiries" });
}
