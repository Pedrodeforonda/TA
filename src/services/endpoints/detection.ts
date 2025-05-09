//import { apiRequest } from "../api-client";

export async function uploadImage(imageData: FormData): Promise<string> {
  /*
  try {
    const imageBlob = await apiRequest<Blob>(
      '/detection/', 
      'POST', 
      imageData,
      true,  // Es multipart/form-data
      'blob'  // Queremos recibir un blob
    );
    
    // Convertir el blob a una URL utilizable en el frontend
    return URL.createObjectURL(imageBlob);
  } catch (error) {
    console.error('Error en la petición de subida de imagen:', error);
    throw error;
  }
    */

  await new Promise(resolve => setTimeout(resolve, 3000));
  const imageFile = imageData.get('image');
  
  if (imageFile instanceof Blob) {
    // Crear una URL temporal para el archivo
    const tempUrl = URL.createObjectURL(imageFile);
    return tempUrl;
  }
  else throw new Error("No se pudo crear la URL de la imagen");
}
