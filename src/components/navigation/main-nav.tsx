import { Link } from "react-router-dom";

export function MainNav() {
  return (
    <div className="flex items-center gap-4">
      <Link to="/favorite" className="font-normal text-sm text-foreground">
        Favorite
      </Link>
      <Link to="/watchlist" className="font-normal text-sm text-foreground">
        Watchlist
      </Link>
    </div>
  );
}
