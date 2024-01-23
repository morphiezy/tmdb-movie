import { Header } from "@/layouts/header";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/context/auth-context";
import { MovieProvider } from "@/context/movie-context";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout() {
  return (
    <>
      <AuthProvider>
        <MovieProvider>
          <div className="flex flex-col min-h-screen font-sans">
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </MovieProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
}
