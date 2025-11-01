import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import NovedadDetalle from "../../Admin/components/GestNovedades/NovedadDetalle";
import { toast } from "react-toastify";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: "123" }),
  useNavigate: () => mockNavigate,
}));

const mockNovedad = {
  titulo: "Nueva Novedad",
  descripcion: "Esta es la descripción de la novedad.",
  src: "/imagen.jpg",
};
jest.mock("../../services/novedades.js", () => ({
  getInfoNovedad: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("NovedadDetalle", () => {
  const { getInfoNovedad } = require("../../services/novedades.js");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("muestra mensaje de carga mientras espera datos", async () => {
    getInfoNovedad.mockReturnValue(new Promise(() => {}));
    render(<NovedadDetalle />);
    expect(screen.getByText(/Cargando novedad/i)).toBeInTheDocument();
  });

  test("renderiza novedad correctamente cuando hay datos", async () => {
    getInfoNovedad.mockResolvedValue(mockNovedad);
    render(<NovedadDetalle />);

    await waitFor(() => {
      const heading = screen.getByRole("heading", { name: mockNovedad.titulo });
      expect(heading).toBeInTheDocument();
    });

    expect(screen.getByText(mockNovedad.descripcion)).toBeInTheDocument();

    const img = screen.getByRole("img", { name: mockNovedad.titulo });
    expect(img).toHaveAttribute("src", mockNovedad.src);
  });

  test("muestra toast.error si falla la carga", async () => {
    getInfoNovedad.mockRejectedValue(new Error("Error de servidor"));
    render(<NovedadDetalle />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("No se pudo cargar la novedad");
    });
  });

  test("botón volver llama a navigate", async () => {
    getInfoNovedad.mockResolvedValue(mockNovedad);
    render(<NovedadDetalle />);

    const volverButton = await screen.findByRole("button", { name: /volver/i });
    fireEvent.click(volverButton);

    expect(mockNavigate).toHaveBeenCalledWith("/admin/inicio");
  });
});
