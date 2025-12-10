import React from "react";
import Logo from "./Logo";
import ModificarDatos from "./ModificarDatos";
import FaqButton from "./FaqButton";
import SettingsButton from "./SettingsButton";
import ProfileButton from "./ProfileButton";

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="w-full border-b border-gray-300 bg-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              aria-label="Abrir menú"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <Logo showText={false} />
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ModificarDatos />
            <div className="w-px h-6 bg-gray-100 mx-2" />
            <FaqButton />
            <SettingsButton />
            <ProfileButton />
          </div>

          <div className="md:hidden flex items-center gap-3">
            <ModificarDatos />
            <FaqButton />
            <SettingsButton />
            <ProfileButton />
          </div>
        </div>
      </div>
    </header>
  );
}
