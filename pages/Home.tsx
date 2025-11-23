import React from 'react';
import { Button } from '../components/Button';
import { ArrowRight, Check, Zap, Cpu, Layers, Globe, MessageSquare, Bell, Database, Activity, Home as HomeIcon } from 'lucide-react';

interface HomeProps {
  onNavigate?: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const handleNav = (page: string) => {
    if (onNavigate) onNavigate(page);
  };

  return (
    <div className="flex flex-col w-full overflow-hidden relative">
      {/* Section 1: Hero - Reduced padding */}
      <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-20 px-6 overflow-hidden">
        {/* Ambient Lighting for Automation Reinvented */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[500px] bg-blue-400/10 blur-[100px] rounded-[100%] pointer-events-none z-0"></div>
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-cyan-400/20 blur-[80px] rounded-full pointer-events-none z-0 animate-pulse-slow"></div>
        
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:shadow-md transition-shadow cursor-default group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-semibold tracking-wide uppercase text-slate-600 group-hover:text-blue-600 transition-colors">Aryantra AI Platform 2.0</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both leading-[1.1]">
            Automation,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]">Reinvented.</span>
          </h1>
          
          <p className="max-w-2xl text-lg sm:text-xl text-slate-500 leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
            Aryantra transforms your workflows into fully autonomous systems powered by intelligent AI agents. 
            No scripts. No complexity. Just clean execution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
            <Button size="lg" className="rounded-full group px-8 bg-blue-600 hover:bg-blue-700 border-0 shadow-blue-500/20" onClick={() => handleNav('contact')}>
              Start Automating <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="secondary" className="rounded-full px-8" onClick={() => handleNav('services')}>
              Explore Services
            </Button>
          </div>
        </div>

        {/* Dashboard Visualization - With Rotating Light Outline */}
        <div className="mt-16 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 perspective-1000 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 relative">
          
          {/* Rotating Light Container */}
          <div className="relative rounded-[34px] p-[1px] overflow-hidden bg-slate-100/50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
            {/* The Spinning Gradient Beam */}
            <div className="absolute inset-[-50%] aspect-square bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_300deg,#3b82f6_360deg)] animate-spin-slow top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 opacity-100"></div>
            
            {/* The Card Content (White Background sits on top of spinner) */}
            <div className="bg-white rounded-[33px] relative h-full w-full border border-transparent">
              <div className="p-2 md:p-3 relative overflow-hidden group bg-white rounded-[33px]">
                {/* Frame Header / Chrome */}
                <div className="flex items-center justify-between px-6 py-4 mb-2">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="w-4 h-4 rounded-md bg-slate-900 text-white flex items-center justify-center text-[8px] font-bold">A</div>
                            <span className="text-sm font-bold text-slate-700">Aryantra</span>
                            <div className="w-px h-3 bg-slate-200 mx-1"></div>
                            <span className="text-xs text-slate-500">Dashboard</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">
                            <MessageSquare size={16} />
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-[24px] grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x lg:divide-slate-100 min-h-[500px]">
                    
                    {/* Left: Revenue Chart */}
                    <div className="p-8 lg:p-12 flex flex-col items-center lg:items-start relative overflow-hidden">
                        <div className="w-full text-center lg:text-left z-10">
                          <h3 className="text-2xl font-bold text-slate-900 mb-1">Revenue (INR 14.2 Lacs)</h3>
                          <p className="text-slate-500 text-sm">How Aryantra boosted your revenue.</p>
                        </div>

                        <div className="flex-1 w-full flex items-center justify-center relative mt-8 lg:mt-0 min-h-[350px]">
                            {/* Orange Bubble */}
                            <div className="absolute w-56 h-56 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full flex flex-col items-center justify-center text-white shadow-2xl shadow-orange-500/20 z-10 translate-x-8 translate-y-4 border-[6px] border-white hover:scale-105 transition-transform duration-500">
                                <span className="text-5xl font-bold mb-1">60%</span>
                                <span className="text-sm font-medium opacity-90">Initial Revenue</span>
                            </div>
                            
                            {/* Blue Bubble (Upsell) */}
                            <div className="absolute w-40 h-40 bg-gradient-to-b from-[#6366F1] to-[#4F46E5] rounded-full flex flex-col items-center justify-center text-white shadow-2xl shadow-indigo-500/20 z-20 -translate-x-24 -translate-y-20 border-[6px] border-white hover:scale-105 transition-transform duration-500 delay-75">
                                <span className="text-3xl font-bold mb-1">16%</span>
                                <span className="text-xs font-medium opacity-90">Upsell</span>
                            </div>

                            {/* Cyan Bubble (Followups) */}
                            <div className="absolute w-44 h-44 bg-gradient-to-b from-cyan-400 to-cyan-500 rounded-full flex flex-col items-center justify-center text-white shadow-2xl shadow-cyan-500/20 z-20 -translate-x-20 translate-y-24 border-[6px] border-white hover:scale-105 transition-transform duration-500 delay-150">
                                <span className="text-3xl font-bold mb-1">24%</span>
                                <span className="text-xs font-medium opacity-90">Followups</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Time Saved Chart */}
                    <div className="p-8 lg:p-12 flex flex-col items-center lg:items-start bg-slate-50/30">
                        <div className="w-full text-center lg:text-left">
                          <h3 className="text-2xl font-bold text-slate-900 mb-1">Time Saved (980 Hours)</h3>
                          <p className="text-slate-500 text-sm">How Aryantra saved your time.</p>
                        </div>

                        <div className="flex-1 w-full flex flex-col items-center justify-center relative mt-8 lg:mt-0 min-h-[350px]">
                            <div className="relative">
                                {/* Donut Graphic */}
                                <div className="w-72 h-72 rounded-full"
                                    style={{
                                        background: 'conic-gradient(#818CF8 0% 40%, #A5B4FC 40% 72%, #C7D2FE 72% 100%)',
                                        mask: 'radial-gradient(transparent 60%, black 61%)',
                                        WebkitMask: 'radial-gradient(transparent 60%, black 61%)'
                                    }}
                                ></div>
                                
                                {/* Tooltip */}
                                <div className="absolute top-0 right-0 -translate-y-6 translate-x-12 bg-[#1E1B4B] text-white p-5 rounded-2xl shadow-2xl animate-bounce-slow">
                                    <div className="text-xs font-medium text-slate-400 mb-1">Followups</div>
                                    <div className="text-2xl font-bold">313 hours</div>
                                    <div className="absolute bottom-0 left-4 translate-y-1/2 rotate-45 w-4 h-4 bg-[#1E1B4B]"></div>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap justify-center gap-6 mt-10">
                              <div className="flex items-center gap-2.5">
                                  <div className="w-3 h-3 rounded-full bg-[#818CF8]"></div>
                                  <span className="text-sm font-medium text-slate-600">Direct answers <span className="text-slate-400 ml-1">40%</span></span>
                              </div>
                              <div className="flex items-center gap-2.5">
                                  <div className="w-3 h-3 rounded-full bg-[#A5B4FC]"></div>
                                  <span className="text-sm font-medium text-slate-600">Followups <span className="text-slate-400 ml-1">32%</span></span>
                              </div>
                              <div className="flex items-center gap-2.5">
                                  <div className="w-3 h-3 rounded-full bg-[#C7D2FE]"></div>
                                  <span className="text-sm font-medium text-slate-600">Reminders <span className="text-slate-400 ml-1">28%</span></span>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
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

      {/* Section 2: What Aryantra Does - Reduced padding */}
      <section className="py-16 px-6 bg-white relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Cpu, title: "Autonomous Agents", desc: "Agents that understand context, make decisions, and execute tasks — just like a real team member." },
            { icon: Layers, title: "Workflow Automation", desc: "Automate onboarding, reminders, lead flows, support, notifications, and backend operations." },
            { icon: Globe, title: "Deep Integrations", desc: "Connect WhatsApp, Email, Websites, Databases, CRMs, APIs, and internal tools seamlessly." }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-500">
              <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/30">
                <feature.icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Signature Showcase - Reduced padding */}
      <section className="py-20 px-6 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8 animate-on-scroll">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              AI that works like<br/>a team member.
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Your intelligent operator — responding, executing, updating, coordinating. 
              Aryantra moves beyond simple triggers to context-aware actions that adapt to your business needs.
            </p>
            <div className="space-y-4 pt-4">
              {['Natural Language Understanding', 'Contextual Decision Making', 'Self-Correcting Workflows'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-cyan-200 blur-[80px] opacity-60 rounded-full animate-pulse-slow"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-white/60 transition-transform duration-700 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-md">A</div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg">Sales Agent</div>
                    <div className="text-xs text-emerald-600 font-medium flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full w-fit mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
                    </div>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-mono bg-slate-50 px-3 py-1 rounded-full">ID: #883-AX</span>
              </div>
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 transition-colors hover:bg-slate-50/80">
                  <div className="flex items-center gap-2 mb-2">
                     <Activity size={14} className="text-blue-500" />
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trigger</p>
                  </div>
                  <div className="text-sm font-medium text-slate-900">New lead received from Landing Page B</div>
                </div>
                <div className="flex justify-center">
                  <div className="h-8 w-0.5 bg-gradient-to-b from-slate-200 to-slate-300"></div>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm ring-4 ring-blue-50/50">
                  <div className="flex items-center gap-2 mb-3">
                     <Zap size={14} className="text-amber-500" />
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Action Taken</p>
                  </div>
                  <div className="text-sm text-slate-900 mb-3">Qualifying lead via WhatsApp...</div>
                  <div className="bg-[#F0FDF4] rounded-xl p-4 text-sm text-slate-700 border border-[#DCFCE7] leading-relaxed font-medium relative">
                    <div className="absolute -left-1 top-6 w-2 h-2 bg-[#F0FDF4] border-l border-t border-[#DCFCE7] -rotate-45"></div>
                    "Hi Sarah, thanks for your interest! Are you looking for residential or commercial properties?"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Workflow Deep-Dive Grid - Reduced padding */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Automation for every workflow.</h2>
            <p className="text-slate-500 text-lg">From simple notifications to complex backend operations.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Auto Lead Handling", icon: Zap },
              { title: "Customer Support", icon: MessageSquare },
              { title: "Smart Reminders", icon: Bell },
              { title: "Notifications", icon: Activity },
              { title: "CRM Updates", icon: Database },
              { title: "Backend Actions", icon: Cpu },
              { title: "Web Assistance", icon: Globe },
              { title: "WhatsApp Auto", icon: MessageSquare },
            ].map((item, i) => (
              <div key={i} className="group p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-default hover:-translate-y-1">
                <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center mb-4 text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                   <item.icon size={20} />
                </div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Pricing - Reduced padding */}
      <section className="py-20 px-6 bg-[#0B0F19] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0B0F19] to-[#0B0F19]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple pricing for scalable growth.</h2>
            <p className="text-slate-400">Choose the plan that fits your automation needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Starter */}
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-transform hover:scale-[1.02] duration-300">
              <h3 className="text-lg font-medium text-slate-300 mb-2">Starter</h3>
              <div className="text-3xl font-bold mb-6">Custom</div>
              <p className="text-sm text-slate-400 mb-8">For individuals and small teams just getting started.</p>
              <ul className="space-y-4 mb-8">
                {['1 AI Agent', 'Basic Workflows', 'Web + WhatsApp'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                    <Check size={16} className="text-slate-500" /> {f}
                  </li>
                ))}
              </ul>
              <Button fullWidth variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:border-white/30" onClick={() => handleNav('contact')}>Contact Sales</Button>
            </div>

            {/* Growth */}
            <div className="p-8 rounded-3xl border border-blue-500/50 bg-gradient-to-b from-blue-900/20 to-slate-900/50 relative shadow-2xl shadow-blue-900/20 scale-105 z-10 backdrop-blur-md">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide shadow-lg shadow-blue-900/40">POPULAR</div>
              <h3 className="text-lg font-medium text-blue-400 mb-2">Growth</h3>
              <div className="text-3xl font-bold mb-6">Flexible</div>
              <p className="text-sm text-slate-400 mb-8">Perfect for scaling businesses needing power.</p>
              <ul className="space-y-4 mb-8">
                {['Unlimited Workflows', 'Multichannel Auto', 'CRM + DB Integrations', 'Advanced Triggers'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white">
                    <div className="bg-blue-500/20 p-1 rounded-full"><Check size={12} className="text-blue-400" /></div> {f}
                  </li>
                ))}
              </ul>
              <Button fullWidth variant="primary" className="bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-900/30" onClick={() => handleNav('contact')}>Get Started</Button>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-transform hover:scale-[1.02] duration-300">
              <h3 className="text-lg font-medium text-slate-300 mb-2">Enterprise</h3>
              <div className="text-3xl font-bold mb-6">Custom</div>
              <p className="text-sm text-slate-400 mb-8">For large-scale automation needs.</p>
              <ul className="space-y-4 mb-8">
                {['Custom AI Agents', 'Private Deployment', 'Full Orchestration', 'Dedicated Support'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                    <Check size={16} className="text-slate-500" /> {f}
                  </li>
                ))}
              </ul>
              <Button fullWidth variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:border-white/30" onClick={() => handleNav('contact')}>Contact Sales</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA - Reduced padding */}
      <section className="py-20 px-6 text-center bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/80 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">Build your AI-powered<br/>automation today.</h2>
          <div className="flex justify-center">
            <Button size="xl" className="rounded-full shadow-xl shadow-blue-500/20 px-10 py-4 text-lg bg-blue-600 hover:bg-blue-700 border-0" onClick={() => handleNav('contact')}>
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};