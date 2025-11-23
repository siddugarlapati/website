
import React from 'react';
import { Target, Lightbulb, Globe, Users, Shield, Rocket, ArrowRight, Briefcase, Award, TrendingUp, Lock, Server, Activity, ShieldCheck, Cpu, Building, Heart, Zap, Clock, CheckCircle, Network, BrainCircuit, BriefcaseBusiness, Building2 } from 'lucide-react';
import { Button } from '../components/Button';

interface AboutProps {
  onNavigate?: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const handleNav = (page: string) => {
    if (onNavigate) onNavigate(page);
  };

  return (
    <div className="w-full pt-32 pb-20 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-5xl mx-auto mb-24 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8 hover:shadow-md transition-shadow">
            <span className="relative flex h-2.5 w-2.5">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
            <span className="text-xs font-bold tracking-wide uppercase text-slate-600">The Aryantra Story</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-slate-900 tracking-tight mb-8 leading-[1.05]">
            We Engineer <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-[gradient_6s_linear_infinite]">Autonomous Futures.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-3xl mx-auto font-light">
            Aryantra is not just a software company. We are a collective of <span className="text-slate-900 font-medium">automation architects</span> obsessed with removing friction from the global economy.
          </p>
        </div>

        {/* THE TEAM ANALOGY SECTION - NEW */}
        <div className="mb-32">
            <div className="bg-slate-900 rounded-[40px] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-80"></div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
                           <Users size={12} /> We Work Like A Team
                        </div>
                        <h2 className="text-4xl font-bold mb-6 leading-tight">Not just a tool.<br/>A Digital Workforce.</h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            Most software requires you to work for it—clicking buttons, entering data. 
                            <br/><br/>
                            <strong>Aryantra is different.</strong> Our agents work for you. They have roles, responsibilities, and autonomy. Think of us not as a SaaS platform, but as hiring 1,000 tireless employees who never sleep, never complain, and never make a typo.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="h-10 w-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0"><BriefcaseBusiness size={20}/></div>
                                <div>
                                    <div className="font-bold">The Sales Agent</div>
                                    <div className="text-sm text-slate-400">Qualifies leads, books meetings, sends contracts.</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="h-10 w-10 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0"><Heart size={20}/></div>
                                <div>
                                    <div className="font-bold">The Support Agent</div>
                                    <div className="text-sm text-slate-400">Empathizes, solves problems, issues refunds.</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="h-10 w-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0"><BrainCircuit size={20}/></div>
                                <div>
                                    <div className="font-bold">The Ops Agent</div>
                                    <div className="text-sm text-slate-400">Connects dots, updates CRMs, manages logistics.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[500px] bg-slate-800/50 rounded-3xl border border-slate-700 p-8 flex items-center justify-center">
                        {/* Visualizing the "Central Brain" concept */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                        
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Central Hub */}
                            <div className="absolute z-20 w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.5)] animate-pulse-slow">
                                <div className="text-center">
                                    <div className="font-bold text-2xl">Core</div>
                                    <div className="text-[10px] uppercase tracking-widest opacity-80">Intelligence</div>
                                </div>
                            </div>

                            {/* Orbiting Nodes */}
                            {[0, 120, 240].map((deg, i) => (
                                <div key={i} className="absolute w-full h-full animate-spin-slow" style={{animationDuration: '20s', animationDelay: `-${i * 5}s`}}>
                                    <div className="absolute top-10 left-1/2 -translate-x-1/2">
                                        <div className="w-16 h-16 bg-slate-800 border border-slate-600 rounded-xl flex items-center justify-center shadow-xl rotate-[0deg]" style={{transform: `rotate(-${(i * 120) + (360)}deg)`}}>
                                            {i === 0 ? <Zap className="text-yellow-400"/> : i === 1 ? <Server className="text-purple-400"/> : <Network className="text-green-400"/>}
                                        </div>
                                        {/* Connector Line */}
                                        <div className="absolute top-16 left-1/2 w-px h-20 bg-gradient-to-b from-slate-600 to-transparent"></div>
                                    </div>
                                </div>
                            ))}

                            <div className="absolute bottom-8 text-center text-slate-500 text-xs">
                                <p>Dynamic Neural Orchestration</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* WHY AUTOMATION MATTERS - NEW */}
        <div className="mb-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 relative">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Chaotic Office vs Streamlined" 
                  className="rounded-3xl shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 border border-slate-100"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                        <Clock className="text-red-500" size={24}/>
                        <div>
                            <div className="font-bold text-slate-900">Before Aryantra</div>
                            <div className="text-xs text-slate-500">12h Response Time</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:col-span-7 space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">Why Automation is Non-Negotiable</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                    We are solving the <strong>"Scalability Paradox"</strong>. 
                    Traditionally, as you grow, your complexity grows faster than your revenue. You hire more people to manage the complexity, which kills your margins.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                    Automation isn't just about "saving time." It's about <strong>predictability</strong>.
                    <br/>
                    A human might forget to follow up on a lead. An agent never forgets.
                    <br/>
                    A human needs sleep. An agent works 24/7.
                    <br/>
                    A human has bad days. An agent is consistent.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
                        <div className="text-sm text-slate-600">Task Completion</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                        <div className="text-2xl font-bold text-purple-600 mb-1">0%</div>
                        <div className="text-sm text-slate-600">Data Loss</div>
                    </div>
                </div>
            </div>
        </div>

        {/* SECTOR FOCUS - NEW */}
        <div className="mb-32">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900">Our Domain Expertise</h2>
                <p className="text-slate-500 max-w-2xl mx-auto mt-4">
                    While we build for everyone, we have deep, vertical-specific engines.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Real Estate Card */}
                <div className="p-8 rounded-3xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-colors relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Building2 size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                            <Building size={24}/>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Real Estate (Primary Focus)</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            The real estate industry is plagued by high-volume, low-quality leads and slow response times. 
                            We have built specialized models trained on property data, floor plans, and negotiation tactics.
                        </p>
                        <ul className="space-y-2 mb-8">
                            <li className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle size={16} className="text-blue-600"/> Automated Site Visit Scheduling</li>
                            <li className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle size={16} className="text-blue-600"/> WhatsApp Brochure Delivery</li>
                            <li className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle size={16} className="text-blue-600"/> Post-Visit Feedback Collection</li>
                        </ul>
                        <Button onClick={() => handleNav('industries')} className="bg-blue-600 hover:bg-blue-700 border-0 text-white">Explore Real Estate Solutions</Button>
                    </div>
                </div>

                {/* Other Sectors */}
                <div className="p-8 rounded-3xl border border-slate-200 bg-white hover:shadow-xl transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Globe size={120} />
                    </div>
                    <div className="relative z-10">
                         <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-6">
                            <Briefcase size={24}/>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Universal Applications</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            Our core "Agent OS" is industry-agnostic. We successfully deploy solutions for Healthcare, Logistics, EdTech, and E-commerce.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                             <div className="bg-slate-50 p-3 rounded-lg text-sm font-medium text-slate-700">🏥 Healthcare Triage</div>
                             <div className="bg-slate-50 p-3 rounded-lg text-sm font-medium text-slate-700">🚚 Logistics Dispatch</div>
                             <div className="bg-slate-50 p-3 rounded-lg text-sm font-medium text-slate-700">🎓 EdTech Counseling</div>
                             <div className="bg-slate-50 p-3 rounded-lg text-sm font-medium text-slate-700">🛍️ E-com Support</div>
                        </div>
                        <Button onClick={() => handleNav('contact')} variant="outline">Discuss Your Industry</Button>
                    </div>
                </div>
            </div>
        </div>

        {/* IMAGE GRID / STORY (Retained from original but pushed down) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32 items-center">
           <div className="lg:col-span-7 relative animate-slide-up stagger-1 group">
              {/* Main Image */}
              <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-100">
                 <img 
                   src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                   alt="Aryantra Team Collaboration" 
                   className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 to-transparent"></div>
                 <div className="absolute bottom-8 left-8 text-white">
                    <div className="text-3xl font-bold">Hyderabad HQ</div>
                    <div className="text-sm opacity-90">Where the revolution began.</div>
                 </div>
              </div>
           </div>
           
           <div className="lg:col-span-5 space-y-8 animate-slide-up stagger-2 pl-4">
              <h2 className="text-3xl font-bold text-slate-900">Our Core DNA</h2>
               <p className="text-lg text-slate-600 leading-relaxed font-light">
                   We don't build software to be "used". We build software to "do".
                   Aryantra was born from the frustration of seeing brilliant people stuck doing robotic tasks.
               </p>
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <span className="font-medium text-slate-700">Obsessive Innovation</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <span className="font-medium text-slate-700">Radical Transparency</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <span className="font-medium text-slate-700">Speed as a Habit</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
