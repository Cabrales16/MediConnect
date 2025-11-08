import React from "react";
import { motion } from "framer-motion";

export default function ModalConfirmacion({ isOpen, email, onClose, onResend }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center"
      >
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          ¡Registro exitoso!
        </h2>
        <p className="text-gray-700 mb-6 text-sm">
          Hemos enviado un enlace de confirmación a:{" "}
          <span className="block font-semibold mt-1">{email}</span>
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition"
          >
            Cerrar
          </button>
          <button
            onClick={onResend}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Reenviar correo
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
} 