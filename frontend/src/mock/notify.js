// Avisos de la demo: en producción el backend envía correos; aquí se muestran
// como notificaciones para que se vea qué habría pasado.
import { toast } from "react-toastify";

const BASE = import.meta.env.BASE_URL || "/";

export const appUrl = (path) => `${window.location.origin}${BASE}${path.replace(/^\//, "")}`;

// Simula el correo con enlace (confirmar cuenta / restablecer contraseña).
export function emailConLink(mensaje, path) {
  toast.info(`📧 DEMO · ${mensaje} Toca aquí para abrir el enlace del correo.`, {
    position: "bottom-left",
    autoClose: 25000,
    closeOnClick: false,
    onClick: () => window.location.assign(appUrl(path)),
  });
}

// Simula el correo a los familiares del paciente según su "tipo de información".
export function notificarFamiliares(db, id_paciente, palabras, asunto) {
  const nombres = db.familiares
    .filter((f) => f.id_paciente === Number(id_paciente))
    .filter((f) => {
      const desc = db.tipos_novedad.find((t) => t.id_info === f.id_info)?.descripcion.toLowerCase() ?? "";
      return palabras.some((p) => desc.includes(p));
    })
    .map((f) => f.nombre);
  if (nombres.length) {
    toast.info(`📧 DEMO · "${asunto}" se enviaría por correo a: ${nombres.join(", ")}`, {
      position: "bottom-left",
      autoClose: 6000,
    });
  }
}
