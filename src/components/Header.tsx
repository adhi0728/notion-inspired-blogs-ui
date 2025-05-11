
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would use Supabase auth

  return (
    <header className="border-b sticky top-0 z-40 bg-background">
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">Blogify</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/categories" className="nav-link">Categories</Link>
            <Link to="/about" className="nav-link">About</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Button asChild variant="ghost">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button onClick={() => setIsLoggedIn(false)}>Sign Out</Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden animate-fade-in">
          <nav className="container-custom py-6 flex flex-col gap-4">
            <Link to="/" className="nav-link text-lg" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/categories" className="nav-link text-lg" onClick={() => setIsMenuOpen(false)}>Categories</Link>
            <Link to="/about" className="nav-link text-lg" onClick={() => setIsMenuOpen(false)}>About</Link>
            <div className="h-px bg-border my-2"></div>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="nav-link text-lg" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <Button onClick={() => { setIsLoggedIn(false); setIsMenuOpen(false); }}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link to="/signin" className="nav-link text-lg" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                <Link to="/signup" className="nav-link text-lg" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
