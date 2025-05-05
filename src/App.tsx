import FaceRecognitionPage from "./pages/face-recognition-page.tsx"
import { Toaster } from "sonner"

function App() {
    return (
        <div>
            <FaceRecognitionPage />
            <Toaster position="top-right" />
        </div>
    )
}

export default App