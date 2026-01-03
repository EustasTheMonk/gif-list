import {createBrowserRouter} from "react-router";
import {CoreLayout} from "@/components/CoreLayout/CoreLayout.tsx";
import {GifsGrid} from "./components/GifsGrid/GifsGrid";
import {GifPage} from "./components/GifPage/GifPage";
import {routesParams} from "./Enums/routesParams";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CoreLayout />,
    children: [
      {
        element: <GifsGrid />,
        index: true,
      },
      {
        element: <GifPage />,
        path: `/:${routesParams.id}`,
      },
      {
        element: <GifsGrid />,
        path: `/search/:${routesParams.search}`,
      },
    ],
  },
]);
