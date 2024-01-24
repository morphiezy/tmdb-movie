import { InlineMovieList } from "@/components/inline-movie-list";
import { getNowPlayingMovies } from "@/services/TMDB/movies";
import { MovieList } from "@/components/movie-list";

export default function Home() {
  return (
    <div className="container">
      <div className="py-6 lg:py-10 space-y-10">
        <InlineMovieList
          promiseMovie={getNowPlayingMovies}
          title="Now Playing"
        />
        <MovieList />
      </div>
    </div>
  );
}
