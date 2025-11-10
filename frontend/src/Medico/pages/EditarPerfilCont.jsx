import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/UI/Breadcrumb";
import { getPerfil, updatePerfil } from "../../services/perfilService";
import { toast } from "react-toastify";

export default function EditarPerfilCont() {
  const navigate = useNavigate();
  const id_usuario = localStorage.getItem("id_usuario");

  const breadcrumbItems = [
    { label: "Inicio", href: "/medico/inicio" },
    { label: "Perfil", href: "/medico/perfil" },
    { label: "Editar" },
  ];

  const [formData, setFormData] = useState({
    tipoDocumento: "",
    numeroDocumento: "",
    telefono: "",
    direccion: "",
    correo: "",
    // horaInicio: "",
    // horaFin: "",
    // diaInicio: "",
    // diaFin: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const data = await getPerfil(id_usuario);
        setFormData({
          tipoDocumento: data.tipo_documento || "",
          numeroDocumento: data.num_documento || "",
          telefono: data.telefono || "",
          direccion: data.direccion || "",
          correo: data.correo || "",
          // horaInicio: data.hora_inicio || "",
          // horaFin: data.hora_fin || "",
          // diaInicio: data.dia_inicio || "",
          // diaFin: data.dia_fin || "",
        });
      } catch (error) {
        console.error("❌ Error cargando perfil:", error);
        toast.error("Error cargando perfil");
      }
    };
    fetchPerfil();
  }, [id_usuario]);

  // const horarios = [
  //   "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM",
  //   "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  //   "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM",
  //   "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  //   "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM",
  // ];

  // const diasSemana = [
  //   "Lunes",
  //   "Martes",
  //   "Miércoles",
  //   "Jueves",
  //   "Viernes",
  //   "Sábado",
  //   "Domingo",
  // ];

  const calcularDiferenciaHoras = (inicio, fin) => {
    const parseHora = (h) => {
      const [time, meridiem] = h.split(" ");
      let [hour, minute] = time.split(":").map(Number);
      if (meridiem === "PM" && hour !== 12) hour += 12;
      if (meridiem === "AM" && hour === 12) hour = 0;
      return hour + minute / 60;
    };
    return parseHora(fin) - parseHora(inicio);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    // Validar rango mínimo de 5 horas
    if (updated.horaInicio && updated.horaFin) {
      const diff = calcularDiferenciaHoras(updated.horaInicio, updated.horaFin);
      if (diff < 5) setError("El rango mínimo debe ser de 5 horas.");
      else setError("");
    }
  };

  const handleSave = async () => {
    if (error) {
      toast.error("Corrige los errores antes de guardar");
      return;
    }
    try {
      await updatePerfil(id_usuario, {
        tipo_documento: formData.tipoDocumento,
        num_documento: formData.numeroDocumento,
        telefono: formData.telefono,
        direccion: formData.direccion,
        correo: formData.correo,
        // hora_inicio: formData.horaInicio,
        // hora_fin: formData.horaFin,
        // dia_inicio: formData.diaInicio,
        // dia_fin: formData.diaFin,
      });
      toast.success("Perfil actualizado correctamente");
      navigate("/medico/perfil");
    } catch (error) {
      console.error("❌ Error al actualizar perfil:", error);
      toast.error("Error al actualizar perfil");
    }
  };

  const handleCancel = () => {
    navigate("/medico/perfil");
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <h2 className="text-2xl font-semibold mb-2">Editar perfil</h2>
        <p className="text-sm text-gray-600 mb-6">
          Modificar la información de contacto.
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-6 max-w-2xl">
          {/* Tipo documento */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Tipo de documento
            </label>
            <select
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
              disabled
            >
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="RC">Registro Civil</option>
              <option value="PAS">Pasaporte</option>
              <option value="CE">Cédula de Extranjería</option>
            </select>
          </div>

          {/* Numero documento */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Número de documento</label>
            <input
              type="text"
              name="numeroDocumento"
              value={formData.numeroDocumento}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
              disabled
            />
          </div>

          {/* Teléfono */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Dirección */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Correo */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Horario y días
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Horario de atención
            </label>

            <div className="flex flex-wrap gap-3 mb-4">
              <select
                name="horaInicio"
                value={formData.horaInicio}
                onChange={handleChange}
                className="flex-1 min-w-[48%] border rounded-lg px-3 py-2"
              >
                <option value="">Desde (7:00 AM)</option>
                {horarios.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>

              <select
                name="horaFin"
                value={formData.horaFin}
                onChange={handleChange}
                className="flex-1 min-w-[48%] border rounded-lg px-3 py-2"
              >
                <option value="">Hasta (7:00 PM)</option>
                {horarios.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                name="diaInicio"
                value={formData.diaInicio}
                onChange={handleChange}
                className="flex-1 min-w-[48%] border rounded-lg px-3 py-2"
              >
                <option value="">Día inicial</option>
                {diasSemana.map((dia) => (
                  <option key={dia} value={dia}>
                    {dia}
                  </option>
                ))}
              </select>

              <select
                name="diaFin"
                value={formData.diaFin}
                onChange={handleChange}
                className="flex-1 min-w-[48%] border rounded-lg px-3 py-2"
              >
                <option value="">Día final</option>
                {diasSemana.map((dia) => (
                  <option key={dia} value={dia}>
                    {dia}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div> */}

          {/* Botones */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-5 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}