// Manejo de archivos subidos en la demo (imágenes de novedades, PDFs de terapias).
// No hay servidor, así que se guardan en localStorage (reduciendo el tamaño).

const readAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// Reduce la imagen a un máximo de 800px (JPEG) para no llenar el localStorage.
export async function imageToDataUrl(file, maxSize = 800) {
  const original = await readAsDataUrl(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = original;
    });
    const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.8);
  } catch {
    return original;
  }
}

const MAX_PDF_BYTES = 1_200_000;

// Devuelve { archivo, dataUrl }: `archivo` es la ruta "terapias/<nombre>" que
// guarda el backend real; `dataUrl` permite abrir el PDF subido en la demo.
export async function storePdf(file) {
  const safe = file.name.replace(/[^\w.-]+/g, "_");
  const archivo = `terapias/demo_${Date.now()}_${safe}`;
  const dataUrl = file.size <= MAX_PDF_BYTES ? await readAsDataUrl(file) : null;
  return { archivo, dataUrl };
}
