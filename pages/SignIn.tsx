
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Lock, User, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { api } from '../utils/api';

interface SignInProps {
  onLogin: (type: 'admin' | 'client', data?: any) => void;
}

export const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<'admin' | 'client'>('admin');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
        if (loginType === 'admin') {
            // Try admin login via backend API
            const response = await api.loginAdmin(username, password);
            if (response.data) {
                onLogin('admin');
                return;
            } else {
                setError(response.error || 'Invalid admin credentials.');
            }
        } else {
            // Try client login via backend API
            const response = await api.loginClient(username, password);
            if (response.data) {
                onLogin('client', response.data.client);
                return;
            } else {
                setError(response.error || 'Invalid client credentials.');
            }
        }
    } catch (err) {
        setError('System error. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden">
       {/* Background visuals */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-blue-200/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-20%] right-[-20%] w-[800px] h-[800px] bg-indigo-200/20 rounded-full blur-[100px]"></div>
       </div>

       <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-10">
             <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="font-display font-bold text-xl">A</span>
             </div>
             <h1 className="text-2xl font-bold text-slate-900">Secure Portal</h1>
             <p className="text-slate-500 text-sm mt-2">Authorized Personnel & Clients Only</p>
          </div>

          {/* Login Type Selector */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold transition-all ${
                loginType === 'admin'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setLoginType('client')}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold transition-all ${
                loginType === 'client'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Client
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
             <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Username</label>
                <div className="relative">
                   <User className="absolute left-4 top-3 text-slate-400" size={18} />
                   <input 
                     type="text" 
                     value={username}
                     onChange={e => setUsername(e.target.value)}
                     className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                     placeholder={loginType === 'admin' ? 'admin' : 'skyline'}
                   />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <div className="relative">
                   <Lock className="absolute left-4 top-3 text-slate-400" size={18} />
                   <input 
                     type="password" 
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                     placeholder="••••••••"
                   />
                </div>
             </div>

             {error && <p className="text-red-500 text-xs text-center font-medium animate-pulse">{error}</p>}

             <Button disabled={isLoading} fullWidth size="lg" className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl shadow-xl shadow-slate-900/20">
                {isLoading ? <Loader2 className="animate-spin" /> : <span className="flex items-center justify-center">Secure Login <ArrowRight size={16} className="ml-2" /></span>}
             </Button>
          </form>
          
          {/* Credentials Hint */}
          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="text-xs text-blue-800 font-medium mb-1">Demo Credentials:</div>
            <div className="text-xs text-blue-600">
              {loginType === 'admin' ? 'admin / admin123' : 'skyline / password123'}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-50 text-center space-y-3">
             <p className="text-xs text-slate-400 flex items-center justify-center gap-1"><ShieldCheck size={12}/> 256-bit Encrypted Session</p>
          </div>
       </div>
    </div>
  );
};
