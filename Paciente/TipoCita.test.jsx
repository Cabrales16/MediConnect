import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TipoCita from "../../Paciente/components/Citas/TipoCita";

describe("TipoCita", () => {
  const opciones = [
    "Cardiologia",
    "Cita general",
    "Cita odontológica",
    "Cita pediatría",
    "Cita dermatología",
  ];

  it("muestra correctamente todas las opciones en el select", () => {
    const setTipoCita = jest.fn();
    render(<TipoCita tipoCita="" setTipoCita={setTipoCita} disabled={false} />);

    // Título
    expect(screen.getByText("Seleccionar tipo de cita")).toBeInTheDocument();

    // Opciones
    opciones.forEach(opcion => {
      expect(screen.getByText(opcion)).toBeInTheDocument();
    });
  });

  it("permite seleccionar una opción y llama a setTipoCita", () => {
    const setTipoCita = jest.fn();
    render(<TipoCita tipoCita="" setTipoCita={setTipoCita} disabled={false} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Cita general" } });

    expect(setTipoCita).toHaveBeenCalledWith("Cita general");
    expect(select.value).toBe("Cita general");
  });

  it("deshabilita el select cuando la prop disabled es true", () => {
    const setTipoCita = jest.fn();
    render(<TipoCita tipoCita="" setTipoCita={setTipoCita} disabled={true} />);

    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
  });
});
