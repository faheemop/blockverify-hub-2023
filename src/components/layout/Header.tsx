
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 bg-background/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img 
            src="/blockstone-logo.png" 
            alt="Blockstone" 
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/verify">Verify Business</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin">Admin</Link>
          </Button>
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/verify">Verify Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
