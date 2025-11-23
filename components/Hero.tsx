import React from 'react';
import { Button } from './Button';
import { Home } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative flex w-full flex-1 items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        
        {/* Left Content */}
        <div className="flex flex-col gap-6 text-left animate-in slide-in-from-left-5 fade-in duration-700">
          <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Automate Your Real Estate Workflow with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              AI Agents
            </span>
          </h1>
          
          <p className="max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
            Aryantra empowers real estate professionals by automating client engagement, lead follow-ups, and property management tasks across WhatsApp, Email, and your CRM.
          </p>
          
          <div className="mt-4 flex flex-wrap gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 border-0 shadow-blue-500/20">Book a Demo</Button>
            <Button size="lg" variant="outline">See it in action</Button>
          </div>
          
          {/* Optional: Trust markers or additional info could go here */}
        </div>

        {/* Right Visuals */}
        <div className="relative w-full animate-in slide-in-from-right-5 fade-in duration-700 delay-150">
          {/* Main Image Container */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-2xl ring-1 ring-slate-900/5">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
              style={{ 
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDIC8kPDy2m6-2yChl3yHuR2q9Spd_6SHziyyUbep7-KW8deV62QvzzE-zcObnTQj2HbXSqCwBGQR-3uLQvdN8fDyDrRaM9ZD1bTFpLPEd5xsxJ0413E45TloU52_PchIxE6cASN29DL9AnGOOw7YCsTbUBxvoYQZcKdwAJAZEBUp-VAURnjEIA3N1JQBSK2MJCUyKHQpEMXgGKBCLlJ63F9-7tGGDhv5nKj2k2GY31rm6IyQCt8PSjrqXydhsI69F0fpg7FCGAN7o")' 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            
            {/* Icon overlay for image context (optional, mimics placeholder in prompt) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
               <svg className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
            </div>
          </div>

          {/* Floating UI Element: Top Right (Inquiry) */}
          <div className="absolute -right-4 -top-8 z-20 w-72 animate-bounce-slow rounded-xl border border-white/40 bg-white/85 p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:-right-8">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Home size={14} />
              </span>
              New Property Inquiry
            </div>
            
            <div className="flex items-start gap-3">
              <img 
                className="h-12 w-12 rounded-lg border border-slate-200 object-cover shadow-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIC8kPDy2m6-2yChl3yHuR2q9Spd_6SHziyyUbep7-KW8deV62QvzzE-zcObnTQj2HbXSqCwBGQR-3uLQvdN8fDyDrRaM9ZD1bTFpLPEd5xsxJ0413E45TloU52_PchIxE6cASN29DL9AnGOOw7YCsTbUBxvoYQZcKdwAJAZEBUp-VAURnjEIA3N1JQBSK2MJCUyKHQpEMXgGKBCLlJ63F9-7tGGDhv5nKj2k2GY31rm6IyQCt8PSjrqXydhsI69F0fpg7FCGAN7o" 
                alt="Property Thumbnail"
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">123 Main St, Anytown</p>
                <p className="mt-1 text-xs text-slate-500">
                  John Doe - <span className="font-semibold text-blue-600">Interested</span>
                </p>
              </div>
            </div>
            
            {/* Progress Bar Simulation */}
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-cyan-600"></div>
            </div>
          </div>

          {/* Floating UI Element: Bottom Left (Chat) */}
          <div className="absolute -bottom-8 -left-4 z-20 w-72 sm:w-80 animate-in fade-in zoom-in duration-1000 delay-300 rounded-xl border border-white/40 bg-white/85 p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:-left-8">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md">
                AI
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">AI Agent</p>
                <p className="text-xs text-slate-500">Replying to client...</p>
              </div>
            </div>
            
            <div className="relative rounded-lg rounded-tl-none bg-slate-100 p-3 text-sm leading-snug text-slate-700 shadow-inner">
              <p>
                "Hi Sarah! The property at 123 Main St is available for a showing this Saturday at 2 PM. It has the open-concept kitchen you were looking for. Shall I book it for you?"
              </p>
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 6s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};