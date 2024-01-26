import { CollectionMovie } from "@/components/movie/collection-movie";

export default function Watchlist() {
  return (
    <div className="container py-6 lg:py-10">
      <CollectionMovie title="Watchlist Movies" collection="watchlist" />
    </div>
  );
}
