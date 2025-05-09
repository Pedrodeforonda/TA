import type { RefObject } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Scan } from "lucide-react"

interface ActionButtonsProps {
    hasPhotos: boolean
    fileInputRef: RefObject<HTMLInputElement>
    onRecognizeFaces: () => void
}

export function ActionButtons({
                                  hasPhotos,
                                  fileInputRef,
                                  onRecognizeFaces,
                              }: ActionButtonsProps) {

    return (
        <>
            <div className="w-full mt-1 relative">
                <div className="flex justify-center w-full">
                    <div className="flex flex-col gap-6 items-center">
                        <Button
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-lg sm:text-lg py-4 sm:py-6 h-auto bg-white text-black hover:bg-gray-100 hover:text-black"
                        >
                            <Upload className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />
                            Subir Foto
                        </Button>

                        {hasPhotos && (
                            <Button
                                onClick={onRecognizeFaces}
                                className="text-lg sm:text-lg py-4 sm:py-6 h-auto"
                            >
                                <Scan className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />
                                Tomar Asistencia
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}