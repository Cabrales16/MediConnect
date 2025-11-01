import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminLayout from "../../Admin/AdminLayout";

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => <div>{element}</div>,
    Navigate: ({ to }) => <div>Navigate to {to}</div>,
  };
});

jest.mock("../../Admin/components/Navbar/Navbar.jsx", () => ({ onToggleSidebar }) => (
  <button data-testid="navbar-toggle" onClick={onToggleSidebar}>
    Navbar
  </button>
));

jest.mock("../../Admin/components/Menu/SideBar", () => ({ open, onClose }) => (
  <div data-testid="sidebar" data-open={open}>
    Sidebar
    <button onClick={onClose}>Cerrar</button>
  </div>
));

jest.mock("../../Admin/pages/GestNovedCont.jsx", () => () => <div>InicioCont</div>);
jest.mock("../../Admin/pages/GestUsua", () => () => <div>GestUsua</div>);
jest.mock("../../Admin/pages/GestOpcio", () => () => <div>GestOpcioCont</div>);
jest.mock("../../Admin/pages/FaqCont", () => () => <div>FaqCont</div>);
jest.mock("../../Admin/pages/ConfigCont", () => () => <div>ConfigCont</div>);
jest.mock("../../Admin/pages/PerfilCont", () => () => <div>PerfilCont</div>);
jest.mock("../../Admin/pages/EditarPerfilCont", () => () => <div>EditarPerfilCont</div>);
jest.mock("../../Admin/components/GestNovedades/NovedadDetalle", () => () => <div>NovedadDetalle</div>);
jest.mock("react-toastify", () => ({
  ToastContainer: () => <div data-testid="toast-container">ToastContainer</div>,
}));

describe("AdminLayout", () => {
  test("renderiza Navbar, Sidebar y main correctamente", () => {
    render(<AdminLayout />);

    // Navbar
    expect(screen.getByTestId("navbar-toggle")).toBeInTheDocument();

    // Sidebar
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
    expect(sidebar.getAttribute("data-open")).toBe("false");

    // Main area
    const main = screen.getByRole("main", { hidden: true }) || document.querySelector("main");
    expect(main).toHaveAttribute("aria-hidden", "false");

    // ToastContainer
    expect(screen.getByTestId("toast-container")).toBeInTheDocument();
  });

  test("abre y cierra el Sidebar al hacer clic en Navbar toggle", () => {
    render(<AdminLayout />);

    const toggleButton = screen.getByTestId("navbar-toggle");
    const sidebar = screen.getByTestId("sidebar");
    const main = document.querySelector("main");

    // Inicialmente cerrado
    expect(sidebar.getAttribute("data-open")).toBe("false");
    expect(main).toHaveAttribute("aria-hidden", "false");

    // Abrir sidebar
    fireEvent.click(toggleButton);
    expect(sidebar.getAttribute("data-open")).toBe("true");
    expect(main).toHaveAttribute("aria-hidden", "true");

    // Cerrar sidebar usando botón de cerrar
    fireEvent.click(screen.getByText("Cerrar"));
    expect(sidebar.getAttribute("data-open")).toBe("false");
    expect(main).toHaveAttribute("aria-hidden", "false");
  });
});
