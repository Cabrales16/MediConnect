import React, { useState, useEffect } from "react";
import { crearMedicacion, obtenerMedicamentos } from "../../../services/medicacion";
import { asignarTerapia, obtenerTerapias } from "../../../services/terapia";
import { crearIndicacion } from "../../../services/indicacion";
import { finalizarCita } from "../../../services/citasService";
import { toast } from "react-toastify";

export default function ActionModal({ type, onClose, onSubmit, id_paciente, id_cita }) {
  const [nota, setNota] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);
  const [terapias, setTerapias] = useState([]);
  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState("");
  const [presentaciones, setPresentaciones] = useState([]);
  const [presentacion, setPresentacion] = useState("");
  const [dosis, setDosis] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [terapiaSeleccionada, setTerapiaSeleccionada] = useState("");
  const [cargando, setCargando] = useState(false);

  const id_medico = localStorage.getItem("id_usuario");

  // 🔹 Cargar medicamentos
  useEffect(() => {
    const cargarMedicamentos = async () => {
      try {
        const data = await obtenerMedicamentos();
        setMedicamentos(data);
      } catch (error) {
        console.error("Error cargando medicamentos:", error);
      }
    };
    if (type === "medicamento") cargarMedicamentos();
  }, [type]);

  // 🔹 Cargar terapias
  useEffect(() => {
    const cargarTerapias = async () => {
      try {
        const data = await obtenerTerapias();
        setTerapias(data);
      } catch (error) {
        console.error("Error cargando terapias:", error);
      }
    };
    if (type === "terapia") cargarTerapias();
  }, [type]);

  // 🔹 Filtrar presentaciones según medicamento
  useEffect(() => {
    if (medicamentoSeleccionado) {
      const presentacionesFiltradas = medicamentos
        .filter((m) => m.nombre === medicamentoSeleccionado)
        .map((m) => m.presentacion);
      setPresentaciones([...new Set(presentacionesFiltradas)]);
    } else {
      setPresentaciones([]);
    }
  }, [medicamentoSeleccionado, medicamentos]);

  // 🔹 Enviar acción al backend
  const handleSubmit = async () => {
    if (!id_paciente && type !== "finalizar") {
      alert("⚠️ No se encontró el paciente. Selecciona una cita válida.");
      return;
    }

    setCargando(true);
    try {
      let resultado = null;

      // 🧩 MEDICAMENTO
      if (type === "medicamento") {
        const medicamentoObj = medicamentos.find(
          (m) => m.nombre === medicamentoSeleccionado && m.presentacion === presentacion
        );

        if (!medicamentoObj) {
          alert("Selecciona un medicamento y presentación válidos");
          return;
        }

        const medicacionData = {
          id_paciente: parseInt(id_paciente),
          id_medico: parseInt(id_medico),
          id_medicamento: medicamentoObj.id_medicamento,
          dosis,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
        };

        resultado = await crearMedicacion(medicacionData);
        toast.success("✅ Medicación creada correctamente");
      }

      // 🧩 TERAPIA
      if (type === "terapia") {
        if (!terapiaSeleccionada || !fechaInicio || !fechaFin) {
          alert("Completa todos los campos");
          return;
        }

        const terapiaData = {
          id_CrearTerapia: parseInt(terapiaSeleccionada),
          id_medico: parseInt(id_medico),
          id_paciente: parseInt(id_paciente),
          inicio: fechaInicio,
          fin: fechaFin,
        };

        resultado = await asignarTerapia(terapiaData);
        toast.success("✅ Terapia asignada correctamente");
      }

      // 🧩 INDICACIÓN MÉDICA
      if (type === "indicacion") {
        if (!nota.trim()) {
          alert("Por favor escribe una observación.");
          return;
        }

        const indicacionData = {
          id_medico: parseInt(id_medico),
          id_paciente: parseInt(id_paciente),
          id_cita: parseInt(id_cita),
          observaciones: nota,
        };

        resultado = await crearIndicacion(indicacionData);
        toast.success("✅ Indicación registrada correctamente");
      }

      // 🧩 FINALIZAR CITA
      if (type === "finalizar") {
        if (!id_cita) {
          alert("⚠️ No se encontró el ID de la cita.");
          return;
        }

        resultado = await finalizarCita(parseInt(id_cita));
        toast.success("✅ Cita finalizada correctamente");
      }

      if (onSubmit) onSubmit(resultado);
      onClose();
    } catch (error) {
      console.error("❌ Error en acción:", error);
      toast.error("Ocurrió un error al procesar la acción.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h3 className="text-lg font-semibold mb-4 text-center">
          {type === "medicamento" && "Añadir Medicamento"}
          {type === "terapia" && "Asignar Terapia"}
          {type === "indicacion" && "Registrar Indicación Médica"}
          {type === "finalizar" && "Finalizar Cita"}
        </h3>

        {/* 🔹 INDICACIÓN MÉDICA */}
        {type === "indicacion" && (
          <textarea
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Escribe la observación o indicación médica"
            className="w-full border rounded p-2 h-32 mb-3"
          />
        )}

        {/* 🔹 FORMULARIO DE MEDICAMENTO */}
        {type === "medicamento" && (
          <>
            <select
              value={medicamentoSeleccionado}
              onChange={(e) => setMedicamentoSeleccionado(e.target.value)}
              className="w-full mb-2 border rounded p-2"
            >
              <option value="">Selecciona medicamento</option>
              {Array.from(new Set(medicamentos.map((m) => m.nombre))).map(
                (nombre, idx) => (
                  <option key={idx} value={nombre}>
                    {nombre}
                  </option>
                )
              )}
            </select>

            <select
              value={presentacion}
              onChange={(e) => setPresentacion(e.target.value)}
              className="w-full mb-2 border rounded p-2"
              disabled={!medicamentoSeleccionado}
            >
              <option value="">Selecciona presentación</option>
              {presentaciones.map((p, idx) => (
                <option key={idx} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={dosis}
              onChange={(e) => setDosis(e.target.value)}
              placeholder="Ejemplo: 500 mg cada 8 horas"
              className="w-full mb-2 border rounded p-2"
            />

            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Fecha inicio</label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Fecha fin</label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
          </>
        )}

        {/* 🔹 FORMULARIO DE TERAPIA */}
        {type === "terapia" && (
          <>
            <select
              value={terapiaSeleccionada}
              onChange={(e) => setTerapiaSeleccionada(e.target.value)}
              className="w-full mb-3 border rounded p-2"
            >
              <option value="">Selecciona una terapia</option>
              {terapias.map((t) => (
                <option key={t.id_terapia} value={t.id_terapia}>
                  {t.nombre}
                </option>
              ))}
            </select>

            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Fecha inicio</label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Fecha fin</label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
          </>
        )}

        {/* 🔹 CONFIRMACIÓN FINALIZAR CITA */}
        {type === "finalizar" && (
          <p className="text-center text-gray-700 mb-4">
            ¿Seguro que deseas marcar esta cita como <b>finalizada</b>?
          </p>
        )}

        {/* 🔹 BOTONES */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={cargando}
            className={`px-4 py-2 rounded text-white ${
              type === "finalizar"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {cargando
              ? "Procesando..."
              : type === "finalizar"
              ? "Finalizar"
              : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
