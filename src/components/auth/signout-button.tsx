import { useAuth } from "@/context/auth-context";
import { Button } from "../ui/button/button";
import { LogOutIcon } from "lucide-react";

export function SignOutButton() {
  const auth = useAuth();

  return (
    <Button
      variant="outline"
      className="hidden w-9 h-9 p-2 lg:flex"
      onClick={auth.signOut}
    >
      <LogOutIcon className="w-4 h-4" />
    </Button>
  );
}
