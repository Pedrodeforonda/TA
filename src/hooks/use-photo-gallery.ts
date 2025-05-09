import { useState, useRef, useEffect } from "react";
import { useToast } from "./use-toast";
import { uploadImage } from "@/services/endpoints/detection"

export interface PhotoData {
    url: string;
    status: 'uploading' | 'uploaded' | 'error';
    error?: string;
}

export function usePhotoGallery() {
    const [photos, setPhotos] = useState<PhotoData[]>([]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [uploadQueue, setUploadQueue] = useState<number[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [firstUploadIndexInBatch, setFirstUploadIndexInBatch] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (uploadQueue.length > 0 && !isUploading) {
            processUploadQueue();
        } else if (uploadQueue.length === 0) {
            // Resetear el índice de inicio de lote cuando la cola se vacía
            setFirstUploadIndexInBatch(null);
        }
    }, [uploadQueue, isUploading]);

    const processUploadQueue = async () => {
        if (isUploading || uploadQueue.length === 0) return;
        
        setIsUploading(true);
        
        // Tomar el primer índice de la cola
        const photoIndex = uploadQueue[0];

        
        try {
            // Obtener la foto actual
            const currentPhoto = photos[photoIndex];
            if (!currentPhoto) {
                setUploadQueue(prev => prev.slice(1));
                setIsUploading(false);
                return;
            }
            
            // Marcar la foto como 'uploading'
            setPhotos(prev => {
                const updatedPhotos = [...prev];
                updatedPhotos[photoIndex] = {
                    ...updatedPhotos[photoIndex],
                    status: 'uploading'
                };
                return updatedPhotos;
            });
            
            // Convertir a Blob
            let imageBlob: Blob;
            const response = await fetch(currentPhoto.url);
            imageBlob = await response.blob();
            
            // Crear FormData
            const formData = new FormData();
            formData.append('image', imageBlob, `image_${Date.now()}.jpg`);
            
            // Subir la imagen
            const detectedPhotoUrl = await uploadImage(formData);
            
            // Actualizar el estado con la URL recibida
            setPhotos(prev => {
                const updatedPhotos = [...prev];
                updatedPhotos[photoIndex] = {
                    ...updatedPhotos[photoIndex],
                    url: detectedPhotoUrl,
                    status: 'uploaded'
                };
                return updatedPhotos;
            });
            
            // Eliminar el índice procesado de la cola
            setUploadQueue(prev => prev.slice(1));
            
            // Si la cola está vacía después de esta subida, mostrar mensaje de éxito
    if (uploadQueue.length === 1) {
        // Verificar cuántas fotos se procesaron en total
        const totalProcessedPhotos = photos.filter(p => p.status === 'uploaded').length;
        
        if (totalProcessedPhotos === 1) {
            toast({
                title: "Foto subida",
                description: "La foto ha sido procesada correctamente",
                variant: "default"
            });
        } else {
            toast({
                title: "Todas las fotos subidas",
                description: `Se han procesado ${totalProcessedPhotos} fotos correctamente`,
                variant: "default"
            });
        }
    }
            
        } catch (error) {
            console.error("Error al subir la foto:", error);
            
            // Marcar la foto con estado de error
            setPhotos(prev => {
                const updatedPhotos = [...prev];
                if (updatedPhotos[photoIndex]) {
                    updatedPhotos[photoIndex] = {
                        ...updatedPhotos[photoIndex],
                        status: 'error',
                        error: error instanceof Error ? error.message : 'Error desconocido'
                    };
                }
                return updatedPhotos;
            });
            
            // Eliminar el índice con error de la cola
            setUploadQueue(prev => prev.slice(1));
            
            toast({
                title: "Error al subir la foto",
                description: error instanceof Error ? error.message : "Ocurrió un error al subir la foto",
                variant: "destructive"
            });
        } finally {
            setIsUploading(false);
        }
    };

const addPhoto = (photoUrl: string) => {
    // Guardar el estado actual para comparar después
    const isFirstUpload = photos.length === 0;
    
    // Agregar la foto con estado inicial 'uploading'
    setPhotos(prev => {
        const newPhoto: PhotoData = {
            url: photoUrl,
            status: 'uploading' // Marcar como uploading desde el inicio
        };
        
        const newPhotos = [...prev, newPhoto];
        const newIndex = newPhotos.length - 1;
        
        // Agregar el índice a la cola de subida
        setUploadQueue(prevQueue => {
            const newQueue = [...prevQueue, newIndex];
            
            // Si la cola estaba vacía, esta es la primera foto de un nuevo lote
            if (prevQueue.length === 0) {
                // Guardar este índice como el primero del nuevo lote
                setFirstUploadIndexInBatch(newIndex);
                // Y establecer la vista en esta foto
                setCurrentPhotoIndex(newIndex);
            } 
            // Si ya hay fotos en cola pero esta es una subida nueva (ya hay fotos procesadas)
            else if (firstUploadIndexInBatch !== null) {
                // Mantener la vista en la primera foto de este lote
                setCurrentPhotoIndex(firstUploadIndexInBatch);
            }
            // Si es la primera foto en general
            else if (isFirstUpload) {
                setCurrentPhotoIndex(0);
            }
            
            return newQueue;
        });
        
        return newPhotos;
    });
};

    const removePhoto = (index: number) => {
        setPhotos((prev) => {
            const newPhotos = [...prev]
            newPhotos.splice(index, 1)

            // Ajustar el índice actual si es necesario
            if (currentPhotoIndex >= newPhotos.length) {
                setCurrentPhotoIndex(Math.max(0, newPhotos.length - 1))
            }

            return newPhotos
        })

        // Reset the file input so the same file can be uploaded again
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }

        toast({
            title: "Foto eliminada",
            description: "La foto ha sido eliminada correctamente",
            variant: "default"
        })
    }

    const goToPreviousPhoto = () => {
        if (currentPhotoIndex > 0) {
            setCurrentPhotoIndex(currentPhotoIndex - 1)
        }
    }

    const goToNextPhoto = () => {
        if (currentPhotoIndex < photos.length - 1) {
            setCurrentPhotoIndex(currentPhotoIndex + 1)
        }
    }

    const getUploadedPhotosFormData = async (): Promise<FormData | null> => {
        // Buscar la primera foto problemática
        const problemPhoto = photos.find(photo => photo.status !== 'uploaded');
        
        if (problemPhoto) {
            // Generar mensaje según el estado de la primera foto problemática
            let message = "";
            
            switch (problemPhoto.status) {
                case 'uploading':
                    message = "Hay una foto en proceso de detección";
                    break;
                case 'error':
                    message = problemPhoto.error || "Hay una foto con errores";
                    break;
            }
            
            // Mostrar el toast con el mensaje de error
            toast({
                title: "No se pueden procesar todas las fotos",
                description: message,
                variant: "destructive"
            });

            return null;
        }
            
        try {
            // Convertir todas las URLs a blobs
            const photoBlobs = await Promise.all(
                photos.map(async (photo) => {
                    const response = await fetch(photo.url);
                    return await response.blob();
                })
            );
            
            // Crear un FormData con todas las imágenes
            const formData = new FormData();
            
            // Añadir cada blob con un nombre único basado en timestamp
            photoBlobs.forEach((blob, index) => {
                formData.append('images', blob, `image_${Date.now()}_${index}.jpg`);
            });
            
            return formData;
        } catch (error) {
            console.error("Error al preparar las imágenes:", error);
            toast({
                title: "Error al preparar las imágenes",
                description: error instanceof Error ? error.message : "Ocurrió un error al procesar las fotos",
                variant: "destructive"
            });
            return null;
        }
    }

    return {
        photos,
        currentPhotoIndex,
        addPhoto,
        removePhoto,
        goToPreviousPhoto,
        goToNextPhoto,
        fileInputRef,
        getUploadedPhotosFormData,
    }
}