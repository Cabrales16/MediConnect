import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../../Paciente/components/Navbar/Navbar"; 

// Mocks de los componentes hijos para simplificar el test
jest.mock("../../Paciente/components/Navbar/Logo.jsx", () => ({ showText }) => <div data-testid="logo">Logo</div>);
jest.mock("../../Paciente/components/Navbar/CitaRapida.jsx", () => () => <button data-testid="cita-rapida">CitaRapida</button>);
jest.mock("../../Paciente/components/Navbar/FaqButton.jsx", () => () => <button data-testid="faq">FAQ</button>);
jest.mock("../../Paciente/components/Navbar/NotificationsButton.jsx", () => () => <button data-testid="notifications">Notifications</button>);
jest.mock("../../Paciente/components/Navbar/SettingsButton.jsx", () => () => <button data-testid="settings">Settings</button>);
jest.mock("../../Paciente/components/Navbar/ProfileButton.jsx", () => () => <button data-testid="profile">Profile</button>);

describe("Navbar", () => {
  test("renderiza correctamente el logo y los botones", () => {
    render(<Navbar onToggleSidebar={jest.fn()} />);

    // Verificamos que el logo se renderice
    expect(screen.getByTestId("logo")).toBeInTheDocument();

    // Verificamos que los botones estén en el documento
    expect(screen.getAllByTestId("cita-rapida").length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("faq").length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("notifications").length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("settings").length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("profile").length).toBeGreaterThan(0);
  });

  test("llama a onToggleSidebar cuando se hace clic en el botón de hamburguesa", () => {
    const toggleMock = jest.fn();
    render(<Navbar onToggleSidebar={toggleMock} />);

    // Buscamos el botón de hamburguesa
    const hamburgerButton = screen.getByLabelText("Abrir menú");
    fireEvent.click(hamburgerButton);

    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
});
