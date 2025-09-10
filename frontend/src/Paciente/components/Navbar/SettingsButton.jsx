import React from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

export default function SettingsButton() {
  return (
    <Link
      to="/configuracion"
      className="p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition relative"
    >
      <Settings className="w-6 h-6 text-gray-600" />
    </Link>
  );
}
