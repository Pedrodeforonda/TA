import type React from "react"
import { Camera } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { usePhotoGallery } from "@/hooks/use-photo-gallery"
import { PhotoGallery } from "@/components/photo-gallery"
import { ActionButtons } from "@/components/action-buttons"
import { recognizeFaces, RecognitionResponse } from "@/services/endpoints/recognition"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { LoadingIndicator } from "@/components/loading-indicator"

export default function FaceRecognitionPage() {
    const { photos, currentPhotoIndex, addPhoto, removePhoto, goToPreviousPhoto, goToNextPhoto, getUploadedPhotosFormData, fileInputRef } = usePhotoGallery()
    const [recognitionLoading, setRecognitionLoading] = useState(false)
    const { toast } = useToast()

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files.length > 0) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader()
                reader.onload = (e) => {
                    if (e.target && typeof e.target.result === "string") {
                        addPhoto(e.target.result)
                    }
                }
                reader.readAsDataURL(file)
            })
        }
    }

    const sendPhotosForFaceRecognition = async () => {
        try {
            setRecognitionLoading(true)
            const formData = await getUploadedPhotosFormData();

            if (!formData) {
                setRecognitionLoading(false);
                return;
            }

            const result: RecognitionResponse = await recognizeFaces(formData)
            
            // Mostrar lista de asistencia
            
        } catch (error) {
            console.error("Error en el reconocimiento facial:", error)
            toast({
                title: "Error en el reconocimiento",
                description: error instanceof Error ? error.message : "Ocurrió un error al procesar las fotos",
                variant: "destructive"
            })
        } finally {
            setRecognitionLoading(false)
        }
    }

    return (
        <div className="container mx-auto py-4 px-3 sm:py-6 sm:px-4">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                <Camera className="h-5 w-5 sm:h-6 sm:w-6" />
                Tomar fotos de la clase
            </h1>

            <Card className="mb-6">
                <CardContent className="p-4">
                    <div className="flex flex-col items-center">
                        {/* Área de visualización de fotos */}
                        <div className="relative w-full max-w-4xl h-[350px] sm:h-[500px] bg-gray-100 mb-4 rounded-lg overflow-hidden mx-auto">
                            {photos.length > 0 ? (
                                <PhotoGallery
                                    photos={photos}
                                    currentPhotoIndex={currentPhotoIndex}
                                    onPrevious={goToPreviousPhoto}
                                    onNext={goToNextPhoto}
                                    onRemove={removePhoto}
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500">Suba fotos desde su dispositivo</div>
                            )}
                        </div>

                        {/* Botones principales */}
                        <ActionButtons
                            hasPhotos={photos.length > 0}
                            fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
                            onRecognizeFaces={sendPhotosForFaceRecognition}
                        />

                        {/* Indicador de carga para el proceso de reconocimiento */}
                        {recognitionLoading && (
                            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                            <LoadingIndicator 
                                message="Procesando reconocimiento facial..." 
                                size="xl" 
                                textClass="text-white text-xl font-bold mt-6 max-w-[80%] text-center break-words"
                                spinnerClass="text-white"
                            />
                        </div>
                        )}

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/jpeg, image/png, image/webp"
                            multiple
                            className="hidden"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}