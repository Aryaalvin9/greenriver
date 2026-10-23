import { createInquiry, getProducts, updateInquiry } from "lib/store";
import { createWhatsAppUrl, sendInquiryEmail } from "lib/mailer";
import { allowRequest } from "lib/rateLimit";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
  if (!allowRequest(req, { key: "inquiry", limit: 5, windowMs: 10 * 60 * 1000 })) return res.status(429).json({ message: "Too many inquiries. Please try again later." });
  const { productId, name, email, phone, company = "", message = "" } = req.body || {};
  if (!name?.trim() || !emailPattern.test(email || "") || !phone?.trim()) {
    return res.status(400).json({ message: "Name, valid email and phone are required" });
  }
  if ([name, email, phone, company, message].some((value) => String(value || "").length > 2000)) {
    return res.status(400).json({ message: "One or more fields are too long" });
  }

  let productName = "General inquiry";
  if (productId) {
    const products = await getProducts();
    const product = products.find((item) => item.id === productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    productName = product.name;
  }

  const inquiry = await createInquiry({ productId, productName, name: name.trim(), email: email.trim(), phone: phone.trim(), company: company.trim(), message: message.trim() });
  let emailSent = false;
  try {
    const result = await sendInquiryEmail(inquiry);
    emailSent = result.sent;
    if (emailSent) await updateInquiry(inquiry.id, { emailSent: true });
  } catch (error) {
    console.error("Inquiry saved, but email delivery failed:", error);
  }

  return res.status(201).json({ inquiryId: inquiry.id, emailSent, whatsappUrl: createWhatsAppUrl(inquiry) });
}
