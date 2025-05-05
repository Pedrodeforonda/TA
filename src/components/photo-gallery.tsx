import { ChevronLeft, ChevronRight } from "lucide-react"
import { Trash2 } from "lucide-react"

interface PhotoGalleryProps {
    photos: string[]
    currentPhotoIndex: number
    onPrevious: () => void
    onNext: () => void
    onRemove: (index: number) => void
}

export function PhotoGallery({ photos, currentPhotoIndex, onPrevious, onNext, onRemove }: PhotoGalleryProps) {
    if (photos.length === 0) {
        return null
    }

    return (
        <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
                <img
                    src={photos[currentPhotoIndex] || "/placeholder.svg"}
                    alt={`Foto ${currentPhotoIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                />
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