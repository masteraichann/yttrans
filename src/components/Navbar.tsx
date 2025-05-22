
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ModeToggle } from './ModeToggle';
import { Youtube, Info, HelpCircle } from 'lucide-react';

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Youtube className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">YT Scribe</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <button 
            onClick={() => scrollToSection('how-to-use')} 
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <Info className="h-4 w-4" />
            How to Use
          </button>
          <button 
            onClick={() => scrollToSection('faq')} 
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <HelpCircle className="h-4 w-4" />
            FAQ
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <ModeToggle />
          <div className="block md:hidden">
            <Button 
              variant="outline" 
              size="sm" 
              className="px-2"
              onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}
            >
              <span className="sr-only">Menu</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div id="mobile-menu" className="hidden md:hidden container py-4 border-t">
        <div className="flex flex-col space-y-4">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <button 
            onClick={() => {
              scrollToSection('how-to-use');
              document.getElementById('mobile-menu')?.classList.add('hidden');
            }} 
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <Info className="h-4 w-4" />
            How to Use
          </button>
          <button 
            onClick={() => {
              scrollToSection('faq');
              document.getElementById('mobile-menu')?.classList.add('hidden');
            }} 
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <HelpCircle className="h-4 w-4" />
            FAQ
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
