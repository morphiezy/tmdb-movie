import React from "react";
import { Link } from "react-router-dom";

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="w-full sticky top-0 z-20 border-b bg-background/80 backdrop-blur-sm">
      <div className="flex items-center container h-16 mx-auto">
        <Link
          className="font-bold tracking-widest text-xl md:text-2xl hover:opacity-70 transition-colors"
          to="/"
        >
          CINEMA
        </Link>
        <div className="flex-1 flex items-center lg:ml-10">{children}</div>
      </div>
    </header>
  );
}
