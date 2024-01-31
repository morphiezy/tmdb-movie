import { CollectionMovie } from "@/components/movie/collection-movie";
import { ErrorFeedback } from "@/components/ui/error-feedback";
import { useAuth } from "@/context/auth-context";

export default function FavoriteMovie() {
  const { user } = useAuth();

  if (!user) {
    return (
      <ErrorFeedback
        message="Authentication is required"
        className="rounded-none h-[calc(100vh-5rem)]"
      />
    );
  }

  return (
    <div className="container py-6 lg:py-10">
      <CollectionMovie title="Favorite Movies" collection="favorite" />
    </div>
  );
}
