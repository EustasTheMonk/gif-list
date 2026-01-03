import {createRoot} from 'react-dom/client'
import {ChakraProvider, defaultSystem} from "@chakra-ui/react"
import './index.css'
import {RouterProvider} from "react-router/dom";
import {router} from "./routes.tsx";
import {ColorModeProvider} from "@/components/ui/color-mode.tsx";

createRoot(document.getElementById('root')!).render(
  <ColorModeProvider>
      <ChakraProvider value={defaultSystem}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </ColorModeProvider>
)
