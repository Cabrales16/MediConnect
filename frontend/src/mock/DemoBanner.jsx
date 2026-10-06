import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/authService";
import { getDb, resetDb } from "./db";
import { DEMO_ACCOUNTS, DEMO_PASSWORD } from "./seed";

const HOME_POR_ROL = {
  Paciente: "/paciente/inicio",
  "Médico": "/medico/inicio",
  Administrador: "/admin/inicio",
};

const SESSION_KEYS = ["token", "rol", "id_usuario", "correo", "nombre"];

// Los PDFs subidos durante la demo no existen en el hosting estático: se abren
// desde los datos guardados en el navegador.
function useUploadedPdfLinks() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.("a[href*='/static/terapias/']");
      if (!a) return;
      const nombre = decodeURIComponent(a.getAttribute("href").split("/").pop());
      const dataUrl = getDb().archivos?.[nombre];
      if (!dataUrl) return;
      e.preventDefault();
      fetch(dataUrl)
        .then((r) => r.blob())
        .then((blob) => window.open(URL.createObjectURL(blob), "_blank", "noopener"));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
}

export default function DemoBanner() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(pathname === "/login");
  const [busy, setBusy] = useState(false);
  useUploadedPdfLinks();

  const entrar = async (rol) => {
    setBusy(true);
    try {
      const data = await login(DEMO_ACCOUNTS[rol].correo, DEMO_PASSWORD);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("id_usuario", data.id_usuario);
      localStorage.setItem("correo", data.correo);
      localStorage.setItem("nombre", data.nombre);
      setOpen(false);
      navigate(HOME_POR_ROL[data.rol]);
    } catch {
      toast.error("No se pudo iniciar sesión con la cuenta demo. Restablece los datos de la demo.");
    } finally {
      setBusy(false);
    }
  };

  const restablecer = () => {
    if (!window.confirm("Se borrarán los cambios hechos en la demo y se volverá a los datos originales. ¿Continuar?")) return;
    resetDb();
    SESSION_KEYS.forEach((k) => localStorage.removeItem(k));
    window.location.assign(`${import.meta.env.BASE_URL}login`);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] font-sans text-sm">
      {open ? (
        <div className="w-80 rounded-xl border border-green-600 bg-white p-4 shadow-2xl">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="font-semibold text-green-700">Demo de MediConnect</p>
              <p className="text-xs text-gray-500">
                Datos de ejemplo guardados en tu navegador. No se envían correos reales.
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="text-lg leading-none text-gray-500 hover:text-gray-800" aria-label="Cerrar">
              ×
            </button>
          </div>

          <p className="mt-3 text-xs font-medium text-gray-700">Entrar con una cuenta de prueba:</p>
          <div className="mt-1 space-y-1">
            {Object.entries(DEMO_ACCOUNTS).map(([rol, { correo }]) => (
              <button
                key={rol}
                disabled={busy}
                onClick={() => entrar(rol)}
                className="flex w-full items-center justify-between rounded-md border border-gray-200 px-3 py-2 text-left hover:bg-green-50 disabled:opacity-60"
              >
                <span className="font-medium text-gray-800">{rol}</span>
                <span className="text-xs text-gray-500">{correo}</span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Contraseña de todas: <code className="rounded bg-gray-100 px-1">{DEMO_PASSWORD}</code>
          </p>

          <button onClick={restablecer} className="mt-3 text-xs text-red-600 underline hover:text-red-800">
            Restablecer datos de la demo
          </button>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-green-600 px-4 py-2 font-medium text-white shadow-lg hover:bg-green-700"
        >
          Demo · cuentas
        </button>
      )}
    </div>
  );
}
