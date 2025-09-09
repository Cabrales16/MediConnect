import React, { useState, useRef, useEffect } from "react";

import agendamientoIcon from "./NavbarIcons/agendamientoIcon.png";
import notifIcon from "./NavbarIcons/notifIcon.png";

import eliminarIcon from "./NavbarIcons/eliminarIcon.png";
import eliminarRojoIcon from "./NavbarIcons/eliminarRojoIcon.png";

export default function NotificationsButton() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: agendamientoIcon,
      title: "Tu cita con el Dr. Gerson Sánchez es dentro de un día",
      time: "Ayer",
    },
    {
      id: 2,
      icon: agendamientoIcon,
      title: "Nueva cita programada con la Dra. Juliana García",
      time: "Hace 3 días",
    },
    {
      id: 3,
      icon: notifIcon,
      title: "Bienvenido a MediConnect",
      time: "Hace 1 semana",
    },
  ]);

  const [hoveredTrashId, setHoveredTrashId] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function handleDelete(id) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  function handleClearAll() {
    setNotifications([]);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition relative"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Notificaciones"
      >
        <img src={notifIcon} alt="Notificaciones" className="w-6 h-6" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* Desktop: dropdown a la derecha */}
          <div className="hidden md:block absolute right-0 mt-2 w-80 z-50">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3">
                <h3 className="text-sm font-semibold">Notificaciones</h3>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar notificaciones"
                  className="p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <span className="text-lg leading-none p-2">X</span>
                </button>
              </div>

              {/* Lista */}
              <ul className="max-h-64 overflow-auto">
                {notifications.length === 0 ? (
                  <li className="p-4 text-sm text-gray-500">
                    No hay notificaciones
                  </li>
                ) : (
                  notifications.map((n) => (
                    <li
                      key={n.id}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                        <img src={n.icon} alt="" className="w-6 h-6 object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800">{n.title}</p>
                        <p className="text-xs text-green-600 mt-1">{n.time}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(n.id)}
                        aria-label={`Eliminar notificación ${n.id}`}
                        onMouseEnter={() => setHoveredTrashId(n.id)}
                        onMouseLeave={() => setHoveredTrashId(null)}
                        className="ml-2 p-2 rounded-md hover:bg-red-50 transition flex items-center justify-center"
                        title="Eliminar"
                      >
                        <img
                          src={hoveredTrashId === n.id ? eliminarRojoIcon : eliminarIcon}
                          alt="Eliminar"
                          className="w-4 h-4 object-contain"
                        />
                      </button>
                    </li>
                  ))
                )}
              </ul>

              {/* Footer */}
              <div className="p-4 flex justify-center">
                <button
                  onClick={handleClearAll}
                  className={`px-4 py-2 rounded-md ${
                    notifications.length === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200"
                  } transition text-sm`}
                  disabled={notifications.length === 0}
                >
                  Borrar todo
                </button>
              </div>
            </div>
          </div>

          {/* Móvil: modal centrado */}
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 md:hidden">
            <div className="bg-white w-11/12 max-w-sm rounded-xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h3 className="text-sm font-semibold">Notificaciones</h3>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar notificaciones"
                  className="p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <span className="text-lg leading-none p-2">X</span>
                </button>
              </div>

              {/* Lista */}
              <ul className="max-h-80 overflow-auto">
                {notifications.length === 0 ? (
                  <li className="p-4 text-sm text-gray-500">
                    No hay notificaciones
                  </li>
                ) : (
                  notifications.map((n) => (
                    <li
                      key={n.id}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                        <img src={n.icon} alt="" className="w-6 h-6 object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800">{n.title}</p>
                        <p className="text-xs text-green-600 mt-1">{n.time}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(n.id)}
                        aria-label={`Eliminar notificación ${n.id}`}
                        onMouseEnter={() => setHoveredTrashId(n.id)}
                        onMouseLeave={() => setHoveredTrashId(null)}
                        className="ml-2 p-2 rounded-md hover:bg-red-50 transition flex items-center justify-center"
                        title="Eliminar"
                      >
                        <img
                          src={hoveredTrashId === n.id ? eliminarRojoIcon : eliminarIcon}
                          alt="Eliminar"
                          className="w-4 h-4 object-contain"
                        />
                      </button>
                    </li>
                  ))
                )}
              </ul>

              {/* Footer */}
              <div className="p-4 flex justify-center border-t">
                <button
                  onClick={handleClearAll}
                  className={`px-4 py-2 rounded-md ${
                    notifications.length === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200"
                  } transition text-sm`}
                  disabled={notifications.length === 0}
                >
                  Borrar todo
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
