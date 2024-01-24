import { useMovie } from "@/context/movie-context";
import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";
import { MovieCard } from "@/components/movie-card";

export function FavoriteMovie() {
  const { getCollection, favorite } = useMovie();
  const { user } = useAuth();

  useEffect(() => {
    getCollection("favorite", user?.account_id as string);
  }, []);

  return (
    <div className="container py-6 lg:py-10">
      {favorite.length ? (
        <section className="w-full flex flex-col gap-4 lg:gap-6">
          <h1 className="text-xl lg:text-2xl font-semibold">Favorite Movie</h1>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] auto-rows-[192px] md:grid-cols-[repeat(auto-fill,minmax(208,1fr))] md:auto-rows-[256px] lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:auto-rows-[320px] gap-4 lg:gap-y-10">
            {favorite.map((movie) => (
              <MovieCard key={movie.id} className="pb-[0%]" data={movie} />
            ))}
          </div>
        </section>
      ) : (
        <div className="w-full h-[400px] grid place-items-center">
          <p className="text-sm text-muted-foreground">
            There's no favorite movie here.
          </p>
        </div>
      )}
    </div>
  );
}
