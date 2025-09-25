import React from "react";

export default function ModalConfirmacion({ isOpen, email, onClose, onResend }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center animate-fadeIn">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          ¡Registro exitoso!
        </h2>
        <p className="text-gray-600 mb-4">
          Hemos enviado un link de confirmación a:
          <br />
          <span className="font-semibold">{email}</span>
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg"
          >
            Cerrar
          </button>
          <button
            onClick={onResend}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg"
          >
            Reenviar correo
          </button>
        </div>
      </div>
    </div>
  );
}