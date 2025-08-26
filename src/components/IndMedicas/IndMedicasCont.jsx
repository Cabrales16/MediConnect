import React from "react";
import Breadcrumb from "../UI/Breadcrumb";
export default function IndMedicas() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Indicaciones Médicas" }
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="text-2xl font-semibold pl-8 pt-3">Indicaciones médicas</div>
    </>
  );
}
