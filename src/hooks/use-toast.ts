import { toast as sonnerToast } from "sonner"

// Store toast IDs to track and update
const toasts = new Map()
let count = 0

function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER
    return count.toString()
}

function toast(props: { title?: string; description?: string; variant?: "default" | "destructive" }) {
    const id = genId()

    toasts.set(id, props)

    sonnerToast(props.title || "", {
        id,
        description: props.description,
        className: props.variant,
    })

    return {
        id,
        update: (newProps: typeof props) => {
            toasts.set(id, {...toasts.get(id), ...newProps})
            sonnerToast(newProps.title || "", {
                id,
                description: newProps.description,
                className: newProps.variant,
            })
        },
        dismiss: () => sonnerToast.dismiss(id)
    }
}

function useToast() {
    return {
        toast,
        dismiss: (id?: string) => id ? sonnerToast.dismiss(id) : sonnerToast.dismiss(),
    }
}

export { useToast, toast }