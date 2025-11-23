
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { CaseStudies } from './pages/CaseStudies';
import { Contact } from './pages/Contact';
import { Resources } from './pages/Resources';
import { Industries } from './pages/Industries';
import { Integrations } from './pages/Integrations';
import { Careers } from './pages/Careers';
import { SignIn } from './pages/SignIn';
import { Admin } from './pages/Admin';
import { ClientPortal } from './pages/ClientPortal';

const App: React.FC = () => {
  // Simple state-based router
  const [currentPage, setCurrentPage] = useState('home');
  const [authType, setAuthType] = useState<'none' | 'admin' | 'client'>('none');
  const [clientData, setClientData] = useState<any>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleLogin = (type: 'admin' | 'client', data?: any) => {
    setAuthType(type);
    if (type === 'client' && data) {
      setClientData(data);
      setCurrentPage('client-portal');
    } else {
      setCurrentPage('admin');
    }
  };

  const handleLogout = () => {
    setAuthType('none');
    setClientData(null);
    setCurrentPage('home');
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'about': return <About onNavigate={setCurrentPage} />;
      case 'services': return <Services />;
      case 'industries': return <Industries onNavigate={setCurrentPage} />;
      case 'integrations': return <Integrations onNavigate={setCurrentPage} />;
      case 'casestudies': return <CaseStudies />;
      case 'resources': return <Resources />;
      case 'contact': return <Contact />;
      case 'careers': return <Careers />;
      case 'signin': return <SignIn onLogin={handleLogin} />;
      case 'admin': return authType === 'admin' ? <Admin onNavigate={setCurrentPage} onLogout={handleLogout} /> : <SignIn onLogin={handleLogin} />;
      case 'client-portal': return authType === 'client' ? <ClientPortal client={clientData} onLogout={handleLogout} /> : <SignIn onLogin={handleLogin} />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  // Don't show Header/Footer/ChatBot on Admin or Client Portal for a cleaner "App" feel
  const isAppView = currentPage === 'admin' || currentPage === 'client-portal';

  return (
    <div className="flex min-h-screen flex-col font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden relative">
      {/* Global Attractive Lighting Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-slate-50">
          {/* Moving Nebula Effect */}
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-gradient-to-br from-blue-200/30 via-purple-200/30 to-cyan-200/30 blur-[120px] rounded-full animate-gradient-xy opacity-70 mix-blend-multiply"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-gradient-to-tl from-indigo-200/30 via-pink-200/30 to-blue-200/30 blur-[100px] rounded-full animate-gradient-xy opacity-70 mix-blend-multiply" style={{animationDelay: '5s'}}></div>
          
          {/* Subtle Rotation Orb */}
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/5 rounded-full blur-[80px] animate-spin-slow"></div>
      </div>

      {!isAppView && <Header onNavigate={setCurrentPage} currentPage={currentPage} />}
      
      <main className={`flex-grow flex flex-col ${!isAppView ? 'pt-24' : ''} relative z-10`}>
        <div 
          key={currentPage} 
          className="flex-grow flex flex-col animate-page-enter w-full origin-top"
        >
          {renderPage()}
        </div>
      </main>
      
      {!isAppView && <Footer onNavigate={setCurrentPage} />}
      {!isAppView && <ChatBot />}
    </div>
  );
};

export default App;
