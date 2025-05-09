import { Loader2 } from "lucide-react"

interface LoadingIndicatorProps {
  message?: string
  size?: "sm" | "md" | "lg" | "xl"
  textClass?: string
  spinnerClass?: string
}

export function LoadingIndicator({ 
  message = "Cargando...", 
  size = "md",
  textClass = "text-muted-foreground",
  spinnerClass = "text-primary"
}: LoadingIndicatorProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin ${spinnerClass}`} />
      {message && <p className={textClass}>{message}</p>}
    </div>
  )
}