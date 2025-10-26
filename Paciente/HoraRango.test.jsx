import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HoraRango from "../../Paciente/components/Citas/HoraRango";

describe("HoraRango Component", () => {
  test("renderiza título y select con opciones", () => {
    const setHora = jest.fn();
    const hora = { tipo: "" };
    render(<HoraRango hora={hora} setHora={setHora} disabled={false} />);

    expect(screen.getByText(/Seleccione hora o rango/i)).toBeInTheDocument();
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).not.toBeDisabled();
    expect(select).toHaveDisplayValue("-- Selecciona una opción --");
    expect(screen.getByRole("option", { name: "Hora específica" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Rango de hora" })).toBeInTheDocument();
  });

  test("cambia hora.tipo al seleccionar una opción", () => {
    const setHora = jest.fn();
    const hora = { tipo: "" };
    render(<HoraRango hora={hora} setHora={setHora} disabled={false} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "especifica" } });
    expect(setHora).toHaveBeenCalledWith({ ...hora, tipo: "especifica" });

    fireEvent.change(select, { target: { value: "rango" } });
    expect(setHora).toHaveBeenCalledWith({ ...hora, tipo: "rango" });
  });

  test("deshabilita el select si la prop disabled es true", () => {
    const setHora = jest.fn();
    const hora = { tipo: "" };
    render(<HoraRango hora={hora} setHora={setHora} disabled={true} />);

    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
  });
});
