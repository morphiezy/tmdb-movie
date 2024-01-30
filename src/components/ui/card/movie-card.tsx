import { flushSync } from "react-dom";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Movie } from "@/types";
import { FavoriteButton } from "../button/update-favorite-button";
import { UpdateWatchlistButton } from "../button/update-watchlist-button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useAuth } from "@/context/auth-context";

export interface PreDataMovieType {
  backdrop_path: string;
  poster_path: string;
  title: string;
  original_title: string;
  overview: string;
  release_data: string;
}

export function MovieCard({
  data,
  className,
}: {
  data: Movie;
  className: string;
}) {
  const navigate = useNavigate();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const { user } = useAuth();

  const preMovieData: PreDataMovieType = {
    backdrop_path: data.backdrop_path,
    poster_path: data.poster_path,
    title: data.title,
    original_title: data.original_title,
    overview: data.overview,
    release_data: data.release_date,
  };

  const animateNavigation = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    ref.current?.classList.add("movie-card");

    document.startViewTransition(() => {
      flushSync(() => {
        ref.current?.classList.remove("movie-card");
        navigate(`/movie/${data.id}`, { state: { movie: preMovieData } });
      });
    });
  };

  return (
    <Link
      ref={ref}
      to={`/movie/${data.id}`}
      onClick={animateNavigation}
      className={cn(
        "block group relative rounded-sm overflow-hidden bg-muted transition-all duration-500",
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
