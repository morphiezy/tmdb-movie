import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useMovie } from "@/context/movie-context";
import { MovieList } from "./movie-list";

interface CollectionMovieProps {
  title: string;
  collection: "favorite" | "watchlist";
}

export function CollectionMovie({ title, collection }: CollectionMovieProps) {
  const { user } = useAuth();
  const movie = useMovie();

  const [loading, setLoading] = useState<boolean>(!movie[collection].length);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!user) return;

    const getMovies = async () => {
      try {
        setLoading(true);
        await movie.getCollection(collection, user?.account_id as string);
      } catch (error) {
        setError("Something wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (movie[collection].length <= 0) {
      getMovies();
    }
  }, [user]);

  return (
    <MovieList
      data={movie[collection]}
      loading={loading}
      error={error}
      title={title}
    />
  );
}
