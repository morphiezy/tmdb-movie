import { motion, AnimatePresence } from "framer-motion";
import type { Movie } from "@/types";
import { MovieCard } from "../ui/card/movie-card";
import { MovieContentSkeleton } from "../skeleton/movie-content-skeleton";
import { ErrorFeedback } from "../ui/error-feedback";

interface MovieListProps {
  title: string;
  data: Movie[] | null;
  loading: boolean;
  error: string | undefined;
}

export function MovieList({ data, loading, error, title }: MovieListProps) {
  if (loading) {
    return <MovieContentSkeleton />;
  }

  if ((!loading && (!data || !data.length)) || error) {
    return (
      <ErrorFeedback
        message={error || "There's no movie to display."}
        className="h-96"
      />
    );
  }

  return (
    <section className="w-full flex flex-col gap-4 lg:gap-6">
      <h1 className="text-xl lg:text-2xl font-semibold">{title}</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(208,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 lg:gap-y-10">
        {!!data && (
          <AnimatePresence>
            {data.map((movie) => (
              <motion.div
                animate={{ opacity: [0, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                key={movie.id}
              >
                <MovieCard key={movie.id} className="h-fit" data={movie} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
