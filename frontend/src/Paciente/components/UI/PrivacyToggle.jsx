import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

export default function PrivacyToggle({ initial = false }) {
  const [enabled, setEnabled] = useState(initial);

  return (
    <div className="flex justify-between items-center p-4">
      <span className="text-gray-800 font-medium">
        Compartir información con familiares
      </span>
      <ToggleSwitch enabled={enabled} onToggle={() => setEnabled(!enabled)} />
    </div>
  );
}
