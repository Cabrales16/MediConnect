import React from "react";
import logo from "./NavbarIcons/logo.png";

export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
        <img src={logo} alt="MediConnect logo" className="w-12 h-12 object-contain" />
      </div>

      <div className="hidden md:block text-xl font-semibold select-none">
        <span>Medi</span>
        <span className="text-green-500">Connect</span>
      </div>
    </div>
  );
}
