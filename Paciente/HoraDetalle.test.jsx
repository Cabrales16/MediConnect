import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HoraDetalle from "../../Paciente/components/Citas/HoraDetalle";

// Mock de la imagen para evitar errores en Jest
jest.mock("../../Paciente/components/Citas/CitasIcon/rangoHoraIcon.png", () => "rangoHoraIcon.png");

describe("HoraDetalle", () => {
  const tiposCita = ["general", "odontológica", "cardiología", "desconocida"];
  let setHora;
  let hora;

  beforeEach(() => {
    setHora = jest.fn();
    hora = { tipo: "especifica", inicio: "", fin: "" };
  });

  test("genera opciones de horas para distintos tipos de cita", () => {
    tiposCita.forEach(tipo => {
      render(<HoraDetalle hora={hora} setHora={setHora} tipoCita={tipo} />);
      const opciones = screen.getAllByRole("option");
      // Debe generar al menos 10 opciones según el intervalo definido
      expect(opciones.length).toBeGreaterThan(10);
    });
  });

  test("select de hora específica permite seleccionar una hora", () => {
    render(<HoraDetalle hora={hora} setHora={setHora} tipoCita="general" />);
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "07:00 AM" } });
    expect(select.value).toBe("07:00 AM");
  });

  test("select de rango filtra correctamente las horas y reinicia fin si es menor que inicio", () => {
    hora.tipo = "rango";
    const { rerender } = render(<HoraDetalle hora={hora} setHora={setHora} tipoCita="general" />);

    const [inicioSelect, finSelect] = screen.getAllByRole("combobox");

    // Al inicio fin debe estar deshabilitado
    expect(finSelect).toBeDisabled();

    // Seleccionar hora de inicio
    fireEvent.change(inicioSelect, { target: { value: "08:00 AM" } });
    expect(setHora).toHaveBeenCalledWith(expect.objectContaining({ inicio: "08:00 AM" }));

    // Simular fin menor que inicio
    hora = { tipo: "rango", inicio: "09:00 AM", fin: "08:00 AM" };
    rerender(<HoraDetalle hora={hora} setHora={setHora} tipoCita="general" />);
    expect(screen.getAllByRole("combobox")[1].value).toBe("");

    // Verificar que opciones de fin no incluyan hora de inicio ni anteriores
    hora = { tipo: "rango", inicio: "07:00 AM", fin: "" };
    rerender(<HoraDetalle hora={hora} setHora={setHora} tipoCita="general" />);
    const opcionesFin = Array.from(screen.getAllByRole("combobox")[1].querySelectorAll("option")).map(o => o.value);
    const horasInvalidas = opcionesFin.filter(h => h.startsWith("07"));
    expect(horasInvalidas.length).toBe(0);
  });

  test("toMinutes convierte correctamente horas AM/PM y filtra opciones de fin", () => {
    hora.tipo = "rango";
    render(<HoraDetalle hora={hora} setHora={setHora} tipoCita="general" />);

    const [inicioSelect, finSelect] = screen.getAllByRole("combobox");

    fireEvent.change(inicioSelect, { target: { value: "12:00 PM" } });

    const opcionesFin = Array.from(finSelect.querySelectorAll("option")).map(o => o.value);
    expect(opcionesFin).not.toContain("12:00 PM");
  });

  test("select de fin está deshabilitado si no hay inicio seleccionado", () => {
    hora.tipo = "rango";
    render(<HoraDetalle hora={hora} setHora={setHora} tipoCita="general" />);

    const [inicioSelect, finSelect] = screen.getAllByRole("combobox");

    expect(finSelect).toBeDisabled();

    fireEvent.change(inicioSelect, { target: { value: "08:00 AM" } });
    expect(setHora).toHaveBeenCalledWith(expect.objectContaining({ inicio: "08:00 AM" }));
  });
});
