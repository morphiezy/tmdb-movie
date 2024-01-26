import { Button } from "../ui/button/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import TMDBIcon from "@/assets/images/tmdb.svg";
import { useAuth } from "@/context/auth-context";

export function SignInButton() {
  const auth = useAuth();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="bg-primary">
          Sign In
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="grid justify-center bg-transparent border-0">
        <Button
          variant="outline"
          size="lg"
          className="space-x-3 px-6 h-12 border-border/60"
          onClick={auth.getRequestToken}
          disabled={auth.loading}
        >
          <img src={TMDBIcon} alt="tmdb icon" className="w-8 h-8" />
          <span>{auth.loading ? "Please wait..." : "Login with TMDB"}</span>
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
}
