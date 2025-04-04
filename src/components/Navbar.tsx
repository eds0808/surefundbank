
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="font-bold text-lg text-primary">Loan Trust Buddy</div>
        
        <nav className="flex space-x-6">
          <Link 
            to="/" 
            className={`${
              location.pathname === '/' 
                ? 'text-primary font-medium' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Clients
          </Link>
          
          <Link 
            to="/new-loan" 
            className={`${
              location.pathname === '/new-loan' 
                ? 'text-primary font-medium' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            New Loan
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
