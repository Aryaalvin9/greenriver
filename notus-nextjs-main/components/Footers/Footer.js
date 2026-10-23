import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div className="site-footer-brand">
          <img src="/img/logo.png" alt="" />
          <div>
            <strong>PT Green River Indonesia</strong>
            <p>Chemical solutions for responsible industries and a more sustainable future.</p>
          </div>
        </div>
        <div>
          <span className="site-footer-label">Explore</span>
          <Link href="/">Company</Link>
          <Link href="/product/product">Products</Link>
          <Link href="/contact/contact">Contact</Link>
        </div>
        <div>
          <span className="site-footer-label">Office</span>
          <a href="https://maps.app.goo.gl/BU4iUyem7rxo744G6" target="_blank" rel="noreferrer">Jl. Daan Mogot KM 19<br />Tangerang, Banten</a>
          <a href="mailto:commercial@greenriverindonesia.com">commercial@greenriverindonesia.com</a>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} PT Green River Indonesia</span>
        <span>Progress through responsible chemistry.</span>
      </div>
    </footer>
  );
}
