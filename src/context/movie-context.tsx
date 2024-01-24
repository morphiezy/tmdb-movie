import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Movie } from "@/types";
import { useAuth } from "./auth-context";
import {
  getUserCollectionMovie,
  updateCollectionMovie,
} from "@/services/TMDB/movies";

export type CollectionCategory = "favorite" | "watchlist";

interface UpdateCollectionType {
  status: boolean;
  movie_id: number;
  category: CollectionCategory;
}

interface MovieContextType {
  favorite: Movie[];
  watchlist: Movie[];
  updateCollection: (data: UpdateCollectionType) => Promise<void>;
  getCollection: (
    category: CollectionCategory,
    account_id: string,
  ) => Promise<void>;
}

interface MovieContextProps {
  [key: string]: Movie[];
}

const MovieContext = createContext<MovieContextType | null>(null);

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [collection, setCollection] = useState<MovieContextProps>({
    favorite: [],
    watchlist: [],
  });

  const { user } = useAuth();

  const updateCollection = async ({
    status,
    movie_id,
    category,
  }: UpdateCollectionType): Promise<void> => {
    try {
      if (!user) {
        throw new Error("User must login before");
      }

      await updateCollectionMovie(status, movie_id, category, user.account_id);

      toast.success(
        `Movie ${status ? "added to" : "removed from"} ${category}`,
      );

      await getCollectionByCategory(category, user.account_id);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const getCollectionByCategory = async (
    category: CollectionCategory,
    account_id: string,
  ): Promise<void> => {
    const collection = await getUserCollectionMovie(category, account_id);

    setCollection((prev) => ({ ...prev, [category]: collection }));
  };

  useEffect(() => {
    if (user) {
      Object.keys(collection).map((item) => {
        localStorage.setItem(item, JSON.stringify(collection[item]));
      });
    }
  }, [collection, user]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!user) return;

      Promise.all<Movie[]>([
        getUserCollectionMovie("favorite", user.account_id),
        getUserCollectionMovie("watchlist", user.account_id),
      ]).then(([favorite, watchlist]) => {
        localStorage.setItem("favorite", JSON.stringify(favorite));
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
      });
    }, 120000);

    return () => {
      clearInterval(interval);
    };
  }, [user]);

  const value: MovieContextType = {
    favorite: collection.favorite,
    watchlist: collection.watchlist,
    getCollection: getCollectionByCategory,
    updateCollection,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

export const useMovie = () => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useMovie must be used within an MovieContextProvider");
  }

  return context;
};
