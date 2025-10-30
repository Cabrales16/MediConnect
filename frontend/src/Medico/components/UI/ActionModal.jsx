import React, { useState } from 'react'

export default function ActionModal({ type, onClose, onSubmit }) {
  const [nota, setNota] = useState('')
  const [medicamento, setMedicamento] = useState('')
  const [presentacion, setPresentacion] = useState('')
  const [unidad, setUnidad] = useState('')
  const [terapia, setTerapia] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  const handleSubmit = () => {
    onSubmit({ nota, medicamento, presentacion, unidad, terapia, fechaInicio, fechaFin })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">
          {type === 'nota' && 'Añadir Emergencia'}
          {type === 'medicamento' && 'Añadir Medicamento'}
          {type === 'terapia' && 'Añadir Terapia'}
          {type === 'finalizar' && 'Finalizar Cita'}
           {type === 'indicacion' && 'Añadir Indicacion'}
        </h3>

        {type === 'nota' && (
          <textarea
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Escribe la emergencia"
          />
        )}

        {type === 'medicamento' && (
          <>
            <select
              value={medicamento}
              onChange={(e) => setMedicamento(e.target.value)}
              className="w-full mb-2 border rounded p-2"
            >
              <option value="">Selecciona medicamento</option>
              <option value="Ibuprofeno">Ibuprofeno</option>
              <option value="Paracetamol">Paracetamol</option>
            </select>

            <select
              value={presentacion}
              onChange={(e) => setPresentacion(e.target.value)}
              className="w-full mb-2 border rounded p-2"
            >
              <option value="">Selecciona presentación</option>
              <option value="Pastilla">Pastilla</option>
              <option value="Jarabe">Jarabe</option>
            </select>

            <select
              value={unidad}
              onChange={(e) => setUnidad(e.target.value)}
              className="w-full mb-2 border rounded p-2"
            >
              <option value="">Selecciona unidad</option>
              <option value="mg">mg</option>
              <option value="ml">ml</option>
            </select>

            {/*  Campo para la fecha fin */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                Selecciona fecha inicio
              </label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            {/* Campo para la fecha fin */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                Selecciona fecha fin
              </label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
          </>
        )}

        {type === 'terapia' && (
          <>
            <select
              value={terapia}
              onChange={(e) => setTerapia(e.target.value)}
              className="w-full mb-2 border rounded p-2"
            >
              <option value="">Selecciona terapia</option>
              <option value="Fisioterapia">Fisioterapia</option>
              <option value="Terapia ocupacional">Terapia ocupacional</option>
            </select>

             {/*  Campo para la fecha fin */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                Selecciona fecha inicio
              </label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            {/* Campo para la fecha fin */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                Selecciona fecha fin
              </label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
          </>
        )}

        {type === 'indicacion' && (
          <textarea
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Escribe la indicacion para el paciente"
          />
        )}

        {type === 'finalizar' && <p>¿Seguro que deseas finalizar la cita?</p>}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {type === 'finalizar' ? 'Confirmar' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  )
}
