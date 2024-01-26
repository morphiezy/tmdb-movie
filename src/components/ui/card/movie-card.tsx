import { useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Movie } from "@/types";
import { FavoriteButton } from "../button/update-favorite-button";
import { UpdateWatchlistButton } from "../button/update-watchlist-button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useAuth } from "@/context/auth-context";

export function MovieCard({
  data,
  className,
}: {
  data: Movie;
  className: string;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const { user } = useAuth();

  return (
    <Link
      ref={ref}
      to={`/movie/${data.id}`}
      className={cn(
        "block group relative rounded-sm overflow-hidden bg-muted",
        className,
      )}
    >
      {!!data.poster_path && isVisible ? (
        <img
          src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
          alt="movie poster"
          className="w-full h-full object-cover group-hover:grayscale transition-all duration-500"
          loading="lazy"
        />
      ) : (
        false
      )}
      <div className="flex flex-col flex-wrap absolute z-10 inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-sm overflow-hidden">
        {!!isVisible && !!user ? (
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
        ) : (
          false
        )}

        <p className="w-full text-sm lg:text-base text-center text-foreground mt-auto py-2 px-3 lg:p-3 text-wrap">
          {data.title}
        </p>
      </div>
    </Link>
  );
}
