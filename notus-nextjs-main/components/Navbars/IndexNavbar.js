import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/", label: "Home" },
  { href: "/product/product", label: "Products" },
];

export default function IndexNavbar() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  return (
    <header className="site-header">
      <div className="site-nav-shell">
        <Link href="/" className="site-brand" aria-label="Green River Indonesia home">
          <img src="/img/logo.png" alt="Green River Indonesia" />
          <span>
            <strong>Green River</strong>
            <small>Indonesia</small>
          </span>
        </Link>
        <button type="button" className="site-menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span /><span /><span />
        </button>
        <nav className={`site-nav-links ${open ? "is-open" : ""}`} aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={router.pathname === link.href ? "is-active" : ""} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/contact/contact" className="site-nav-cta" onClick={() => setOpen(false)}>Request a quote</Link>
        </nav>
      </div>
    </header>
  );
}
