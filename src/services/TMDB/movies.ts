import { Movie, DEFAULT_RESPONSE, MovieDetail } from "@/types";
import { CollectionCategory } from "@/context/movie-context";
import axios from "../client";

export const searchMovieByName = async (name: string) => {
  try {
    const response = await axios.get(`/3/search/movie?query=${name}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  const response = await axios.get("/3/movie/now_playing");
  return response.data.results;
};

export const getRecommendMovies = async (
  movie_id: number,
): Promise<Movie[]> => {
  const response = await axios.get(`/3/movie/${movie_id}/recommendations`);
  return response.data.results;
};

export const getTopRatedMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(`/3/movie/top_rated`);
  return response.data.results;
};

export const updateCollectionMovie = async (
  status: boolean,
  movie_id: number,
  category: CollectionCategory,
  account_id: string,
): Promise<DEFAULT_RESPONSE> => {
  try {
    const response = await axios.post(`/3/account/${account_id}/${category}`, {
      [category]: status,
      media_id: movie_id,
      media_type: "movie",
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed update ${category} movie`);
  }
};

export const getUserCollectionMovie = async (
  category: CollectionCategory,
  account_id: string,
): Promise<Movie[]> => {
  try {
    const cacheMovies = JSON.stringify(String(localStorage.getItem(category)));

    if (cacheMovies && typeof cacheMovies === "object") {
      return cacheMovies;
    }

    const response = await axios.get(
      `/3/account/${account_id}/${category}/movies`,
    );
    return response.data.results;
  } catch (error) {
    throw new Error(`Failed to get ${category} movies`);
  }
};

export const findMovieInCollection = async (
  category: CollectionCategory,
  account_id: string,
  movie_id: number,
): Promise<boolean> => {
  try {
    const response = await axios.get(
      `/3/account/${account_id}/${category}/movies`,
    );
    const movies: Movie[] = response.data.results;

    return !!movies.find((movie) => movie.id === movie_id);
  } catch (error) {
    throw new Error(`Failed to get ${category} movies`);
  }
};

export const getDetailMovie = async (
  movie_id: number,
): Promise<MovieDetail> => {
  try {
    const response = await axios.get(`/3/movie/${movie_id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Cannot find the movie`);
  }
};
