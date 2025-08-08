document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.getElementById("togglePassword");
  const passwordField = document.getElementById("password");
  const correoInput = document.getElementById("correo");
  const feedback = document.getElementById("correo-feedback");
  const form = document.getElementById("form-registro");
  const submitBtn = document.getElementById("btn-enviar");

  let correoDisponible = true;

  // Mostrar/ocultar contraseña
  if (togglePassword && passwordField) {
    togglePassword.addEventListener("click", function () {
      const isHidden = passwordField.type === "password";
      passwordField.type = isHidden ? "text" : "password";
      this.textContent = isHidden ? "🙈 Ocultar" : "👁 Mostrar";
    });
  }

  // Verificación en tiempo real del correo (solo para el formulario de registro)
  if (correoInput && feedback) {
    correoInput.addEventListener("input", () => {
      const correo = correoInput.value;

      if (correo.length < 5 || !correo.includes("@")) {
        feedback.textContent = "";
        correoDisponible = true;
        return;
      }

      fetch("/verificar_correo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.existe) {
            feedback.textContent = "Este correo ya está registrado.";
            correoDisponible = false;
          } else {
            feedback.textContent = "";
            correoDisponible = true;
          }
        })
        .catch(() => {
          feedback.textContent = "Error al verificar el correo.";
          correoDisponible = false;
        });
    });
  }

  // Prevención de envío del formulario si el correo ya está registrado
  if (form && submitBtn) {
    form.addEventListener("submit", (e) => {
      if (!correoDisponible) {
        e.preventDefault();
        feedback.textContent = "Este correo ya está registrado.";
      }
    });
  }
});
