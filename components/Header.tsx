
import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Solutions', id: 'services' },
    { name: 'Industries', id: 'industries' }, 
    { name: 'Integrations', id: 'integrations' }, 
    { name: 'Resources', id: 'resources' }, 
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      {/* The pointer-events-auto wrapper allows clicks on header but passes through clicks on the sides */}
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-lg border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-full px-2 pl-6 py-2 flex items-center justify-between pointer-events-auto transition-all duration-300">
            
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2.5 group focus:outline-none mr-4"
          >
            <div className="h-9 w-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <span className="font-display font-bold text-lg">A</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 font-display hidden sm:block">Aryantra</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentPage === link.id 
                    ? 'text-slate-900 bg-slate-100' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 pl-4">
            <button 
              onClick={() => onNavigate('signin')}
              className="hidden md:flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap"
            >
              Sign In <ArrowRight size={14} />
            </button>
            
            <button 
              onClick={() => onNavigate('contact')}
              className="hidden md:flex items-center justify-center h-10 px-6 text-sm font-bold text-white bg-[#4F46E5] rounded-full hover:bg-[#4338ca] transition-all shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              Book a demo
            </button>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="pointer-events-auto absolute top-full mt-2 w-[90%] max-w-sm bg-white rounded-2xl border border-slate-100 shadow-xl p-4 animate-in slide-in-from-top-5 fade-in duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-sm font-medium px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                {link.name}
              </button>
            ))}
            <div className="h-px bg-slate-100 my-2"></div>
            <button 
              onClick={() => {
                onNavigate('signin');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-sm font-medium px-4 py-3 text-blue-600"
            >
              Sign In
            </button>
            <button 
              onClick={() => {
                onNavigate('contact');
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-1 h-10 font-bold text-white bg-[#4F46E5] rounded-xl shadow-md"
            >
              Book a demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
