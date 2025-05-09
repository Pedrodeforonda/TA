import { ChevronLeft, ChevronRight, Trash2, AlertCircle } from "lucide-react"
import { LoadingIndicator } from "./loading-indicator"
import type { PhotoData } from "@/hooks/use-photo-gallery"

interface PhotoGalleryProps {
    photos: PhotoData[]
    currentPhotoIndex: number
    onPrevious: () => void
    onNext: () => void
    onRemove: (index: number) => void
}

export function PhotoGallery({ photos, currentPhotoIndex, onPrevious, onNext, onRemove }: PhotoGalleryProps) {
    if (photos.length === 0) {
        return null
    }

    const currentPhoto = photos[currentPhotoIndex];

    return (
        <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
                <img
                    src={currentPhoto.url || "/placeholder.svg"}
                    alt={`Foto ${currentPhotoIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                />
                
                {/* Indicadores de estado */}
                {currentPhoto.status === 'uploading' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <LoadingIndicator 
                        message="Detectando caras..." 
                        size="xl" 
                        textClass="text-white text-lg font-medium mt-4"
                        spinnerClass="text-white"
                    />
                </div>
                )}
                
                {currentPhoto.status === 'error' && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-destructive/80 text-white px-4 py-2 rounded-lg flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <span>Error: {currentPhoto.error || 'No se pudo subir la imagen'}</span>
                    </div>
                )}
            </div>

            {/* Botón para eliminar la foto actual */}
            <button
                onClick={() => onRemove(currentPhotoIndex)}
                className="absolute top-2 right-2 bg-red-500/70 hover:bg-red-600/90 text-white p-2 rounded-full transition-all z-10"
                aria-label="Eliminar foto"
            >
                <Trash2 className="h-5 w-5" />
            </button>

            {photos.length > 1 && (
                <>
                    {currentPhotoIndex > 0 && (
                        <button
                            onClick={onPrevious}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-3 sm:p-2 rounded-full hover:bg-black/50 transition-all"
                            aria-label="Foto anterior"
                        >
                            <ChevronLeft className="h-7 w-7 sm:h-6 sm:w-6" />
                        </button>
                    )}

                    {currentPhotoIndex < photos.length - 1 && (
                        <button
                            onClick={onNext}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-3 sm:p-2 rounded-full hover:bg-black/50 transition-all"
                            aria-label="Siguiente foto"
                        >
                            <ChevronRight className="h-7 w-7 sm:h-6 sm:w-6" />
                        </button>
                    )}

                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/30 text-white px-3 py-1.5 sm:px-2 sm:py-1 rounded-full text-base sm:text-sm">
                        {currentPhotoIndex + 1} / {photos.length}
                    </div>
                </>
            )}
        </div>
    )
}