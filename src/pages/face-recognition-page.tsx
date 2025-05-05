import type React from "react"

import { Camera } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { usePhotoGallery } from "@/hooks/use-photo-gallery"
import { PhotoGallery } from "@/components/photo-gallery"
import { ActionButtons } from "@/components/action-buttons"

export default function FaceRecognitionPage() {
    const { photos, currentPhotoIndex, addPhoto, removePhoto, goToPreviousPhoto, goToNextPhoto, fileInputRef } = usePhotoGallery()

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
            // Aquí iría la lógica para enviar las fotos al backend
            console.log("Enviando fotos para reconocimiento facial:", photos)
            alert("Fotos enviadas para reconocimiento facial")
        } catch (error) {
            console.error("Error al enviar fotos:", error)
            alert("Error al enviar las fotos")
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

                        {/* Controles de cámara */}
                        <ActionButtons
                            hasPhotos={photos.length > 0}
                            fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
                            onRecognizeFaces={sendPhotosForFaceRecognition}
                            onAddPhotos={(newPhotos) => newPhotos.forEach(photo => addPhoto(photo))}
                        />

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept=".jpg, .jpeg, .png, .gif, .webp"
                            multiple
                            className="hidden"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}