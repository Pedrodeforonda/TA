const API_URL = 'http://localhost:8000/api';

export async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  isMultipart: boolean = false,
  responseType: 'json' | 'blob' | 'text' = 'json'
): Promise<T> {
  try {
    // Construir opciones de la petición
    const options: RequestInit = {
      method,
      headers: isMultipart 
        ? {} // Para FormData no especificar Content-Type (el navegador lo hace)
        : { 'Content-Type': 'application/json' },
      body: isMultipart ? data : data ? JSON.stringify(data) : undefined,
    };

    // Realizar la petición
    const response = await fetch(`${API_URL}${endpoint}`, options);

    // Manejar errores
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    // Procesar respuesta según el tipo esperado
    let responseData: any;
    
    switch (responseType) {
      case 'json':
        responseData = await response.json();
        break;
      case 'blob':
        responseData = await response.blob();
        break;
      case 'text':
        responseData = await response.text();
        break;
    }

    return responseData as T;
  } catch (error) {
    console.error(`Error en petición a ${endpoint}:`, error);
    throw error;
  }
}