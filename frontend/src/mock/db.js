// "Base de datos" de la demo: vive en localStorage para que los cambios
// (citas agendadas, familiares, novedades, etc.) persistan entre recargas.
import { buildSeed } from "./seed";

const KEY = "mediconnect_demo_db_v1";
const SEED_VERSION = 1;

let cache = null;

export function getDb() {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.version === SEED_VERSION) {
        cache = parsed;
        return cache;
      }
    }
  } catch {
    // datos corruptos: se regeneran abajo
  }
  cache = buildSeed();
  saveDb();
  return cache;
}

export function saveDb() {
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn("[demo] No se pudo persistir la base de datos simulada:", e);
  }
}

// Restaura los datos originales de la demo (no toca la sesión).
export function resetDb() {
  cache = null;
  localStorage.removeItem(KEY);
  getDb();
}

export const nextId = (table, key) =>
  table.reduce((max, row) => Math.max(max, row[key] ?? 0), 0) + 1;
