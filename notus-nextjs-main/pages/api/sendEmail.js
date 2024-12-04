import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { to, subject, text, html } = req.body;

    try {
      // Konfigurasi Nodemailer dengan Sendinblue
      const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com", // Host SMTP Sendinblue
        port: 587, // Port SMTP Sendinblue
        secure: false, // Gunakan TLS
        auth: {
          user: process.env.SENDINBLUE_EMAIL, // Email akun Sendinblue
          pass: process.env.SENDINBLUE_API_KEY, // API Key Sendinblue
        },
      });

      // Kirim email
      const info = await transporter.sendMail({
        from: `setyohanung.sh@gmail.com`, // Pengirim
        to, // Penerima
        subject, // Subjek email
        text, // Isi email dalam format teks
        html, // Isi email dalam format HTML
      });

      console.log("Email sent: ", info.messageId);
      res.status(200).json({ message: "Email berhasil dikirim" });
    } catch (error) {
      console.error("Error sending email: ", error);
      res.status(500).json({ message: "Gagal mengirim email", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
