import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/main-layout";
import Home from "@/pages/home";
import SignIn from "@/pages/auth";
import { Movie } from "@/pages/movie";
import { FavoriteMovie } from "@/pages/movie/favorite";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/auth/session",
        element: <SignIn />,
      },
      { path: "/movie/:id", element: <Movie /> },
      { path: "/favorite", element: <FavoriteMovie /> },
    ],
  },
]);
