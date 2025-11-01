import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import agendarIcon from './NavbarIcons/agendarIcon.png'
import ModifcarDatosModal from '../UI/ModificarDatosModal'

export default function ModificarDatos() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleConfirm = () => {
    setIsOpen(false)
    navigate('/medico/inicio', {})
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-500 text-white font-medium shadow-sm hover:bg-green-600"
      >
        <img
          src={agendarIcon}
          alt="Modificar datos"
          className="w-6 h-6"
        />

        <span className="hidden md:inline whitespace-nowrap">
          Modificar datos
        </span>
      </button>

      {isOpen && (
        <ModifcarDatosModal 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  )
}
