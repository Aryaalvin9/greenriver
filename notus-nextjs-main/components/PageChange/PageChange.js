import React from "react";

export default function PageChange() {
  return (
    <div className="route-loader" role="status" aria-live="polite" aria-label="Loading page">
      <div className="route-loader-mark" aria-hidden="true">
        <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle className="loader-ring" cx="70" cy="70" r="57" />
          <g className="loader-sun">
            <circle cx="94" cy="43" r="10" />
            <path d="M94 25V18M94 68V61M112 43H119M69 43H76M107 30L112 25M76 61L81 56M107 56L112 61M76 25L81 30" />
          </g>
          <path className="loader-tree" d="M46 75V38M46 52L34 42M46 60L59 48M46 46L54 37" />
          <path className="loader-land" d="M23 79C39 72 51 74 66 80C82 86 97 74 117 72" />
          <path className="loader-river river-one" d="M25 88C48 83 69 94 91 88C103 85 111 83 119 86" />
          <path className="loader-river river-two" d="M31 99C50 95 63 104 82 100C96 97 105 95 113 98" />
          <path className="loader-river river-three" d="M43 110C57 107 68 113 85 109" />
        </svg>
      </div>
      <p>Loading</p>
      <div className="route-loader-dots" aria-hidden="true"><span /><span /><span /></div>
    </div>
  );
}
