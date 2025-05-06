import { useRef, useState, useEffect } from "react"
import { X, Check, Camera } from "lucide-react"
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
    const [isCapturing, setIsCapturing] = useState(false)
    const [isFrontCamera, setIsFrontCamera] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([])
    const [selectedCamera, setSelectedCamera] = useState<string | null>(null)
    const thumbnailsRef = useRef<HTMLDivElement>(null)
    const [cameraError, setCameraError] = useState<string | null>(null)
    const [isClosing, setIsClosing] = useState(false)

    // Initialize camera directly once component mounts
    useEffect(() => {
        const initCamera = async () => {
            try {
                // Request camera permission first without device selection
                const initialStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
                });
                
                // Once we have permission, we can enumerate devices properly
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === "videoinput");
                
                console.log("Available cameras:", videoDevices);
                setAvailableCameras(videoDevices);
                
                // Stop initial stream
                initialStream.getTracks().forEach(track => track.stop());
                
                // Set default camera (back camera if available)
                const backCamera = videoDevices.find(
                    device => device.label.toLowerCase().includes("back") || 
                             device.label.toLowerCase().includes("trasera")
                );
                
                if (backCamera) {
                    console.log("Using back camera:", backCamera.label);
                    setSelectedCamera(backCamera.deviceId);
                } else if (videoDevices.length > 0) {
                    console.log("Using first available camera:", videoDevices[0].label);
                    setSelectedCamera(videoDevices[0].deviceId);
                }
                
                // Initialize with selected camera
                if (videoDevices.length > 0) {
                    await initializeCamera(backCamera?.deviceId || videoDevices[0].deviceId);
                } else {
                    setCameraError("No se encontraron cámaras disponibles");
                }
            } catch (error) {
                console.error("Error initializing camera:", error);
                setCameraError("No se pudo acceder a la cámara. Por favor, verifica los permisos.");
            }
        };
        
        initCamera();
        
        return () => {
            stopCamera();
        };
    }, []);

    // Clean up before unmounting
    useEffect(() => {
        // This ensures the camera is stopped even if the component unmounts unexpectedly
        return () => {
            console.log("Component unmounting - ensuring camera is stopped");
            if (stream) {
                stream.getTracks().forEach(track => {
                    track.enabled = false;
                    track.stop();
                });
            }
        };
    }, [stream]);

    // Scroll to the end of thumbnails when new photos are added
    useEffect(() => {
        if (thumbnailsRef.current && capturedPhotos.length > 0) {
            thumbnailsRef.current.scrollLeft = thumbnailsRef.current.scrollWidth;
        }
    }, [capturedPhotos]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                takePhoto();
            } else if (e.code === "Escape") {
                cancelCapture();
            } else if (e.code === "KeyC") {
                switchCamera();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isVideoReady, stream]);

    const initializeCamera = async (deviceId?: string) => {
        try {
            if (stream) {
                stopCamera();
            }

            setCameraError(null);
            
            console.log("Initializing camera with deviceId:", deviceId);
            
            const constraints: MediaStreamConstraints = {
                video: {
                    facingMode: isFrontCamera ? "user" : "environment",
                    deviceId: deviceId ? { exact: deviceId } : undefined,
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                },
                audio: false
            };

            console.log("Requesting media with constraints:", JSON.stringify(constraints));
            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            
            console.log("Media stream obtained:", mediaStream.id);
            console.log("Video tracks:", mediaStream.getVideoTracks().map(t => t.label));

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                
                // Ensure video plays
                try {
                    await videoRef.current.play();
                    console.log("Video playback started successfully");
                } catch (playError) {
                    console.error("Error playing video:", playError);
                    // Try with user interaction if autoplay failed
                    const playPromise = videoRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.log("Autoplay prevented. Will try again with user interaction.");
                        });
                    }
                }
            }

            setStream(mediaStream);
            setIsVideoReady(true);
            setSelectedCamera(deviceId || null);
            console.log("Camera initialized successfully");
        } catch (error) {
            console.error("No se pudo acceder a la cámara:", error);
            setCameraError("No se pudo acceder a la cámara. Por favor, verifica los permisos.");
        }
    };

    const stopCamera = () => {
        console.log("Stopping camera...");
        if (stream) {
            try {
                const tracks = stream.getTracks();
                console.log(`Stopping ${tracks.length} tracks`);
                
                tracks.forEach((track) => {
                    console.log(`Stopping track: ${track.kind} - ${track.label}`);
                    track.enabled = false; // Disable track first
                    track.stop(); // Then stop it
                    console.log(`Track stopped: ${track.readyState}`);
                });
                
                // Ensure video element is reset
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.srcObject = null;
                    console.log("Video element reset");
                }
                
                setStream(null);
                setIsVideoReady(false);
                console.log("Camera stopped successfully");
            } catch (error) {
                console.error("Error stopping camera:", error);
            }
        } else {
            console.log("No stream to stop");
        }
    };

    const switchCamera = async () => {
        setIsFrontCamera((prev) => !prev);
        
        // Find the next camera
        if (availableCameras.length > 1) {
            const currentIndex = availableCameras.findIndex((camera) => camera.deviceId === selectedCamera);
            const nextIndex = (currentIndex + 1) % availableCameras.length;
            const nextCamera = availableCameras[nextIndex];
            
            console.log("Switching to camera:", nextCamera.label);
            await initializeCamera(nextCamera.deviceId);
        }
    };

    const takePhoto = () => {
        if (!videoRef.current || !stream || !isVideoReady) {
            console.error("Video not ready or not available")
            return
        }

        try {
            setIsCapturing(true)

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
        console.log("Finishing capture process...");
        // Activate closing animation
        setIsClosing(true);
        
        // Asegurarse de que la cámara se detenga completamente
        stopCamera();
        
        // Pequeña pausa antes de cerrar para asegurar que los recursos se liberen
        // y permitir que la animación de cierre se complete
        setTimeout(() => {
            console.log("Capture finished, returning photos");
            onPhotosCapture(capturedPhotos);
            onClose();
        }, 300);
    }

    const cancelCapture = () => {
        console.log("Canceling capture process...");
        // Activate closing animation
        setIsClosing(true);
        
        // Asegurarse de que la cámara se detenga completamente
        stopCamera();
        
        // Pequeña pausa antes de cerrar para asegurar que los recursos se liberen
        // y permitir que la animación de cierre se complete
        setTimeout(() => {
            console.log("Capture canceled");
            onClose();
        }, 300);
    }

    return (
        <div className={cn(
            "fixed inset-0 bg-black z-50 flex flex-col transition-opacity duration-300",
            isClosing ? "opacity-0" : "opacity-100"
        )}>
            {/* Camera view area */}
            <div className="relative flex-1">
                {/* Video element */}
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={cn("absolute inset-0 w-full h-full object-cover", isCapturing && "animate-capture")}
                    onLoadedMetadata={() => {
                        console.log("Video metadata loaded");
                        setIsVideoReady(true);
                    }}
                    onCanPlay={() => {
                        console.log("Video can play now");
                        setIsVideoReady(true);
                    }}
                />

                {/* Error message */}
                {cameraError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/80 text-white p-4 rounded-md text-center max-w-xs">
                            <p>{cameraError}</p>
                            <Button 
                                onClick={() => initializeCamera(selectedCamera || undefined)} 
                                className="mt-4 bg-white text-black hover:bg-gray-200"
                            >
                                Reintentar
                            </Button>
                        </div>
                    </div>
                )}

                {/* Top controls */}
                <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center">
                    {availableCameras.length > 1 && (
                        <Button
                            onClick={switchCamera}
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-black/40 text-white hover:bg-black/60"
                        >
                            <Camera className="h-5 w-5" />
                        </Button>
                    )}
                    
                    <Button
                        onClick={cancelCapture}
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-black/40 text-white hover:bg-black/60 ml-auto"
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
                            disabled={!isVideoReady || isClosing}
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
                                    <Button 
                                        onClick={finishCapture} 
                                        disabled={isClosing}
                                        className="bg-white text-black hover:bg-gray-200"
                                    >
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
