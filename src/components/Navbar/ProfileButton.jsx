import React, { useState, useRef, useEffect } from "react";
import perfilIcon from "./NavbarIcons/perfilIcon.png";

export default function ProfileButton({ user = { name: "Yina Natalia", avatar: perfilIcon } }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="rounded-full overflow-hidden w-10 h-10 border bg-white"
        aria-label="Perfil"
      >
        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-44 bg-white rounded-md shadow-lg z-40">
          <div className="p-3">
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-gray-500">Paciente</div>
          </div>

          <ul>
            <li>
              <a href="/profile" className="block w-full text-left px-4 py-2 hover:bg-gray-50">Ver perfil</a>
            </li>
            <li>
              <button
                onClick={() => { window.location.href = "/logout"; }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
