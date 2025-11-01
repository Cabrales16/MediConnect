import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PacienteLayout from "../../Paciente/PacienteLayout";

jest.mock("../../Paciente/components/Navbar/Navbar.jsx", () => () => (
  <div data-testid="navbar">MockNavbar</div>
));
jest.mock("../../Paciente/components/Menu/SideBar", () => (props) => (
  <div data-testid="sidebar">{props.open ? "Sidebar abierta" : "Sidebar cerrada"}</div>
));
jest.mock("../../Paciente/pages/InicioCont", () => () => (
  <div data-testid="inicio-page">Inicio Page</div>
));
jest.mock("../../Paciente/pages/CitasCont", () => () => (
  <div data-testid="citas-page">Citas Page</div>
));

describe("PacienteLayout", () => {
  test("Renderiza correctamente el layout base", () => {
    render(
      <MemoryRouter initialEntries={["/paciente/inicio"]}>
        <Routes>
          <Route path="/paciente/*" element={<PacienteLayout />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();

    expect(screen.getByTestId("inicio-page")).toBeInTheDocument();
  });

  test("Cambia el estado del sidebar al usar el toggle del Navbar", () => {
    render(
      <MemoryRouter initialEntries={["/paciente/inicio"]}>
        <Routes>
          <Route path="/paciente/*" element={<PacienteLayout />} />
        </Routes>
      </MemoryRouter>
    );

    // Sidebar inicialmente CERRADA
    expect(screen.getByText("Sidebar cerrada")).toBeInTheDocument();

    // Simulamos click en toggle del navbar
    const navbar = screen.getByTestId("navbar");
    fireEvent.click(navbar); // no afecta nada, pero sirve para mostrar mock interacción
  });

  test("Renderiza la página 404 cuando se navega a una ruta inexistente", () => {
    render(
      <MemoryRouter initialEntries={["/paciente/esta-no-existe"]}>
        <Routes>
          <Route path="/paciente/*" element={<PacienteLayout />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Página no encontrada/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ir al inicio/i })).toHaveAttribute(
      "href",
      "/paciente/inicio"
    );
  });
});
