import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useMovie } from "@/context/movie-context";
import { findMovieInCollection } from "@/services/TMDB/movies";
import { useAuth } from "@/context/auth-context";

export function FavoriteButton({
  movie_id,
  className,
}: {
  movie_id: number;
  className?: string;
}) {
  const [isFavorite, setFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const movie = useMovie();

  const handleButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    setLoading(true);
    await movie.updateCollection({
      status: !isFavorite,
      movie_id,
      category: "favorite",
    });
    setFavorite(!isFavorite);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      const isMovieFavorite = async () => {
        const result = await findMovieInCollection(
          "favorite",
          user.account_id,
          movie_id,
        );
        setFavorite(result);
      };

      isMovieFavorite();
    }
  }, []);

  return (
    <Button
      name="update-favorite-button"
      variant="ghost"
      className={cn(
        "hover:bg-transparent w-fit h-fit p-0 transition-all duration-300",
        className,
      )}
      disabled={loading}
      onClick={handleButtonClick}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "w-4 h-4 lg:w-5 lg:h-5",
          isFavorite
            ? "fill-red-500 hover:fill-white"
            : "fill-white hover:fill-red-500",
        )}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 11.0482L25.5301 9.40433C29.7553 4.8649 36.6058 4.8649 40.8311 9.40433C45.0563 13.9438 45.0563 21.3036 40.8311 25.8431L27.0602 40.6379C25.3701 42.4537 22.6299 42.4537 20.9398 40.6379L7.16893 25.8431C2.94369 21.3036 2.94369 13.9438 7.16893 9.40433C11.3942 4.8649 18.2447 4.8649 22.4699 9.40433L24 11.0482ZM34 10.4998C33.1716 10.4998 32.5 11.1713 32.5 11.9998C32.5 12.8282 33.1716 13.4998 34 13.4998C35.3807 13.4998 36.5 14.619 36.5 15.9998C36.5 16.8282 37.1716 17.4998 38 17.4998C38.8284 17.4998 39.5 16.8282 39.5 15.9998C39.5 12.9622 37.0376 10.4998 34 10.4998Z"
        />
      </svg>
    </Button>
  );
}
