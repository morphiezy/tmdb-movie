import { InlineMovieList } from "@/components/movie/inline-movie-list";
import { getNowPlayingMovies } from "@/services/TMDB/movies";
import { TopRatedMovie } from "@/components/movie/top-rated-movie";

export default function Home() {
  return (
    <div className="container">
      <div className="py-6 lg:py-10 space-y-10">
        <InlineMovieList
          promiseMovie={getNowPlayingMovies}
          title="Now Playing"
        />
        <TopRatedMovie />
      </div>
    </div>
  );
}
