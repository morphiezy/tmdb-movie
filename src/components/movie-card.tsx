import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Movie } from "@/types";
import { FavoriteButton } from "./favorite-button";
import { UpdateWatchlistButton } from "./update-watchlist-button";
import { useState } from "react";

export function MovieCard({
  data,
  className,
}: {
  data: Movie;
  className: string;
}) {
  const [isHover, setHover] = useState<boolean>(false);

  return (
    <Link
      to={`movie/${data.id}`}
      className={cn(
        "block group relative rounded-sm overflow-hidden",
        className,
      )}
      onMouseOver={() => {
        !isHover && setHover(true);
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
        alt={data.title}
        className="w-full h-full object-cover group-hover:grayscale transition-all duration-500"
      />
      <div className="flex flex-col flex-wrap absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-sm overflow-hidden">
        {!!isHover && (
          <div className="flex items-center justify-end px-2 py-2.5 gap-2 lg:gap-3">
            <FavoriteButton
              movie_id={data.id}
              className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
            />
            <UpdateWatchlistButton
              movie_id={data.id}
              className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
            />
          </div>
        )}
        <p className="w-full text-sm lg:text-base text-center text-foreground mt-auto py-2 px-3 lg:p-3 text-wrap">
          {data.title}
        </p>
      </div>
    </Link>
  );
}
