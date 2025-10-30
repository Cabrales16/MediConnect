import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import FiltroIndicaciones from "../components/IndMedicas/FiltroIndicaciones";

/* Datos iniciales */
const initialMeds = [
  {
    id: 1,
    nombre_del_medicamento: "Ibuprofeno",
    nombre_medico: "200mg",
    dosis: "Cada 6 horas",
    estado: "activo",
    fecha_inicio: "10-08-2025",
    fecha_fin: "20-08-2025",
  },
  {
    id: 2,
    nombre_del_medicamento: "Amoxicilina",
    nombre_medico: "500mg",
    dosis: "Cada 8 horas",
    estado: "activo",
    fecha_inicio: "25-10-2025",
    fecha_fin: "10-11-2025",
  },
];

const initialTerapias = [
  {
    id: 1,
    nombre_medico: "Fisioterapia",
    estado: "2 veces por semana",
    fecha_inicio: "4 semanas",
    fecha_fin: "Mejorar la movilidad",
    PDF: "terapia_fisioterapia.pdf",
  },
];

const initialIndicaciones = [
  {
    id: 1,
    titulo: "Reposo",
    descripcion: "Mantener reposo absoluto por 3 días y evitar esfuerzos físicos.",
  },
  {
    id: 2,
    titulo: "Alimentación",
    descripcion: "Seguir una dieta blanda y evitar comidas grasosas o picantes.",
  },
];

export default function IndMedicasCont() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/paciente/inicio" },
    { label: "Ind. médicas" },
  ];

  const [filtro, setFiltro] = useState("todas");
  const [medicamentos] = useState(initialMeds);
  const [terapiaList] = useState(initialTerapias);
  const [indicaciones] = useState(initialIndicaciones);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="overflow-y-auto h-[calc(100vh-9rem)]">
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Indicaciones médicas</h2>
          <p className="text-sm text-gray-600 mb-6">
            Aquí se muestran procedimientos relacionados contigo (medicamentos,
            terapias o indicaciones).
          </p>

          {/* Filtro */}
          <FiltroIndicaciones filtro={filtro} setFiltro={setFiltro} />

          {/* Medicamentos */}
          {(filtro === "todas" || filtro === "medicamentos") && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Medicamentos</h3>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-400">
                <div className="overflow-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-black">
                          Nombre del medicamento
                        </th>
                        <th className="px-6 py-3 text-left text-black">Nombre médico</th>
                        <th className="px-6 py-3 text-left text-black">Dosis</th>
                        <th className="px-6 py-3 text-left text-black">Estado</th>
                        <th className="px-6 py-3 text-left text-black">Fecha inicio</th>
                        <th className="px-6 py-3 text-left text-black">Fecha fin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicamentos.map((m) => (
                        <tr key={m.id} className="border-t border-gray-300">
                          <td className="px-6 py-4 text-black">
                            {m.nombre_del_medicamento}
                          </td>
                          <td className="px-6 py-4 text-green-700">{m.nombre_medico}</td>
                          <td className="px-6 py-4 text-green-700">{m.dosis}</td>
                          <td className="px-6 py-4 text-green-700">{m.estado}</td>
                          <td className="px-6 py-4 text-green-700">{m.fecha_inicio}</td>
                          <td className="px-6 py-4 text-green-700">{m.fecha_fin}</td>
                        </tr>
                      ))}
                      {medicamentos.length === 0 && (
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
            </div>
          )}

          {/* Terapias */}
          {(filtro === "todas" || filtro === "terapias") && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Terapias</h3>
              </div>

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
                      {terapiaList.map((t) => (
                        <tr key={t.id} className="border-t border-gray-300">
                          <td className="px-6 py-4 text-black">{t.nombre_medico}</td>
                          <td className="px-6 py-4 text-green-700">{t.estado}</td>
                          <td className="px-6 py-4 text-green-700">{t.fecha_inicio}</td>
                          <td className="px-6 py-4 text-green-700">{t.fecha_fin}</td>
                          <td className="px-6 py-4 text-black">{t.PDF}</td>
                        </tr>
                      ))}
                      {terapiaList.length === 0 && (
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

          {/* Indicaciones */}
          {(filtro === "todas" || filtro === "indicaciones") && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Indicaciones</h3>
              <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-400">
                <div className="overflow-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-black w-1/4">Título</th>
                        <th className="px-6 py-3 text-left text-black">Descripción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {indicaciones.map((i) => (
                        <tr key={i.id} className="border-t border-gray-300">
                          <td className="px-6 py-4 text-black font-medium">{i.titulo}</td>
                          <td className="px-6 py-4 text-green-700">{i.descripcion}</td>
                        </tr>
                      ))}
                      {indicaciones.length === 0 && (
                        <tr>
                          <td colSpan={2} className="px-6 py-8 text-center text-gray-500">
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
      </div>
    </>
  );
}
