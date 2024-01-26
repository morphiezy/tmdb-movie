import { NavLink } from "./nav-link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button/button";
import { MenuIcon, LogOutIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";

export function MobileNav() {
  const [open, setOpen] = useState<boolean>(false);
  const { signOut } = useAuth();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          name="search-btn"
          variant="outline"
          size="icon"
          className="flex lg:hidden relative text-muted-foreground font-medium hover:text-foreground transition-colors"
        >
          <MenuIcon className="w-4 h-4 xl:mr-2" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-3 w-full max-w-72">
        <ScrollArea className="flex-1">
          <ListItem setOpen={setOpen}>
            <NavLink path="/favorite" className="block py-1">
              Favorite
            </NavLink>
          </ListItem>
          <ListItem setOpen={setOpen}>
            <NavLink path="/watchlist" className="block py-1">
              Watchlist
            </NavLink>
          </ListItem>
        </ScrollArea>
        <div>
          <ListItem setOpen={setOpen}>
            <Button
              className="p-0 h-fit w-fit text-sm text-muted-foreground hover:bg-transparent font-normal hover:text-foreground"
              variant="ghost"
              onClick={signOut}
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </ListItem>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const ListItem = ({
  children,
  setOpen,
}: {
  children: React.JSX.Element;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return <div onClick={() => setOpen(false)}>{children}</div>;
};
