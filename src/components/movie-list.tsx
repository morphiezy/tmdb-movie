import { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/services/TMDB/movies";
import type { Movie } from "@/types";
import { MovieCard } from "./movie-card";

interface MovieListProps {
  title: string;
  promiseMovie: () => Promise<Movie[]>;
}

export function MovieList() {
  const [data, setData] = useState<Movie[] | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await getTopRatedMovies();
        setData(movies);
      } catch (error) {
        setError("There're no movies to show");
      }
    };

    getMovies();
  }, []);

  return (
    <section className="w-full flex flex-col gap-4 lg:gap-6">
      <h1 className="text-xl lg:text-2xl font-semibold">Top Rated</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] auto-rows-[192px] md:grid-cols-[repeat(auto-fill,minmax(208,1fr))] md:auto-rows-[256px] lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:auto-rows-[320px] gap-4 lg:gap-y-10">
        {!!data &&
          data.map((movie) => (
            <MovieCard key={movie.id} className="pb-[0%]" data={movie} />
          ))}
      </div>
    </section>
  );
}
