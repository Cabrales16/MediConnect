import React, { useState } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";

/* Datos iniciales */
const initialMeds = [
  { id: 1, nombre: "Ibuprofeno", dosis: "200mg", frecuencia: "Cada 6 horas", duracion: "7 días", instrucciones: "Tomar con alimentos" },
  { id: 2, nombre: "Amoxicilina", dosis: "500mg", frecuencia: "Cada 8 horas", duracion: "10 días", instrucciones: "Tomar con el estómago vacío" },
];

const initialTerapias = [
  { id: 1, tipo: "Fisioterapia", frecuencia: "2 veces por semana", duracion: "4 semanas", objetivos: "Mejorar la movilidad" },
];

export default function IndMedicasCont() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Gest. de Opciones" },
  ];

  const [medicamentos, setMedicamentos] = useState(initialMeds);
  const [terapiaList, setTerapiaList] = useState(initialTerapias);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Gestión de Opciones de Usuario</h2>
        <p className="text-sm text-gray-600 mb-6">Aquí se muestran procedimientos relacionados contigo (medicamentos, terapias).</p>

        {/* Medicamentos */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Medicamentos</h3>
          </div>

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

        {/* Terapias */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Terapias</h3>
          </div>

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
      </div>
    </>
  );
}
