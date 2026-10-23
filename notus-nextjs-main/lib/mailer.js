import nodemailer from "nodemailer";

const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));

export async function sendInquiryEmail(inquiry) {
  if (!process.env.SENDINBLUE_EMAIL || !process.env.SENDINBLUE_API_KEY) return { sent: false, reason: "not_configured" };
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: { user: process.env.SENDINBLUE_EMAIL, pass: process.env.SENDINBLUE_API_KEY },
  });
  const recipient = process.env.INQUIRY_EMAIL || "commercial@greenriverindonesia.com";
  const subject = `New product inquiry: ${inquiry.productName}`;
  const text = `Product: ${inquiry.productName}\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone}\nCompany: ${inquiry.company || "-"}\nMessage: ${inquiry.message || "-"}`;
  const html = `<h2>New product inquiry</h2><p><strong>Product:</strong> ${escapeHtml(inquiry.productName)}</p><p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p><p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p><p><strong>Phone:</strong> ${escapeHtml(inquiry.phone)}</p><p><strong>Company:</strong> ${escapeHtml(inquiry.company || "-")}</p><p><strong>Message:</strong><br>${escapeHtml(inquiry.message || "-").replace(/\n/g, "<br>")}</p>`;
  const info = await transporter.sendMail({ from: process.env.INQUIRY_FROM_EMAIL || process.env.SENDINBLUE_EMAIL, to: recipient, replyTo: inquiry.email, subject, text, html });
  return { sent: true, messageId: info.messageId };
}

export function createWhatsAppUrl(inquiry) {
  const number = (process.env.WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
  if (!number) return null;
  const message = [`Halo PT Green River Indonesia, saya ingin mengajukan produk:`, ``, `Produk: ${inquiry.productName}`, `Nama: ${inquiry.name}`, `Perusahaan: ${inquiry.company || "-"}`, `Email: ${inquiry.email}`, `Telepon: ${inquiry.phone}`, `Pesan: ${inquiry.message || "-"}`, ``, `ID Pengajuan: ${inquiry.id}`].join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
