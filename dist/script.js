"use strict";

// Visor ampliado para revisar cada captura completa sin depender de una librería.
const lightbox = document.createElement("dialog");
lightbox.className = "image-lightbox";
lightbox.innerHTML = `
  <div class="lightbox-frame">
    <button class="lightbox-close" type="button" aria-label="Cerrar imagen">×</button>
    <div class="lightbox-stage">
      <img class="lightbox-image" alt="" />
    </div>
    <div class="lightbox-controls" aria-label="Controles de zoom">
      <button type="button" data-zoom="out" aria-label="Alejar imagen">−</button>
      <button type="button" data-zoom="reset" aria-label="Restablecer zoom">100%</button>
      <button type="button" data-zoom="in" aria-label="Acercar imagen">+</button>
    </div>
    <p class="lightbox-caption"></p>
  </div>
`;
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector(".lightbox-image");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
let zoom = 1;
const applyZoom = (value) => {
  zoom = Math.min(4, Math.max(1, value));
  lightboxImage.style.transform = `scale(${zoom})`;
  lightbox.querySelector('[data-zoom="reset"]').textContent = `${Math.round(zoom * 100)}%`;
};
const closeLightbox = () => lightbox.close();

lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightbox.querySelector('[data-zoom="out"]').addEventListener("click", () => applyZoom(zoom - .25));
lightbox.querySelector('[data-zoom="in"]').addEventListener("click", () => applyZoom(zoom + .25));
lightbox.querySelector('[data-zoom="reset"]').addEventListener("click", () => applyZoom(1));
lightbox.addEventListener("wheel", (event) => {
  if (!lightbox.open) return;
  event.preventDefault();
  applyZoom(zoom + (event.deltaY < 0 ? .15 : -.15));
}, { passive: false });
lightboxImage.addEventListener("dblclick", () => applyZoom(zoom === 1 ? 2 : 1));

document.querySelectorAll(".project-gallery img").forEach((image) => {
  const link = document.createElement("a");
  link.className = "gallery-image-link";
  link.href = image.src;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", `Abrir imagen completa: ${image.alt}`);

  image.parentNode.insertBefore(link, image);
  link.appendChild(image);

  link.addEventListener("click", (event) => {
    event.preventDefault();
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.alt;
    applyZoom(1);
    lightbox.showModal();
  });
});
