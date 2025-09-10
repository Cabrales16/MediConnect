// src/hooks/useLockBodyScroll.js
import { useEffect } from "react";

/**
 * Bloquea el scroll del body mientras enabled === true.
 * Retorna una limpieza automática al desmontarse / cambiar a false.
 */
export default function useLockBodyScroll(enabled) {
  useEffect(() => {
    if (!enabled) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [enabled]);
}
