import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import './index.css'
import {RouterProvider} from "react-router/dom";
import {router} from "./routes.tsx";

createRoot(document.getElementById('root')!).render(
  <ChakraProvider value={defaultSystem}>
    <RouterProvider router={router} />
  </ChakraProvider>
  // <StrictMode>
  //   <App />
  // </StrictMode>,
)
