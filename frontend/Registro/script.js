const container = document.querySelector(".container");
const registrationBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

registrationBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
