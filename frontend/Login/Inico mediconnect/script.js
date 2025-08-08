// Simulación sencilla para cambiar imagen con flechas
const images = [
  "https://bogota.gov.co/sites/default/files/styles/despliegue_1366x768_px/public/hospital%20engativa.jpg",
  "https://subredsuroccidente.gov.co/wp-content/uploads/2022/09/salud-mi-barrio3.png",
];

let currentIndex = 0;

const newsImage = document.querySelector(".news-image");
const prevBtn = document.querySelector(".nav-arrow.prev");
const nextBtn = document.querySelector(".nav-arrow.next");

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  newsImage.src = images[currentIndex];
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  newsImage.src = images[currentIndex];
});
