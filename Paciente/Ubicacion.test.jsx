import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Ubicacion from "../../Paciente/components/Citas/Ubicacion";

describe("Ubicacion", () => {
  const ubicaciones = [
    { id: 1, nombre: "Hospital de Suba" },
    { id: 2, nombre: "Hospital de Engativá" },
    { id: 3, nombre: "Opticentro Internacional" },
  ];

  it("muestra correctamente todas las opciones en el select", () => {
    const setUbicacion = jest.fn();
    render(<Ubicacion ubicacion="" setUbicacion={setUbicacion} disabled={false} />);

    // Título
    expect(screen.getByText("Seleccione la ubicación")).toBeInTheDocument();

    // Opciones
    ubicaciones.forEach(u => {
      expect(screen.getByText(u.nombre)).toBeInTheDocument();
    });
  });

  it("permite seleccionar una ubicación y llama a setUbicacion con un número", () => {
    const setUbicacion = jest.fn();
    render(<Ubicacion ubicacion="" setUbicacion={setUbicacion} disabled={false} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "2" } });

    expect(setUbicacion).toHaveBeenCalledWith(2);
    expect(select.value).toBe("2");
  });

  it("deshabilita el select cuando la prop disabled es true", () => {
    const setUbicacion = jest.fn();
    render(<Ubicacion ubicacion="" setUbicacion={setUbicacion} disabled={true} />);

    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
  });
});
