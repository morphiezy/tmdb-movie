import { CollectionMovie } from "@/components/movie/collection-movie";

export default function FavoriteMovie() {
  return (
    <div className="container py-6 lg:py-10">
      <CollectionMovie title="Favorite Movies" collection="favorite" />
    </div>
  );
}
