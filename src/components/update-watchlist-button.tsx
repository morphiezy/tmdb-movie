import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useMovie } from "@/context/movie-context";
import { useAuth } from "@/context/auth-context";
import { findMovieInCollection } from "@/services/TMDB/movies";

export function UpdateWatchlistButton({
  movie_id,
  className,
}: {
  movie_id: number;
  className?: string;
}) {
  const [isWatchList, setWatchlist] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const movie = useMovie();
  const { user } = useAuth();

  const handleButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    setLoading(true);

    await movie.updateCollection({
      status: !isWatchList,
      movie_id,
      category: "watchlist",
    });

    setWatchlist(!isWatchList);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      const isMovieWatchlist = async () => {
        const result = await findMovieInCollection(
          "watchlist",
          user.account_id,
          movie_id,
        );
        setWatchlist(result);
      };

      isMovieWatchlist();
    }
  }, []);

  return (
    <Button
      name="update-watchlist-button"
      variant="ghost"
      className={cn(
        "hover:bg-transparent w-fit h-fit p-0 transition-all",
        className,
      )}
      title="add to watchlist"
      disabled={loading}
      onClick={handleButtonClick}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "w-4 h-4 lg:w-5 lg:h-5",
          isWatchList
            ? "fill-yellow-300 hover:fill-white"
            : "fill-white hover:fill-yellow-300",
        )}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 7.75V18C4 19.6481 5.88153 20.5889 7.2 19.6L10.8 16.9C11.5111 16.3667 12.4889 16.3667 13.2 16.9L16.8 19.6C18.1185 20.5889 20 19.6481 20 18V7.75H4ZM4 6.25H20V4C20 2.89543 19.1046 2 18 2H6C4.89543 2 4 2.89543 4 4V6.25Z"
        />
      </svg>
    </Button>
  );
}
