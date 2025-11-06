import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import FiltroIndicaciones from "../components/IndMedicas/FiltroIndicaciones";

/* Datos iniciales */
/* Datos iniciales */
const initialMeds = [
  {
    id: 1,
    nombre_del_medicamento: "Ibuprofeno",
    nombre_medico: "Dr. Juan Torres",
    dosis: "200mg cada 6 horas",
    estado: "activo",
    fecha_inicio: "10-08-2025",
    fecha_fin: "20-08-2025",
  },
  {
    id: 2,
    nombre_del_medicamento: "Amoxicilina",
    nombre_medico: "Dra. Laura Gómez",
    dosis: "500mg cada 8 horas",
    estado: "activo",
    fecha_inicio: "25-10-2025",
    fecha_fin: "10-11-2025",
  },
  {
    id: 3,
    nombre_del_medicamento: "Paracetamol",
    nombre_medico: "Dr. Carlos Martínez",
    dosis: "1 tableta cada 8 horas",
    estado: "activo",
    fecha_inicio: "15-09-2025",
    fecha_fin: "25-09-2025",
  },
  {
    id: 4,
    nombre_del_medicamento: "Losartán",
    nombre_medico: "Dra. Daniela Patiño",
    dosis: "50mg cada 12 horas",
    estado: "finalizado",
    fecha_inicio: "01-06-2025",
    fecha_fin: "15-06-2025",
  },
  {
    id: 5,
    nombre_del_medicamento: "Omeprazol",
    nombre_medico: "Dr. Fernando Ruiz",
    dosis: "20mg en ayunas",
    estado: "activo",
    fecha_inicio: "28-10-2025",
    fecha_fin: "15-11-2025",
  },
  {
    id: 6,
    nombre_del_medicamento: "Cetirizina",
    nombre_medico: "Dra. Sofía Herrera",
    dosis: "10mg una vez al día",
    estado: "activo",
    fecha_inicio: "05-11-2025",
    fecha_fin: "19-11-2025",
  },
];

const initialTerapias = [
  {
    id: 1,
    nombre_medico: "Fisioterapia",
    estado: "2 veces por semana",
    fecha_inicio: "10-10-2025",
    fecha_fin: "10-11-2025",
    PDF: "terapia_fisioterapia.pdf",
  },
  {
    id: 2,
    nombre_medico: "Terapia respiratoria",
    estado: "3 sesiones semanales",
    fecha_inicio: "01-09-2025",
    fecha_fin: "30-09-2025",
    PDF: "terapia_respiratoria.pdf",
  },
  {
    id: 3,
    nombre_medico: "Terapia ocupacional",
    estado: "2 veces por semana",
    fecha_inicio: "05-08-2025",
    fecha_fin: "05-09-2025",
    PDF: "terapia_ocupacional.pdf",
  },
  {
    id: 4,
    nombre_medico: "Rehabilitación post-operatoria",
    estado: "5 sesiones programadas",
    fecha_inicio: "12-10-2025",
    fecha_fin: "25-10-2025",
    PDF: "rehabilitacion_postoperatoria.pdf",
  },
  {
    id: 5,
    nombre_medico: "Terapia psicológica",
    estado: "1 sesión semanal",
    fecha_inicio: "01-11-2025",
    fecha_fin: "15-12-2025",
    PDF: "terapia_psicologica.pdf",
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
    descripcion: "Seguir una dieta blanda, evitar comidas grasosas, picantes o muy frías.",
  },
  {
    id: 3,
    titulo: "Hidratación",
    descripcion: "Beber al menos 2 litros de agua diarios para mantener una buena recuperación.",
  },
  {
    id: 4,
    titulo: "Ejercicio",
    descripcion: "Realizar caminatas suaves de 20 minutos al día una vez terminada la fiebre.",
  },
  {
    id: 5,
    titulo: "Control médico",
    descripcion: "Asistir al control programado dentro de 10 días o antes si hay molestias.",
  },
  {
    id: 6,
    titulo: "Medicamentos",
    descripcion: "Tomar los medicamentos indicados en los horarios exactos, no suspender sin autorización.",
  },
  {
    id: 7,
    titulo: "Cuidado de herida",
    descripcion: "Mantener la zona limpia y seca, cambiar los apósitos cada 24 horas.",
  },
  {
    id: 8,
    titulo: "Postura",
    descripcion: "Evitar permanecer mucho tiempo en la misma posición, especialmente sentado.",
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
                          <td className="px-6 py-4 text-black">{i.titulo}</td>
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
