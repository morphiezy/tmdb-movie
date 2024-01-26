import { useState, useEffect } from "react";
import { MovieList } from "./movie-list";
import { Movie } from "@/types";
import { getTopRatedMovies } from "@/services/TMDB/movies";

export function TopRatedMovie() {
  const [data, setData] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);

        const movies = await getTopRatedMovies();
        setData(movies);
      } catch (error) {
        setError("Something wrong.");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <MovieList data={data} loading={loading} error={error} title="Top Rated" />
  );
}
