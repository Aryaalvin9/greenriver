import React from "react";
import Link from "next/link";
import Head from "next/head";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

const capabilities = [
  { title: "General Chemicals", text: "Reliable chemical commodities selected to support efficient and responsible industrial operations." },
  { title: "Water Treatment", text: "Treatment materials that help industries maintain cleaner, safer and more efficient water systems." },
  { title: "Wastewater Treatment", text: "Solutions that support contaminant removal and more responsible wastewater management." },
  { title: "Agricultural Chemicals", text: "Products that support modern farming while keeping environmental responsibility in focus." },
  { title: "Home Care", text: "Functional ingredients for effective cleaning and everyday care product formulations." },
  { title: "Personal Care", text: "Thoughtfully selected ingredients for personal care, health and wellbeing applications." },
];

export default function Index() {
  return (
    <>
      <Head>
        <title>PT Green River Indonesia | Responsible Chemical Solutions</title>
        <meta name="description" content="PT Green River Indonesia supplies chemical solutions for industrial, water treatment, agriculture, home care and personal care applications." />
      </Head>
      <IndexNavbar />
      <main className="modern-page">
        <section className="hero-modern">
          <div className="modern-shell hero-grid">
            <div>
              <span className="eyebrow">Responsible chemistry</span>
              <h1 className="modern-title">Better chemistry for a <em>greener tomorrow.</em></h1>
              <p className="modern-lead">We connect industries with dependable chemical solutions designed around performance, safety and long-term environmental responsibility.</p>
              <div className="modern-actions">
                <Link href="/product/product" className="modern-button primary">Explore our products <span aria-hidden="true">→</span></Link>
                <Link href="/contact/contact" className="modern-button secondary">Talk to our team</Link>
              </div>
            </div>
            <div className="hero-visual" aria-label="Clean water and sustainable industry">
              <div className="hero-image-card"><img src="/img/reef.jpeg" alt="Clear water representing responsible chemical solutions" /></div>
              <div className="hero-orbit"><i className="fas fa-leaf" aria-hidden="true" /></div>
              <div className="hero-note"><strong>Built for impact</strong><span>Practical solutions for industries moving toward a cleaner future.</span></div>
            </div>
          </div>
        </section>

        <div className="modern-shell trust-strip">
          <div className="trust-grid">
            <div className="trust-item"><strong>Quality focused</strong><span>Products selected for dependable industrial performance.</span></div>
            <div className="trust-item"><strong>Responsible handling</strong><span>Safety and environmental care guide our approach.</span></div>
            <div className="trust-item"><strong>Responsive support</strong><span>A commercial team ready to understand your needs.</span></div>
          </div>
        </div>

        <section className="brand-band modern-shell" aria-label="Green River at a glance">
          <div className="brand-band-intro">
            <span>Our portfolio at a glance</span>
            <h2>Broad capability.<br />One responsible partner.</h2>
          </div>
          <div className="brand-band-stats">
            <div><strong>06</strong><span>focus sectors</span></div>
            <div><strong>77</strong><span>catalog products</span></div>
            <div><strong>01</strong><span>direct inquiry flow</span></div>
          </div>
        </section>

        <section className="modern-section">
          <div className="modern-shell">
            <div className="section-heading">
              <div><span className="eyebrow">What we supply</span><h2>Chemical solutions across essential industries.</h2></div>
              <p>From water systems to everyday care, our portfolio helps businesses solve practical challenges without losing sight of sustainability.</p>
            </div>
            <div className="capability-grid">
              {capabilities.map((item, index) => (
                <article className="capability-card" key={item.title}>
                  <span className="capability-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3><p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="modern-section" style={{ paddingTop: 0 }}>
          <div className="modern-shell story-panel">
            <div className="story-image" role="img" aria-label="Green River sustainability vision" />
            <div className="story-copy">
              <span className="eyebrow">Our vision</span>
              <h2>Industry and nature can move forward together.</h2>
              <p>We believe chemical distribution can contribute to progress while respecting the planet. Our focus is to connect customers with effective solutions, handled responsibly and chosen with the future in mind.</p>
              <div className="story-list">
                <div><span>✓</span> Performance that serves real operational needs</div>
                <div><span>✓</span> Safety embedded in responsible delivery</div>
                <div><span>✓</span> A practical path toward greener operations</div>
              </div>
              <div className="modern-actions"><Link href="/product/product" className="modern-button primary">View product catalog</Link></div>
            </div>
          </div>
        </section>

        <section className="modern-section process-section">
          <div className="modern-shell">
            <div className="section-heading">
              <div><span className="eyebrow">Simple process</span><h2>From product discovery to a real conversation.</h2></div>
              <p>Our inquiry flow is designed to move quickly while keeping every request clear and traceable.</p>
            </div>
            <div className="process-grid">
              <article><span>01</span><i className="fas fa-magnifying-glass" /><h3>Explore</h3><p>Browse the catalog and identify the product that matches your application.</p></article>
              <article><span>02</span><i className="fas fa-file-signature" /><h3>Submit</h3><p>Share your company, contact details and product requirements securely.</p></article>
              <article><span>03</span><i className="fab fa-whatsapp" /><h3>Connect</h3><p>Continue directly through WhatsApp while our team receives the inquiry by email.</p></article>
            </div>
          </div>
        </section>

        <section className="modern-shell modern-cta">
          <h2>Let&apos;s find the right solution for your business.</h2>
          <p>Tell us about your application, requirements or sourcing needs. Our commercial team is ready to start the conversation.</p>
          <div className="modern-actions"><Link href="/contact/contact" className="modern-button primary">Contact our team <span aria-hidden="true">→</span></Link></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
