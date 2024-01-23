import { createContext, useContext, useEffect } from "react";
import axios from "@/services/client";
import { Movie } from "@/types";
import { useAuth } from "./auth-context";
import { getUserCollectionMovie } from "@/services/TMDB/movies";
import { toast } from "sonner";

export type CollectionCategory = "favorite" | "watchlist";

interface UpdateCollectionType {
  status: boolean;
  movie_id: number;
  category: CollectionCategory;
}

interface MovieContextType {
  updateCollectionMovie: (data: UpdateCollectionType) => Promise<void>;
}

const MovieContext = createContext<MovieContextType | null>(null);

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  const updateCollectionMovie = async ({
    status,
    movie_id,
    category,
  }: UpdateCollectionType): Promise<void> => {
    try {
      if (!user) throw new Error("User must login before");

      await axios.post(`/3/account/${user.account_id}/${category}`, {
        [category]: status,
        media_id: movie_id,
        media_type: "movie",
      });

      toast.success(
        `Movie ${status ? "added to" : "removed from"} ${category}`,
      );

      const collection = await getUserCollectionMovie(
        category,
        user.account_id,
      );
      localStorage.setItem(category, JSON.stringify(collection));
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      Promise.all<Movie[]>([
        getUserCollectionMovie("favorite", user.account_id),
        getUserCollectionMovie("watchlist", user.account_id),
      ]).then(([favorite, watchlist]) => {
        localStorage.setItem("favorite", JSON.stringify(favorite));
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
      });
    }, 1000 * 12);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <MovieContext.Provider value={{ updateCollectionMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => {
  const context = useContext(MovieContext);

  if (!context)
    throw new Error("useMovie must be used within an MovieContextProvider");

  return context;
};
