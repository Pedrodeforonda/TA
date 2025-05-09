import { apiRequest } from "../api-client";

export interface RecognitionResponse {
  attendees: number;
  recognizedStudents?: Array<{
    id: string;
    name: string;
    status: string;
  }>;
}

export async function recognizeFaces(formData: FormData): Promise<RecognitionResponse> {
  /*try {
    return await apiRequest<RecognitionResponse>(
      '/recognition/', 
      'POST', 
      formData,
      true  // indicador para usar multipart/form-data
    );
  } catch (error) {
    console.error('Error en la petición de reconocimiento facial:', error);
    throw error;
  }
    */
  await new Promise(resolve => setTimeout(resolve, 3000));
  return {
    attendees: 10,
    recognizedStudents: [
      { id: "1", name: "Juan Pérez", status: "present" }, 
      { id: "2", name: "María López", status: "absent" },
      { id: "3", name: "Pedro González", status: "present" },
      { id: "4", name: "Ana Martínez", status: "absent" },
      { id: "5", name: "Luis Fernández", status: "present" },
    ]
  }
}