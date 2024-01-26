import { NavLink } from "./nav-link";

export function MainNav() {
  return (
    <div className="hidden lg:flex items-center gap-4">
      <NavLink path="/favorite">Favorite</NavLink>
      <NavLink path="/watchlist">Watchlist</NavLink>
    </div>
  );
}
