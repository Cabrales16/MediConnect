import React from "react";
import faqIcon from "./NavbarIcons/faqIcon.png";

export default function FaqButton() {
  return (
    <a
      href="/faq"
      className="p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition"
      aria-label="FAQ"
    >
      <img src={faqIcon} alt="FAQ" className="w-6 h-6" />
    </a>
  );
}
