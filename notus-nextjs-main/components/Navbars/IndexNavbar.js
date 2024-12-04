import React from "react";
import Link from "next/link";
// components

import IndexDropdown from "components/Dropdowns/IndexDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="flex flex-row w-36 relative lg:w-auto lg:static lg:block lg:justify-start">
              <img
                    src="/img/logo.png"
                    className="h-12 w-12 bg-white"
                    alt="..."
              ></img>
          </div>
          <a
          href="/"
                className="text-[#374639] text-sm font-bold leading-relaxed inline-block ml-3 mr-6 py-2 whitespace-nowrap uppercase"
              >
          PT GREEN RIVER INDONESIA
          </a>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center ml-10">
                <IndexDropdown />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
