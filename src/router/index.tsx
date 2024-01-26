import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/main-layout";
import Home from "@/pages/home";
import Movie from "@/pages/movie";
import FavoriteMovie from "@/pages/movie/favorite";
import Watchlist from "@/pages/movie/watchlist";

import { AuthProvider } from "@/context/auth-context";
import { MovieProvider } from "@/context/movie-context";

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <MovieProvider>
          <MainLayout />
        </MovieProvider>
      </AuthProvider>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/movie/:id", element: <Movie /> },
      { path: "/favorite", element: <FavoriteMovie /> },
      { path: "/watchlist", element: <Watchlist /> },
    ],
  },
]);
