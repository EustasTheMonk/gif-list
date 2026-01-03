import { toaster } from "@/components/ui/toaster"
import type { ToastOptions } from "@chakra-ui/react"

export const callToast = (toastType: ToastOptions['type'], toastText: string) => {
    toaster.create({
          description: toastText,
          type: toastType,
          closable: true,
        })
}