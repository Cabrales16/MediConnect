import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import FiltroIndicaciones from "../components/IndMedicas/FiltroIndicaciones";
import { getMedicacionPaciente } from "../../services/medicacion";
import { obtenerTerapiasPaciente } from "../../services/terapia"; // ✅ nuevo import
import { obtenerIndicacionesPaciente } from "../../services/indicacion";


export default function IndMedicasCont() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/paciente/inicio" },
    { label: "Ind. médicas" },
  ];

  const [filtro, setFiltro] = useState("todas");
  const [medicamentos, setMedicamentos] = useState([]);
  const [terapiaList, setTerapiaList] = useState([]);
  const [indicaciones, setIndicaciones] = useState([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ✅ Cargar medicamentos
  useEffect(() => {
    const cargarMedicacion = async () => {
      const id_usuario = localStorage.getItem("id_usuario");
      if (!id_usuario) return;

      try {
        const data = await getMedicacionPaciente(id_usuario);
        const meds = data.map((m) => ({
          id: m.id_medicacion,
          nombre_del_medicamento: m.medicamento_nombre,
          nombre_medico: m.medico_nombre,
          dosis: m.dosis,
          estado: m.estado,
          fecha_inicio: m.fecha_inicio,
          fecha_fin: m.fecha_fin,
        }));
        setMedicamentos(meds);
      } catch (error) {
        console.error("Error cargando medicación del paciente:", error);
      }
    };

    cargarMedicacion();
  }, []);

  // ✅ Cargar terapias
  useEffect(() => {
    const cargarTerapias = async () => {
      const id_usuario = localStorage.getItem("id_usuario");
      if (!id_usuario) return;

      try {
        const data = await obtenerTerapiasPaciente(id_usuario);
        const terapias = data.map((t) => ({
          id: t.id_terapia,
          nombre_medico: t.nombre_medico,
          estado: t.estado,
          fecha_inicio: t.inicio,
          fecha_fin: t.fin,
          pdf: t.pdf,
        }));
        setTerapiaList(terapias);
      } catch (error) {
        console.error("Error cargando terapias del paciente:", error);
      }
    };

    cargarTerapias();
  }, []);
  // ✅ Cargar indicaciones médicas
  useEffect(() => {
    const cargarIndicaciones = async () => {
      const id_usuario = localStorage.getItem("id_usuario");
      if (!id_usuario) return;

      try {
        const data = await obtenerIndicacionesPaciente(id_usuario);
        const indicacionesFormateadas = data.map((i) => ({
          id: i.id_indicacion,
          nombre_medico: i.medico_nombre,
          estado: i.estado,
          observaciones: i.observaciones,
        }));
        setIndicaciones(indicacionesFormateadas);
      } catch (error) {
        console.error("Error cargando indicaciones médicas:", error);
      }
  };

  cargarIndicaciones();
}, []);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="overflow-y-auto h-[calc(100vh-9rem)] p-8">
        <h2 className="text-2xl font-semibold mb-4">Indicaciones médicas</h2>
        <p className="text-sm text-gray-600 mb-6">
          Aquí se muestran procedimientos relacionados contigo (medicamentos, terapias o indicaciones).
        </p>

        <FiltroIndicaciones filtro={filtro} setFiltro={setFiltro} />

        {/* MEDICAMENTOS */}
        {(filtro === "todas" || filtro === "medicamentos") && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Medicamentos</h3>
            <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-400 overflow-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-black">Nombre del medicamento</th>
                    <th className="px-6 py-3 text-left text-black">Nombre médico</th>
                    <th className="px-6 py-3 text-left text-black">Dosis</th>
                    <th className="px-6 py-3 text-left text-black">Estado</th>
                    <th className="px-6 py-3 text-left text-black">Fecha inicio</th>
                    <th className="px-6 py-3 text-left text-black">Fecha fin</th>
                  </tr>
                </thead>
                <tbody>
                  {medicamentos.length > 0 ? (
                    medicamentos.map((m) => (
                      <tr key={m.id} className="border-t border-gray-300">
                        <td className="px-6 py-4 text-black">{m.nombre_del_medicamento}</td>
                        <td className="px-6 py-4 text-green-700">{m.nombre_medico}</td>
                        <td className="px-6 py-4 text-green-700">{m.dosis}</td>
                        <td className="px-6 py-4 text-green-700">{m.estado}</td>
                        <td className="px-6 py-4 text-green-700">{m.fecha_inicio}</td>
                        <td className="px-6 py-4 text-green-700">{m.fecha_fin}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No hay medicamentos.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TERAPIAS */}
        {(filtro === "todas" || filtro === "terapias") && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Terapias</h3>
            <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-400">
              <div className="overflow-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-black">Nombre médico</th>
                      <th className="px-6 py-3 text-left text-black">Estado</th>
                      <th className="px-6 py-3 text-left text-black">Fecha inicio</th>
                      <th className="px-6 py-3 text-left text-black">Fecha fin</th>
                      <th className="px-6 py-3 text-left text-black">PDF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {terapiaList.length > 0 ? (
                      terapiaList.map((t) => (
                        <tr key={t.id} className="border-t border-gray-300">
                          <td className="px-6 py-4 text-black">{t.nombre_medico}</td>
                          <td className="px-6 py-4 text-green-700">{t.estado}</td>
                          <td className="px-6 py-4 text-green-700">{t.fecha_inicio}</td>
                          <td className="px-6 py-4 text-green-700">{t.fecha_fin}</td>
                          <td className="px-6 py-4">
                            {t.pdf ? (
                              <a
                                href={`http://localhost:8000/static/terapias/${t.pdf.split("/").pop()}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                Ver PDF
                              </a>
                            ) : (
                              <span className="text-gray-500">Sin archivo</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          No hay terapias.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* INDICACIONES */}
        {(filtro === "todas" || filtro === "indicaciones") && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Indicaciones</h3>
            <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-400">
              <div className="overflow-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-black">Nombre médico</th>
                      <th className="px-6 py-3 text-left text-black">Estado</th>
                      <th className="px-6 py-3 text-left text-black">Observaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {indicaciones.length > 0 ? (
                      indicaciones.map((i) => (
                        <tr key={i.id} className="border-t border-gray-300">
                          <td className="px-6 py-4 text-black">{i.nombre_medico}</td>
                          <td className="px-6 py-4 text-green-700">{i.estado}</td>
                          <td className="px-6 py-4 text-green-700">{i.observaciones}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                          No hay indicaciones.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
