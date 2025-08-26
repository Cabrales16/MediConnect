import React from "react";
import Breadcrumb from "../UI/Breadcrumb";
import Calendar from "./Calendario/Calendar";

export default function Citas() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Citas" }
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="text-2xl font-semibold pl-8 pt-3">Agendar cita</div>
      <Calendar />
    </>
  );
}
