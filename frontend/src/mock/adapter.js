// Adaptador de axios que responde las peticiones con la API simulada en lugar
// de salir a la red. Se instala en services/api.js cuando VITE_DEMO_MODE=true.
import { AxiosError } from "axios";
import { getDb } from "./db";
import { routes, HttpError } from "./handlers";

const LATENCY_MS = [120, 320];
const wait = () =>
  new Promise((r) => setTimeout(r, LATENCY_MS[0] + Math.random() * (LATENCY_MS[1] - LATENCY_MS[0])));

function parseBody(data) {
  if (data == null) return {};
  if (typeof FormData !== "undefined" && data instanceof FormData) return Object.fromEntries(data.entries());
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }
  return data;
}

function respond(config, status, data) {
  return { data, status, statusText: String(status), headers: {}, config, request: {} };
}

export async function mockAdapter(config) {
  await wait();

  const method = (config.method || "get").toLowerCase();
  const path = new URL(config.url, "http://demo.local").pathname;
  const match = routes.find((r) => r.method === method && r.re.test(path));

  let response;
  if (!match) {
    response = respond(config, 404, { detail: "Not Found" });
  } else {
    const params = path.match(match.re).groups ?? {};
    try {
      const data = await match.handler({
        params,
        query: config.params ?? {},
        body: parseBody(config.data),
        db: getDb(),
      });
      response = respond(config, 200, data === undefined ? null : JSON.parse(JSON.stringify(data)));
    } catch (e) {
      if (!(e instanceof HttpError)) {
        console.error("[demo] Error en handler", method, path, e);
        response = respond(config, 500, { detail: "Error interno de la demo" });
      } else {
        response = respond(config, e.status, { detail: e.detail });
      }
    }
  }

  if (response.status >= 200 && response.status < 300) return response;
  throw new AxiosError(
    `Request failed with status code ${response.status}`,
    response.status >= 500 ? AxiosError.ERR_BAD_RESPONSE : AxiosError.ERR_BAD_REQUEST,
    config,
    response.request,
    response
  );
}
