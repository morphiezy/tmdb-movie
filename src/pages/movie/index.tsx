import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { getDetailMovie } from "@/services/TMDB/movies";
import type { MovieDetail } from "@/types";
import { toast } from "sonner";
import { convertRuntimeMovieToTime } from "@/lib/utils";
import { FavoriteButton } from "@/components/ui/button/update-favorite-button";
import { UpdateWatchlistButton } from "@/components/ui/button/update-watchlist-button";
import { InlineMovieList } from "@/components/movie/inline-movie-list";
import { getRecommendMovies } from "@/services/TMDB/movies";

export default function Movie() {
  const location = useLocation();
  const params = useParams();

  const [movie, setMovie] = useState<MovieDetail | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useAuth();

  useEffect(() => {
    const locationState = location.state;

    if (locationState) setMovie(location.state.movie);

    if (params.id) {
      const getMovie = async () => {
        try {
          setLoading(true);
          const data = await getDetailMovie(Number(params.id));
          setMovie(data);
        } catch (error) {
          toast.error("Can't find the movie");
        } finally {
          setLoading(false);
        }
      };

      getMovie();
    }
  }, [params.id, location.state]);

  if (!loading && !movie) {
    return (
      <div className="w-full h-96 grid place-items-center">
        <h1>Cannot find the movie</h1>
      </div>
    );
  }

  return (
    <div className="text-white ">
      <div className="relative w-full h-[550px] sm:h-[500px] lg:h-[450px] bg-black">
        {movie?.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`}
            className="w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto flex flex-col lg:flex-row items-center gap-5">
            <div className="w-[140px] h-[180px] lg:w-[200px] lg:h-[300px] rounded-md overflow-hidden shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
                alt="movie poster"
                className="w-full h-full object-cover movie-card"
              />
            </div>
            <div className="flex flex-col gap-4 lg:gap-6">
              <div className="space-y-2">
                <h1 className="text-xl lg:text-3xl font-bold">
                  {movie?.original_title}
                </h1>
                <div className="flex flex-wrap min-h-[20px] h-auto items-center gap-y-1 gap-x-3 lg:gap-4 text-sm font-normal text-white/80">
                  {!!movie?.release_date && (
                    <p>{movie.release_date.replace(/-/g, "/")}</p>
                  )}
                  {!!movie?.genres && (
                    <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
                  )}
                  {!!movie?.runtime && (
                    <p>{convertRuntimeMovieToTime(movie.runtime)}</p>
                  )}
                </div>
              </div>

              {!!user && !loading ? (
                <div className="min-h-[16px] lg:min-h-[20px] h-auto">
                  <div className="flex gap-4">
                    <UpdateWatchlistButton movie_id={movie?.id as number} />
                    <FavoriteButton movie_id={movie?.id as number} />
                  </div>
                </div>
              ) : (
                false
              )}

              <div className="space-y-2 text-sm lg:text-base">
                {loading ||
                  (movie?.tagline && (
                    <div className="min-h-[20px] lg:min-h-[24px] h-auto">
                      <p className="italic">{movie?.tagline}</p>
                    </div>
                  ))}
                {!!movie?.overview && (
                  <div className="space-y-1">
                    <h2 className="font-medium">Overview</h2>
                    <p className="line-clamp-3">{movie?.overview}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-10 lg:my-16">
        <InlineMovieList
          key={params.id}
          promiseMovie={() => getRecommendMovies(Number(params.id))}
          title="Recommend Movies"
        />
      </div>
    </div>
  );
}
