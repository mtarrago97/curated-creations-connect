import { Search } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation then scroll
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-display text-xl font-bold tracking-tight">
            auctio
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <button onClick={() => scrollToSection("live-now")} className="text-sm text-muted-foreground transition-colors hover:text-foreground">Explore</button>
            <button onClick={() => scrollToSection("live-now")} className="text-sm text-muted-foreground transition-colors hover:text-foreground">Live Now</button>
            <button onClick={() => scrollToSection("experiences")} className="text-sm text-muted-foreground transition-colors hover:text-foreground">Experiences</button>
            <button onClick={() => scrollToSection("objects")} className="text-sm text-muted-foreground transition-colors hover:text-foreground">Objects</button>
            <button onClick={() => scrollToSection("creators")} className="text-sm text-muted-foreground transition-colors hover:text-foreground">Creators</button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              className="h-9 w-48 rounded-lg border bg-secondary pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
            />
          </div>
          {!loading && (
            user ? (
              <>
                <span className="text-sm text-muted-foreground hidden md:inline">
                  {user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
                  Sign In
                </Button>
                <Button size="sm" onClick={() => navigate("/auth")}>
                  Get Started
                </Button>
              </>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
