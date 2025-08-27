import React from "react";

export default function Breadcrumb({ items }) {
  return (
    <nav className="text-base font-medium pl-8 pt-3">
      <ol className="flex text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index !== 0 && <span className="mx-2 text-gray-400">/</span>}
            {item.href ? (
              <a href={item.href} className="text-green-500 hover:underline">
                {item.label}
              </a>
            ) : (
              <span className="text-gray-800">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
