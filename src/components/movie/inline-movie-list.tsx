import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MovieCard } from "../ui/card/movie-card.tsx";
import { MovieContentSkeleton } from "../skeleton/movie-content-skeleton.tsx";
import type { Movie } from "@/types";
import { ErrorFeedback } from "../ui/error-feedback.tsx";

export function InlineMovieList({
  title,
  promiseMovie,
}: {
  title: string;
  promiseMovie: () => Promise<Movie[]>;
}) {
  const [data, setData] = useState<Movie[] | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await promiseMovie();
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
    return <MovieContentSkeleton />;
  }

  if (!loading && (!data?.length || error)) {
    return (
      <ErrorFeedback
        message="There are no movies to show"
        className="h-48 md:h-64 lg:h-80"
      />
    );
  }

  return (
    <section className="w-full flex flex-col gap-4 lg:gap-6">
      <h1 className="text-xl lg:text-2xl font-semibold">{title}</h1>
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
    </section>
  );
}
