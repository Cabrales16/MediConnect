import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calendario from "../../Paciente/Components/Citas/Calendario";
import dayjs from "dayjs";

jest.mock("../../Paciente/components/Citas/CitasIcon/flechaIcon.png", () => "flechaIcon.png");
jest.mock("../../Paciente/components/Citas/CitasIcon/flechaIconIzq.png", () => "flechaIconIzq.png");

jest.useFakeTimers().setSystemTime(new Date("2025-01-15"));

describe("Calendario Component", () => {
  test("muestra el mes actual en pantalla", () => {
    render(<Calendario selectedDate={null} setSelectedDate={jest.fn()} />);
    expect(screen.getByText(/enero 2025/i)).toBeInTheDocument();
  });

  test("renderiza exactamente 42 días habilitados en el calendario visible", () => {
    const setSelectedDate = jest.fn();
    const { container } = render(
      <Calendario selectedDate={null} setSelectedDate={setSelectedDate} />
    );

    // El primer grid es el encabezado, el segundo contiene los días
    const visibleCalendar = container.querySelectorAll(".grid")[1];
    const allButtons = within(visibleCalendar).getAllByRole("button");
    const enabledButtons = allButtons.filter((btn) => !btn.disabled);

    expect(enabledButtons).toHaveLength(42);
  });

  test("llama a setSelectedDate al hacer click en un día habilitado", () => {
    const mockFn = jest.fn();
    render(<Calendario selectedDate={null} setSelectedDate={mockFn} />);

    const dayButtons = screen.getAllByRole("button", { name: /^[0-9]+$/ });
    const firstEnabled = dayButtons.find((btn) => !btn.disabled);

    fireEvent.click(firstEnabled);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("el botón siguiente cambia al mes siguiente", () => {
    render(<Calendario selectedDate={null} setSelectedDate={jest.fn()} />);
    const nextBtn = screen.getByAltText("Siguiente");
    fireEvent.click(nextBtn);
    expect(screen.getByText(/febrero 2025/i)).toBeInTheDocument();
  });

  test("el botón anterior cambia al mes anterior", () => {
    render(<Calendario selectedDate={null} setSelectedDate={jest.fn()} />);
    const prevBtn = screen.getByAltText("Anterior");
    fireEvent.click(prevBtn);
    expect(screen.getByText(/diciembre 2024/i)).toBeInTheDocument();
  });

  test("resalta el día seleccionado con la clase correspondiente", () => {
    const selectedDate = "2025-01-10";
    render(<Calendario selectedDate={selectedDate} setSelectedDate={jest.fn()} />);
    const selectedBtn = screen.getByRole("button", { name: "10" });
    expect(selectedBtn).toHaveClass("bg-green-500", "text-white");
  });

  test("los días fuera del mes actual están deshabilitados y en gris", () => {
    const { container } = render(
      <Calendario selectedDate={null} setSelectedDate={jest.fn()} />
    );

    const disabledBtns = Array.from(container.querySelectorAll("button")).filter(
      (btn) => btn.disabled
    );

    expect(disabledBtns.length).toBeGreaterThan(0);
    disabledBtns.forEach((btn) => {
      expect(btn).toHaveClass("text-gray-400");
    });
  });
});
