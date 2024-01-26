import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  children: React.ReactNode;
  path: string;
  className?: string;
}

export function NavLink({ children, path, className }: NavLinkProps) {
  const { pathname } = useLocation();

  return (
    <Link
      to={path}
      className={cn(
        "font-normal text-sm transition-opacity hover:text-foreground",
        pathname === path ? "text-foreground" : "text-muted-foreground",
        className,
      )}
    >
      {children}
    </Link>
  );
}
