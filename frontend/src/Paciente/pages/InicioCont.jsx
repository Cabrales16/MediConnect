import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/UI/Breadcrumb";
import { getNovedades } from "../../services/novedades"; // importa tus funciones del backend

export default function InicioCont() {
  const breadcrumbItems = [{ label: "Inicio", href: "/paciente/inicio" }];

  // ---------- ESTADOS ----------
  const [novedades, setNovedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // ---------- FETCH NOVEDADES ----------
  useEffect(() => {
    const fetchNovedades = async () => {
      try {
        const data = await getNovedades();
        setNovedades(data);
      } catch (error) {
        console.error("Error al obtener novedades:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNovedades();
  }, []);

  // ---------- PAGINACIÓN ----------
  const totalPages = Math.ceil(novedades.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNovedades = novedades.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (loading) {
    return <div className="p-8">Cargando novedades...</div>;
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <h2 className="text-2xl font-semibold mb-6">¿Qué hay de nuevo?</h2>

        {/* Si no hay novedades */}
        {novedades.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-10">
            No hay novedades en el momento.
          </div>
        ) : (
          <>
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {currentNovedades.map((item) => (
                <div
                  key={item.id_novedad}
                  className="bg-white rounded-2xl shadow-sm border border-gray-400 overflow-hidden flex flex-col"
                >
                  <img
                    src={item.src}
                    alt={item.titulo}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{item.titulo}</h3>
                    <p className="text-gray-600 text-sm flex-grow">
                      {item.descripcion}
                    </p>
                    <Link
                      to={`/paciente/inicio/${item.id_novedad}`}
                      className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow-sm transition-all text-center"
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINACIÓN */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 gap-2">
                <button
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-500 text-white"
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Volver
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 hover:bg-green-500 hover:text-white"
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-500 text-white"
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
