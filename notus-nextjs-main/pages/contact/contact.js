import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

const initialForm = { name: "", email: "", phone: "", message: "", company: "" };

export default function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const sendEmail = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to send inquiry");
      toast.success("Thank you. Your inquiry has been sent.", { autoClose: 3000 });
      setFormData(initialForm);
      if (data.whatsappUrl) window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      window.setTimeout(() => router.push("/"), 3000);
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast.error("We could not send your inquiry. Please try again.", { autoClose: 4000 });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | PT Green River Indonesia</title>
        <meta name="description" content="Contact the PT Green River Indonesia commercial team for product and sourcing inquiries." />
      </Head>
      <IndexNavbar />
      <main className="contact-modern">
        <div className="modern-shell contact-grid">
          <section className="contact-copy">
            <span className="eyebrow">Start a conversation</span>
            <h1>How can we support your business?</h1>
            <p>Share your requirements, application or product inquiry. Our commercial team will review the details and get back to you.</p>
            <div className="contact-details">
              <div className="contact-detail">
                <i className="fas fa-envelope" aria-hidden="true" />
                <div><strong>Email</strong><a href="mailto:commercial@greenriverindonesia.com">commercial@greenriverindonesia.com</a></div>
              </div>
              <div className="contact-detail">
                <i className="fas fa-location-dot" aria-hidden="true" />
                <div><strong>Office</strong><a href="https://maps.app.goo.gl/BU4iUyem7rxo744G6" target="_blank" rel="noreferrer">Jl. Daan Mogot KM 19, Tangerang, Banten</a></div>
              </div>
              <div className="contact-detail">
                <i className="fas fa-clock" aria-hidden="true" />
                <div><strong>Response</strong><span>Our team will respond as soon as possible during business hours.</span></div>
              </div>
            </div>
          </section>

          <section className="contact-card">
            <div className="contact-card-head"><h2>Send an inquiry</h2><p>Complete the form below and we&apos;ll take it from there.</p></div>
            <form onSubmit={sendEmail}>
              <div className="contact-form-grid">
                <div className="field"><label htmlFor="name">Full name</label><input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required /></div>
                <div className="field"><label htmlFor="company">Company</label><input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Company name" /></div>
                <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" required /></div>
                <div className="field"><label htmlFor="phone">Phone number</label><input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+62" required /></div>
                <div className="field full"><label htmlFor="message">How can we help?</label><textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about the product, quantity or application you need..." required /></div>
              </div>
              <button className="submit-button" type="submit" disabled={submitting}>{submitting ? "Sending inquiry..." : "Send inquiry"}</button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" />
    </>
  );
}
