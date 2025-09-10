import React from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import VacunasImage from "./InicioImages/vacunas.png";
import SaludMentalImage from "./InicioImages/saludmental.jpg";
import PediatriaImage from "./InicioImages/pediatria.jpeg";
import RehabilitacionImage from "./InicioImages/rehabilitacionf.jpg";

// 🔽 nuevas imágenes sugeridas
import NutricionImage from "./InicioImages/nutricion.jpg";
import CardiologiaImage from "./InicioImages/cardiologia.jpg";
import TecnologiaImage from "./InicioImages/tecnologia.jpeg";
import DonacionImage from "./InicioImages/donacion.jpg";
import GinecologiaImage from "./InicioImages/ginecologia.jpg";
import JornadaImage from "./InicioImages/jornada.jpg";

export default function Inicio() {
  const novedades = [
    {
      titulo: "Campaña de Vacunación",
      descripcion:
        "Este mes iniciamos la campaña de vacunación contra la influenza para todos los pacientes y personal del hospital.",
      img: VacunasImage,
    },
    {
      titulo: "Taller de Salud Mental y Bienestar",
      descripcion:
        "Únete a nuestro taller semanal de salud mental para aprender técnicas de manejo del estrés y promoción del bienestar emocional.",
      img: SaludMentalImage,
    },
    {
      titulo: "Nueva Área de Atención Pediátrica",
      descripcion:
        "Hemos inaugurado una nueva área especializada en atención pediátrica para mejorar el cuidado de nuestros pequeños pacientes.",
      img: PediatriaImage,
    },
    {
      titulo: "Nuevo Servicio de Rehabilitación Física",
      descripcion:
        "Inauguramos un moderno centro de rehabilitación para pacientes con necesidades físicas postquirúrgicas.",
      img: RehabilitacionImage,
    },
    {
      titulo: "Programa de Nutrición y Alimentación Saludable",
      descripcion:
        "Lanzamos un programa integral de nutrición con charlas, talleres y asesorías para fomentar hábitos saludables.",
      img: NutricionImage,
    },
    {
      titulo: "Chequeos Preventivos de Cardiología",
      descripcion:
        "Durante este mes ofrecemos jornadas de chequeo cardiológico preventivo para nuestros pacientes mayores de 40 años.",
      img: CardiologiaImage,
    },
    {
      titulo: "Nueva Tecnología en Diagnóstico por Imagen",
      descripcion:
        "Incorporamos equipos de última generación en radiología y resonancia magnética para mejorar la precisión en diagnósticos.",
      img: TecnologiaImage,
    },
    {
      titulo: "Campaña de Donación de Sangre",
      descripcion:
        "Invitamos a toda la comunidad a participar en nuestra jornada solidaria de donación de sangre. ¡Tu ayuda salva vidas!",
      img: DonacionImage,
    },
    {
      titulo: "Consultas Ginecológicas Ampliadas",
      descripcion:
        "Ahora contamos con más especialistas en ginecología para mejorar la atención a nuestras pacientes.",
      img: GinecologiaImage,
    },
    {
      titulo: "Jornada de Atención Gratuita",
      descripcion:
        "El próximo sábado realizaremos una jornada de atención médica gratuita en distintas especialidades.",
      img: JornadaImage,
    },
  ];

  const breadcrumbItems = [{ label: "Inicio", href: "/inicio" }];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Contenedor con scroll interno */}
      <div className="p-8 overflow-y-auto h-[calc(100vh-9rem)]">
        <h2 className="text-2xl font-semibold mb-6">¿Qué hay de nuevo?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {novedades.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
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
                <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow-sm transition-all">
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}