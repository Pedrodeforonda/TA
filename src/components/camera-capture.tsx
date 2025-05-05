import { useRef, useState, useEffect } from "react"
import { X, Zap, ZapOff, Check, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CameraCaptureProps {
    onPhotosCapture: (photos: string[]) => void
    onClose: () => void
}

export function CameraCapture({ onPhotosCapture, onClose }: CameraCaptureProps) {
    const [capturedPhotos, setCapturedPhotos] = useState<string[]>([])
    const videoRef = useRef<HTMLVideoElement>(null)
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [isVideoReady, setIsVideoReady] = useState(false)
    const cameraInitialized = useRef(false)
    const [flashMode, setFlashMode] = useState<"off" | "on">("off")
    const [isCapturing, setIsCapturing] = useState(false)
    const [isFrontCamera, setIsFrontCamera] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([])
    const [selectedCamera, setSelectedCamera] = useState<string | null>(null)
    const thumbnailsRef = useRef<HTMLDivElement>(null)

    // Check for available cameras
    useEffect(() => {
        const getDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices()
                const videoDevices = devices.filter((device) => device.kind === "videoinput")
                setAvailableCameras(videoDevices)

                // Set default camera (back camera if available)
                const backCamera = videoDevices.find(
                    (device) => device.label.toLowerCase().includes("back") || device.label.toLowerCase().includes("trasera"),
                )

                if (backCamera) {
                    setSelectedCamera(backCamera.deviceId)
                } else if (videoDevices.length > 0) {
                    setSelectedCamera(videoDevices[0].deviceId)
                }
            } catch (error) {
                console.error("Error enumerating devices:", error)
            }
        }

        getDevices()
    }, [])

    // Initialize camera
    useEffect(() => {
        if (!cameraInitialized.current && selectedCamera) {
            initializeCamera()
            cameraInitialized.current = true
        }

        return () => {
            stopCamera()
        }
    }, [selectedCamera])

    // Scroll to the end of thumbnails when new photos are added
    useEffect(() => {
        if (thumbnailsRef.current && capturedPhotos.length > 0) {
            thumbnailsRef.current.scrollLeft = thumbnailsRef.current.scrollWidth
        }
    }, [capturedPhotos])

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                takePhoto()
            } else if (e.code === "Escape") {
                cancelCapture()
            } else if (e.code === "KeyF") {
                toggleFlash()
            } else if (e.code === "KeyC") {
                switchCamera()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [isVideoReady, stream])

    const initializeCamera = async () => {
        try {
            if (stream) {
                stopCamera()
            }

            const constraints: MediaStreamConstraints = {
                video: {
                    facingMode: isFrontCamera ? "user" : "environment",
                    deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                },
            }

            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream
            }

            setStream(mediaStream)
            setIsVideoReady(true)
        } catch (error) {
            console.error("No se pudo acceder a la cámara:", error)
            alert("No se pudo acceder a la cámara. Por favor, verifica los permisos.")
        }
    }

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop())
            setStream(null)
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null
        }
        setIsVideoReady(false)
    }

    const switchCamera = () => {
        setIsFrontCamera((prev) => !prev)
        cameraInitialized.current = false

        // Find the next camera
        if (availableCameras.length > 1) {
            const currentIndex = availableCameras.findIndex((camera) => camera.deviceId === selectedCamera)
            const nextIndex = (currentIndex + 1) % availableCameras.length
            setSelectedCamera(availableCameras[nextIndex].deviceId)
        }
    }

    const toggleFlash = () => {
        setFlashMode((prev) => (prev === "off" ? "on" : "off"))

        // Apply flash effect if supported
        if (stream) {
            const track = stream.getVideoTracks()[0]
            if (track && "applyConstraints" in track) {
                try {
                    const capabilities = track.getCapabilities() as MediaTrackCapabilities & { torch?: boolean };
                    if (capabilities.torch) {
                        track.applyConstraints({
                            advanced: [{ torch: flashMode === "off" } as MediaTrackConstraintSet],
                        })
                    }
                } catch (error) {
                    console.error("Flash not supported:", error)
                }
            }
        }
    }

    const takePhoto = () => {
        if (!videoRef.current || !stream || !isVideoReady) {
            console.error("Video not ready or not available")
            return
        }

        try {
            setIsCapturing(true)

            // Flash effect
            if (flashMode === "on") {
                const flashElement = document.createElement("div")
                flashElement.className = "absolute inset-0 bg-white z-10"
                document.body.appendChild(flashElement)
                setTimeout(() => {
                    document.body.removeChild(flashElement)
                }, 150)
            }

            const video = videoRef.current
            const canvas = document.createElement("canvas")
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight

            const ctx = canvas.getContext("2d")
            if (!ctx) {
                console.error("Could not get canvas context")
                return
            }

            // Draw video frame to canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

            // Get the photo URL
            const photoUrl = canvas.toDataURL("image/jpeg", 0.95)
            setCapturedPhotos((prev) => [...prev, photoUrl])

            // Capture animation
            setTimeout(() => {
                setIsCapturing(false)
            }, 300)
        } catch (error) {
            console.error("Error taking photo:", error)
            setIsCapturing(false)
        }
    }

    const finishCapture = () => {
        stopCamera()
        onPhotosCapture(capturedPhotos)
        onClose()
    }

    const cancelCapture = () => {
        stopCamera()
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Camera view area */}
            <div className="relative flex-1">
                {/* Flash overlay */}
                {isCapturing && flashMode === "on" && <div className="absolute inset-0 bg-white z-10 animate-flash"></div>}

                {/* Video element */}
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className={cn("absolute inset-0 w-full h-full object-cover", isCapturing && "animate-capture")}
                    onLoadedMetadata={() => setIsVideoReady(true)}
                    onCanPlay={() => setIsVideoReady(true)}
                />

                {/* Top controls */}
                <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center">
                    <Button
                        onClick={toggleFlash}
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-black/40 text-white hover:bg-black/60"
                    >
                        {flashMode === "off" ? <ZapOff className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                    </Button>

                    <Button
                        onClick={cancelCapture}
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-black/40 text-white hover:bg-black/60"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Bottom area with capture button, thumbnails and done button */}
                <div className="absolute bottom-4 left-0 right-0 px-3">
                    {/* Use a relative container for proper centering */}
                    <div className="relative flex justify-center">
                        {/* Capture button - always centered */}
                        <Button
                            onClick={takePhoto}
                            disabled={!isVideoReady}
                            className={cn(
                                "rounded-full w-16 h-16 p-0 bg-white hover:bg-gray-200 focus:outline-none flex items-center justify-center z-10",
                                isCapturing && "scale-95 transition-transform"
                            )}
                            aria-label="Tomar foto"
                        >
                            <Camera className="h-8 w-8 text-black" />
                        </Button>

                        {/* Thumbnails positioned to the left */}
                        {capturedPhotos.length > 0 && (
                            <>
                                <div
                                    className="absolute left-0 bottom-0 overflow-x-auto flex gap-2 scrollbar-thin scrollbar-thumb-gray-600 max-w-[35%]"
                                    ref={thumbnailsRef}
                                    style={{ scrollBehavior: "smooth" }}
                                >
                                    {capturedPhotos.map((photo, index) => (
                                        <img
                                            key={index}
                                            src={photo}
                                            className="h-16 w-16 object-cover rounded-md border border-white/30 flex-shrink-0"
                                            alt={`Captured photo ${index + 1}`}
                                        />
                                    ))}
                                </div>

                                {/* Done button positioned to the right */}
                                <div className="absolute right-0 bottom-0">
                                    <Button onClick={finishCapture} className="bg-white text-black hover:bg-gray-200">
                                        <Check className="h-4 w-4" />
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/* Hidden canvas for processing */}
            <canvas ref={canvasRef} className="hidden" />
        </div>
    )
}
