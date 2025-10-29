import React from "react";
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";

export default function FaqButton() {
  return (
    <Link
      to="/paciente/faq"
      className="p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition relative"
    >
      <HelpCircle className="w-6 h-6 text-gray-600" />
    </Link>
  );
}
