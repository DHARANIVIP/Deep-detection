

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-50 glass border-b border-text-primary/5 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-2">
        <div className="bg-primary-blue p-1.5 rounded-lg">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight uppercase italic">DETECTIVE<span className="text-primary-blue">AI</span></span>
      </Link>

      <div className="flex items-center space-x-6">
        {!isLandingPage && (
          <>
            <Link
              to="/"
              className="text-sm font-bold uppercase tracking-wider text-text-secondary hover:text-primary-blue transition-colors"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-bold uppercase tracking-wider text-text-secondary hover:text-primary-blue transition-colors"
            >
              Forensic Scan
            </Link>
            <Link
              to="/history"
              className="text-sm font-bold uppercase tracking-wider text-text-secondary hover:text-primary-blue transition-colors"
            >
              History
            </Link>
            <Link
              to="/methodology"
              className="text-sm font-bold uppercase tracking-wider text-text-secondary hover:text-primary-blue transition-colors"
            >
              Methodology
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
