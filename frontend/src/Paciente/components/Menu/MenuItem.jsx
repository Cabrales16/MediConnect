import React from "react";

export default function MenuItem({ name, icon, expanded, active }) {
  return (
    <div
      className={`flex items-center gap-3 pl-5 py-4 w-full transition-all duration-200 ${
        active ? "bg-green-50 text-green-600 border-l-4 border-green-500 shadow-sm" : "hover:bg-gray-100"
      }`}
    >
      <img src={icon} alt={name} className="w-6 h-6" />
      {expanded && <span className="text-sm font-medium">{name}</span>}
    </div>
  );
}
