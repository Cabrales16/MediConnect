import React from "react";
import Logo from "./Logo";
import CitaRapidaButton from "./CitaRapida";
import FaqButton from "./FaqButton";
import NotificationsButton from "./NotificationsButton";
import SettingsButton from "./SettingsButton";
import ProfileButton from "./ProfileButton";

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-300 bg-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>

          <div className="flex items-center gap-3">
            <CitaRapidaButton />
            <div className="w-px h-6 bg-gray-100 mx-2" />
            <FaqButton />
            <NotificationsButton />
            <SettingsButton />
            {/* usa el avatar por defecto definido en ProfileButton */}
            <ProfileButton />
          </div>
        </div>
      </div>
    </header>
  );
}
