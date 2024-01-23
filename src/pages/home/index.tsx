import { InlineMovieList } from "@/components/inline-movie-list";
import { getNowPlayingMovies } from "@/services/TMDB/movies";

export default function Home() {
  return (
    <div className="container">
      <div className="py-6 lg:py-10">
        <InlineMovieList
          promiseMovie={getNowPlayingMovies}
          title="Now Playing"
        />
      </div>
    </div>
  );
}
