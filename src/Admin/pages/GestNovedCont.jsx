import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/UI/Breadcrumb";
import { novedades } from "../../data/novedades";

export default function InicioCont() {
  const breadcrumbItems = [{ label: "Gest. de Novedades", href: "/inicio" }];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <h2 className="text-2xl font-semibold mb-6">Gestión de Novedades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {novedades.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-400 overflow-hidden flex flex-col"
            >
              <img
                src={item.img}
                alt={item.titulo}
                className="h-40 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2">{item.titulo}</h3>
                <p className="text-gray-600 text-sm flex-grow">
                  {item.descripcion}
                </p>
                <Link
                  to={`/inicio/${item.id}`}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow-sm transition-all text-center"
                >
                  Ver más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
