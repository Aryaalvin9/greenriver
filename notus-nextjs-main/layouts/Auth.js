import React from "react";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";
import { useState, useEffect } from "react";

export default function Auth({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // Deteksi layar <= 640px
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Panggil saat komponen dimuat
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-grenPrimary-500 bg-no-repeat bg-full lg"
            style={{
              backgroundImage: isMobile ? "url('/img/background-mobile.png')" : "url('/img/authBackground.png')",
            }}
          ></div>
          {children}
          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  );
}
