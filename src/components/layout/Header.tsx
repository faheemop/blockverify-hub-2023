
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 bg-background/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img
            src="public\Transparent Logo.png"
            alt="Blockstone"
            className="h-16 md:h-20 lg:h-24 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/verify">Verify Business</Link>
          </Button>
          {isAuthenticated && (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin">Admin</Link>
            </Button>
          )}
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/verify">Verify Now</Link>
          </Button>
          
          {isAuthenticated ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              Logout {user?.username}
            </Button>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Admin Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
