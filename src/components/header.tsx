import React from "react";
import { Link } from "react-router-dom";
import { SignInButton } from "./auth/signin-button";
import { SignOutButton } from "./auth/signout-button";
import { useAuth } from "@/context/auth-context";
import { SearchMovie } from "./search-movie";

export function Header({ children }: { children?: React.ReactNode }) {
  const auth = useAuth();

  return (
    <header className="w-full sticky top-0 border-b bg-background/80 backdrop-blur-sm">
      <div className="flex items-center container h-16 mx-auto">
        <Link
          className="font-bold tracking-widest text-xl md:text-2xl hover:opacity-70 transition-colors"
          to="/"
        >
          CINEMA
        </Link>
        {children}
        <div className="flex-1 flex items-center justify-end gap-3">
          <SearchMovie />
          {auth.user ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>
    </header>
  );
}
