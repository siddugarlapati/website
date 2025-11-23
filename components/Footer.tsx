import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
             <div className="h-6 w-6 rounded-md bg-gradient-to-br from-slate-800 to-slate-900"></div>
             <span className="text-lg font-bold tracking-tight text-slate-900">Aryantra</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <button onClick={() => onNavigate('home')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Home</button>
            <button onClick={() => onNavigate('about')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">About</button>
            <button onClick={() => onNavigate('services')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Services</button>
            <button onClick={() => onNavigate('casestudies')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Case Studies</button>
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Contact</button>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2024 Aryantra Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};