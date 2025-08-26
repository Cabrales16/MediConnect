import React from "react";
import Breadcrumb from "../UI/Breadcrumb";
export default function Planilla() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/inicio" },
    { label: "Planilla" }
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="text-2xl font-semibold pl-8 pt-3">Citas por tomar</div>
    </>
  );
}