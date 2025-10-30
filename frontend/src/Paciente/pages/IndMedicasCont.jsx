import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import FiltroIndicaciones from "../components/IndMedicas/FiltroIndicaciones";

/* Datos iniciales */
const initialMeds = [
  { id: 1, nombre: "Ibuprofeno", dosis: "200mg", frecuencia: "Cada 6 horas", duracion: "7 días", instrucciones: "Tomar con alimentos" },
  { id: 2, nombre: "Amoxicilina", dosis: "500mg", frecuencia: "Cada 8 horas", duracion: "10 días", instrucciones: "Tomar con el estómago vacío" },
];

const initialTerapias = [
  { id: 1, tipo: "Fisioterapia", frecuencia: "2 veces por semana", duracion: "4 semanas", objetivos: "Mejorar la movilidad" },
];

const initialIndicaciones = [
  { id: 1, titulo: "Reposo", descripcion: "Mantener reposo absoluto por 3 días y evitar esfuerzos físicos." },
  { id: 2, titulo: "Alimentación", descripcion: "Seguir una dieta blanda y evitar comidas grasosas o picantes." },
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
          <h2 className="text-2xl font-semibold mb-2">Indicaciones médicas</h2>
          <p className="text-sm text-gray-600 mb-6">
            Aquí se muestran procedimientos relacionados contigo (medicamentos, terapias, indicaciones).
          </p>

          {/* Filtro */}
          <FiltroIndicaciones filtro={filtro} setFiltro={setFiltro} />

          {/* Medicamentos */}
          {(filtro === "todas" || filtro === "medicamentos") && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Medicamentos</h3>
              <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-400">
                <div className="overflow-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-black">Nombre del medicamento</th>
                        <th className="px-6 py-3 text-left text-black">Dosis</th>
                        <th className="px-6 py-3 text-left text-black">Frecuencia</th>
                        <th className="px-6 py-3 text-left text-black">Duración</th>
                        <th className="px-6 py-3 text-left text-black">Instrucciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicamentos.map((m) => (
                        <tr key={m.id} className="border-t border-gray-300">
                          <td className="px-6 py-4 text-black">{m.nombre}</td>
                          <td className="px-6 py-4 text-green-700">{m.dosis}</td>
                          <td className="px-6 py-4 text-green-700">{m.frecuencia}</td>
                          <td className="px-6 py-4 text-green-700">{m.duracion}</td>
                          <td className="px-6 py-4 text-green-700">{m.instrucciones}</td>
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
              <h3 className="text-lg font-semibold mb-3">Terapias</h3>
              <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-400">
                <div className="overflow-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-black">Tipo de terapia</th>
                        <th className="px-6 py-3 text-left text-black">Frecuencia</th>
                        <th className="px-6 py-3 text-left text-black">Duración</th>
                        <th className="px-6 py-3 text-left text-black">Objetivos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {terapiaList.map((t) => (
                        <tr key={t.id} className="border-t border-gray-300">
                          <td className="px-6 py-4 text-black">{t.tipo}</td>
                          <td className="px-6 py-4 text-green-700">{t.frecuencia}</td>
                          <td className="px-6 py-4 text-green-700">{t.duracion}</td>
                          <td className="px-6 py-4 text-green-700">{t.objetivos}</td>
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
