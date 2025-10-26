import { render, screen, fireEvent } from "@testing-library/react";
import BuscarButton from "../../Paciente/components/Citas/BuscarButton";

describe("BuscarButton Component", () => {
  test("debe renderizar el botón Buscar", () => {
    render(<BuscarButton />);
    const buttonText = screen.getByText(/buscar/i);
    expect(buttonText).toBeInTheDocument();
  });

  test("debe renderizar el icono Buscar", () => {
    render(<BuscarButton />);
    const icon = screen.getByAltText("Buscar");
    expect(icon).toBeInTheDocument();
  });

  test("debe llamar a onClick cuando el botón se clickea y no está deshabilitado", () => {
    const handleClick = jest.fn();
    render(<BuscarButton onClick={handleClick} disabled={false} />);

    const button = screen.getByRole("button", { name: /buscar/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("no debe llamar a onClick cuando el botón está deshabilitado", () => {
    const handleClick = jest.fn();
    render(<BuscarButton onClick={handleClick} disabled={true} />);

    const button = screen.getByRole("button", { name: /buscar/i });
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test("debe reflejar el estado deshabilitado correctamente", () => {
    render(<BuscarButton disabled={true} />);
    const button = screen.getByRole("button", { name: /buscar/i });
    expect(button).toHaveClass("cursor-not-allowed");
    expect(button).toBeDisabled();
  });

  test("debe reflejar el estado habilitado correctamente", () => {
    render(<BuscarButton disabled={false} />);
    const button = screen.getByRole("button", { name: /buscar/i });
    expect(button).toHaveClass("bg-green-500");
    expect(button).not.toBeDisabled();
  });
});
