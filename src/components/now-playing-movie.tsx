import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getNowPlayingMovies } from "@/services/TMDB/movies";
import type { Movie } from "@/types";
import { MovieCard } from "./movie-card";
import { NowPlayingMovieSkeleton } from "./skeleton/skeleton-now-playing-movie";
import { ContainerMovie } from "./container-movie";

export function NowPlayingMovie() {
  const [data, setData] = useState<Movie[] | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await getNowPlayingMovies();
        setData(data);
      } catch (error) {
        const msg = (error as Error).message;
        toast.error(msg);
        setError(msg);
      }
      setLoading(false);
    };

    getMovies();
  }, []);

  if (loading) {
    return <NowPlayingMovieSkeleton />;
  }

  if (!loading && (!data?.length || error)) {
    return (
      <ContainerMovie title="Now Playing">
        <div className="w-full h-48 md:h-64 lg:h-80 grid place-items-center ">
          <p className="text-sm text-muted-foreground text-center">
            Cannot find the movie
          </p>
        </div>
      </ContainerMovie>
    );
  }

  return (
    <ContainerMovie title="Now Playing">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-3 md:space-x-4 pb-6">
          {data?.map((movie) => (
            <MovieCard
              key={movie.id}
              data={movie}
              className="w-36 h-48 md:w-52 md:h-64 lg:w-60 lg:h-80"
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </ContainerMovie>
  );
}
