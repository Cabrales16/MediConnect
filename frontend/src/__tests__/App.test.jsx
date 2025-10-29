import { render, screen } from "@testing-library/react";
import App from "../App";

test("Renderiza el título correctamente", () => {
  render(<App />);
  expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument();
});
