import {useRef, useState } from "react"
import {toast} from "./use-toast"

export function usePhotoGallery() {
    const [photos, setPhotos] = useState<string[]>([])
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const addPhoto = (photoUrl: string) => {
        setPhotos((prev) => [...prev, photoUrl])
        setCurrentPhotoIndex(photos.length)
    }

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

    return {
        photos,
        currentPhotoIndex,
        addPhoto,
        removePhoto,
        goToPreviousPhoto,
        goToNextPhoto,
        fileInputRef
    }
}