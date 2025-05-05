import type { RefObject } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Scan, Camera } from "lucide-react"
import { CameraCapture } from "./camera-capture"

interface ActionButtonsProps {
    hasPhotos: boolean
    fileInputRef: RefObject<HTMLInputElement>
    onRecognizeFaces: () => void
    onAddPhotos: (photos: string[]) => void
}

export function ActionButtons({
                                  hasPhotos,
                                  fileInputRef,
                                  onRecognizeFaces,
                                  onAddPhotos,
                              }: ActionButtonsProps) {
    const [showCamera, setShowCamera] = useState(false)

    return (
        <>
            <div className="w-full mt-1 relative">
                <div className="flex justify-center w-full">
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Button
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-lg sm:text-lg py-4 sm:py-6 h-auto bg-white text-black hover:bg-gray-100 hover:text-black"
                        >
                            <Upload className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />
                            Subir Foto
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => setShowCamera(true)}
                            className="text-lg sm:text-lg py-4 sm:py-6 h-auto bg-white text-black hover:bg-gray-100 hover:text-black"
                        >
                            <Camera className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />
                            Tomar Foto
                        </Button>
                    </div>
                </div>

                {hasPhotos && (
                    <div className="flex justify-center mt-6 sm:mt-0 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2">
                        <Button
                            onClick={onRecognizeFaces}
                            className="text-lg sm:text-lg py-4 sm:py-6 h-auto"
                        >
                            <Scan className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />
                            Tomar Asistencia
                        </Button>
                    </div>
                )}
            </div>

            {showCamera && (
                <CameraCapture
                    onPhotosCapture={onAddPhotos}
                    onClose={() => setShowCamera(false)}
                />
            )}
        </>
    )
}