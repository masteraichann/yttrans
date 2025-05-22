
import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-8 mt-16">
      <div className="container">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Youtube className="h-5 w-5 text-primary" />
              <span className="font-bold">YT Scribe</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                &copy; {currentYear} YT Scribe. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                YouTube is a trademark of Google LLC.
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
