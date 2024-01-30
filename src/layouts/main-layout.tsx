import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/layouts/header";
import { useAuth } from "@/context/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { SearchMovie } from "@/components/movie/search-movie";
import { SignInButton } from "@/components/auth/signin-button";
import { SignOutButton } from "@/components/auth/signout-button";
import { MainNav } from "@/components/navigation/main-nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { useEffect } from "react";

export default function MainLayout() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="flex flex-col min-h-screen font-sans">
        <Header>
          <MainNav />
          <div className="flex flex-1 items-center justify-end gap-x-2.5">
            <SearchMovie />
            {!!user && <MobileNav />}
            {user ? <SignOutButton /> : <SignInButton />}
          </div>
        </Header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </>
  );
}
