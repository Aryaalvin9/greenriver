import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { defaultProducts } from "lib/defaultProducts.js";

const emptyForm = { name: "", email: "", phone: "", company: "", message: "" };
const fallbackProducts = defaultProducts.map((product, index) => ({ ...product, id: `fallback-${index}` }));

export default function Product() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Unable to load products")))
      .then((data) => setProducts(data.products))
      .catch(() => setProducts(fallbackProducts));
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return products.filter((product) => product.name.toLowerCase().includes(query));
  }, [products, searchQuery]);

  const openInquiry = (product) => {
    setSelectedProduct(product);
    setFormData(emptyForm);
    setResult(null);
  };
  const closeInquiry = () => { if (!submitting) setSelectedProduct(null); };

  const submitInquiry = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...formData, productId: selectedProduct.id }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to submit inquiry");
      setResult({ success: true, ...data });
      setFormData(emptyForm);
      if (data.whatsappUrl) window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      setResult({ success: false, message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head><title>Product Catalog | PT Green River Indonesia</title><meta name="description" content="Explore and inquire about chemical products from PT Green River Indonesia." /></Head>
      <IndexNavbar />
      <main className="modern-page">
        <section className="page-hero">
          <div className="modern-shell page-hero-grid">
            <div><span className="eyebrow">Product catalog</span><h1>Solutions for every stage of your operation.</h1></div>
            <p>Choose a product and send an inquiry. Your request will be recorded, emailed to our team and continued through WhatsApp.</p>
          </div>
        </section>
        <section className="catalog-section">
          <div className="modern-shell">
            <div className="catalog-toolbar">
              <div className="catalog-search"><i className="fas fa-search" aria-hidden="true" /><input type="search" placeholder="Search products..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} aria-label="Search products by name" /></div>
              <span className="catalog-count">Showing {filteredProducts.length} of {products.length} products</span>
            </div>
            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <article className="product-card product-card-action" key={product.id} onClick={() => openInquiry(product)}>
                    <div className="product-card-image"><img alt="" src={product.image} /></div>
                    <div className="product-card-copy">
                      <span>Chemical product</span><h2>{product.name}</h2><p>{product.desc}</p>
                      <button type="button" className="product-inquiry-button">Ajukan produk <span aria-hidden="true">→</span></button>
                    </div>
                  </article>
                ))}
              </div>
            ) : <div className="empty-state"><strong>No products found.</strong><p>Try another product name or clear your search.</p></div>}
          </div>
        </section>
      </main>
      <Footer />
      {selectedProduct && (
        <div className="inquiry-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeInquiry()}>
          <section className="inquiry-modal" role="dialog" aria-modal="true" aria-labelledby="inquiry-title">
            <button type="button" className="inquiry-close" aria-label="Close inquiry form" onClick={closeInquiry}>×</button>
            <span className="eyebrow">Product inquiry</span><h2 id="inquiry-title">{selectedProduct.name}</h2>
            <p className="inquiry-intro">Complete your details. We will save the inquiry, notify our team by email and open WhatsApp for the next step.</p>
            {result?.success ? (
              <div className="inquiry-success">
                <span>✓</span><h3>Pengajuan berhasil dicatat</h3><p>ID pengajuan: {result.inquiryId}</p>
                {result.whatsappUrl ? <a className="submit-button inquiry-wa-link" href={result.whatsappUrl} target="_blank" rel="noreferrer">Continue on WhatsApp</a> : <p>Nomor WhatsApp perusahaan belum dikonfigurasi.</p>}
              </div>
            ) : (
              <form onSubmit={submitInquiry}>
                <div className="contact-form-grid">
                  <div className="field"><label htmlFor="inquiry-name">Full name</label><input id="inquiry-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
                  <div className="field"><label htmlFor="inquiry-company">Company</label><input id="inquiry-company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} /></div>
                  <div className="field"><label htmlFor="inquiry-email">Email</label><input id="inquiry-email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /></div>
                  <div className="field"><label htmlFor="inquiry-phone">Phone / WhatsApp</label><input id="inquiry-phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required /></div>
                  <div className="field full"><label htmlFor="inquiry-message">Requirement</label><textarea id="inquiry-message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Quantity, application, specification or other requirements..." /></div>
                </div>
                {result?.success === false && <p className="form-error">{result.message}</p>}
                <button className="submit-button" type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit & continue to WhatsApp"}</button>
              </form>
            )}
          </section>
        </div>
      )}
    </>
  );
}
