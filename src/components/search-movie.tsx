import React from "react";
import { SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { searchMovieByName } from "@/services/TMDB/movies";
import { Movie } from "@/types";
import { cn } from "@/lib/utils";

export function SearchMovie() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [data, setData] = React.useState<Movie[] | null>(null);

  const handleCommandClose = () => {
    setIsOpen(false);
    setData(null);
  };

  const debouncedQuery = useDebounce<string>(query, 800);

  React.useEffect(() => {
    if (debouncedQuery.length <= 0) {
      setData(null);
      return;
    }

    async function fetchMovie() {
      setLoading(true);
      try {
        const data = await searchMovieByName(debouncedQuery);
        setData(data.results);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    fetchMovie();
  }, [debouncedQuery]);

  const ListMovie = () => {
    if (data && data.length) {
      return data.map((movie) => (
        <Link
          to={`/movie/${movie.id}`}
          onClick={handleCommandClose}
          key={movie.id}
          className="rounded-none block hover:bg-muted p-2"
        >
          {movie.original_title}
        </Link>
      ));
    }

    return null;
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="relative text-muted-foreground font-medium hover:text-foreground transition-colors xl:justify-start xl:w-64 xl:pl-3"
      >
        <SearchIcon className="w-4 h-4 xl:mr-2" />
        <span className="hidden xl:block">Search movie...</span>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Doctor Strange" onValueChange={setQuery} />
        <CommandEmpty
          className={cn(
            loading || (data && data.length)
              ? "hidden"
              : "grid place-items-center py-5",
          )}
        >
          Cannot find the movie.
        </CommandEmpty>
        <CommandList>
          {loading ? (
            <div className="grid place-items-center py-5">loading</div>
          ) : (
            <ListMovie />
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
