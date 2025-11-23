import React, { useState } from 'react';
import { MessageCircle, Instagram, Globe, Megaphone, ArrowRight, Check, ShieldCheck, Globe2, Layout, Zap, Users, BarChart3, MousePointerClick } from 'lucide-react';
import { Button } from '../components/Button';

interface IntegrationsProps {
  onNavigate: (page: string) => void;
}

export const Integrations: React.FC<IntegrationsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'instagram' | 'website' | 'ads'>('whatsapp');

  return (
    <div className="w-full pt-32 pb-20 px-6 bg-[#FAFAFA] min-h-screen relative overflow-hidden">
       {/* Global Lighting Effects */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] w-[700px] h-[700px] bg-blue-100/40 blur-[120px] rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-100/40 blur-[120px] rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
       </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 animate-in slide-in-from-bottom-4 fade-in duration-700">
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight mb-6">Seamless Integrations.</h1>
          <p className="text-xl text-slate-500">Connect Aryantra to the platforms where your customers already are.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {[
            { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: 'green' },
            { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'pink' },
            { id: 'website', label: 'Website', icon: Globe, color: 'blue' },
            { id: 'ads', label: 'Ads Generating', icon: Megaphone, color: 'orange' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 border ${
                activeTab === tab.id 
                  ? `bg-slate-900 text-white border-slate-900 shadow-lg transform scale-105` 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? 'text-white' : `text-${tab.color}-500`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl overflow-hidden min-h-[600px] animate-in fade-in slide-in-from-bottom-8 duration-500">
          
          {/* WHATSAPP INTEGRATION */}
          {activeTab === 'whatsapp' && (
            <div className="p-8 md:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider">
                    #1 WhatsApp Automation Platform
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Turn WhatsApp Chats into Customers</h2>
                  <p className="text-lg text-slate-500 leading-relaxed">
                    Deploy an AI sales agent on WhatsApp that qualifies leads, books demos, and follows up automatically. Turn conversations into revenue while delivering exceptional customer support.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <Button onClick={() => onNavigate('contact')} className="bg-green-600 hover:bg-green-700 border-0">Book a Demo</Button>
                    <Button variant="outline" onClick={() => onNavigate('pricing')}>See Pricing</Button>
                  </div>
                </div>
                <div className="relative">
                   {/* Phone Mockup */}
                   <div className="mx-auto w-[280px] bg-slate-900 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800">
                      <div className="bg-[#0B141A] rounded-[30px] h-[500px] overflow-hidden relative flex flex-col">
                         <div className="bg-[#202C33] p-4 flex items-center gap-3 sticky top-0 z-10">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs">A</div>
                            <div className="text-white text-sm font-bold">Aryantra AI</div>
                         </div>
                         <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
                            <div className="bg-[#202C33] p-3 rounded-lg rounded-tl-none max-w-[85%] text-white text-xs">
                               Hi! I see you're interested in the 3BHK at Skyline. Would you like to see floor plans?
                               <div className="text-[10px] text-slate-400 text-right mt-1">10:00 AM</div>
                            </div>
                            <div className="self-end bg-[#005C4B] p-3 rounded-lg rounded-tr-none max-w-[85%] text-white text-xs">
                               Yes, please send them over. Also what is the price?
                               <div className="text-[10px] text-green-200 text-right mt-1">10:01 AM</div>
                            </div>
                            <div className="bg-[#202C33] p-3 rounded-lg rounded-tl-none max-w-[85%] text-white text-xs">
                               Sure! Here is the brochure. The starting price is 1.2 Cr. 
                               <br/><br/>
                               Shall I book a site visit for this Saturday?
                               <div className="text-[10px] text-slate-400 text-right mt-1">10:01 AM</div>
                            </div>
                         </div>
                         {/* Footer Input Mock */}
                         <div className="bg-[#202C33] p-3 flex gap-2 items-center">
                            <div className="flex-1 h-8 bg-[#2A3942] rounded-full"></div>
                            <div className="w-8 h-8 bg-[#00A884] rounded-full"></div>
                         </div>
                      </div>
                   </div>
                   {/* Floating Elements */}
                   <div className="absolute top-10 -right-10 bg-white p-4 rounded-xl shadow-xl border border-green-100 animate-float hidden md:block">
                      <div className="text-xs font-bold text-slate-400 uppercase">Conversion Rate</div>
                      <div className="text-2xl font-bold text-green-600">+45%</div>
                   </div>
                </div>
              </div>

              {/* Feature Grid */}
              <div className="mb-20">
                <h3 className="text-2xl font-bold text-center mb-12">Everything You Need to Scale Sales on WhatsApp</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: "Official Business API", desc: "Built on the official, scalable API for reliable performance.", icon: ShieldCheck },
                    { title: "Rich Media Support", desc: "Send and receive images, videos, PDFs, voice notes, and more.", icon: Layout },
                    { title: "Seamless Human Handover", desc: "Intelligently escalate chats to your live agents when needed.", icon: Users },
                    { title: "Secure Document Collection", desc: "Automate KYC and verification with secure uploads in chat.", icon: ShieldCheck },
                    { title: "Campaign Broadcasting", desc: "Launch targeted campaigns for inbound and outbound flows.", icon: Megaphone },
                    { title: "Multilingual Support", desc: "Communicate with customers in their preferred language.", icon: Globe2 },
                  ].map((item, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                      <item.icon className="text-green-600 mb-4" size={24} />
                      <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* INSTAGRAM INTEGRATION */}
          {activeTab === 'instagram' && (
            <div className="p-8 md:p-16">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-bold uppercase tracking-wider">
                        24/7 Engagement Machine
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Automate your DMs. <br/> Explode your Sales.</h2>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Turn every story reply, comment, and DM into a sales conversation. Aryantra's Instagram agent engages followers instantly, answering product questions and sending checkout links without you lifting a finger.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <Button onClick={() => onNavigate('contact')} className="bg-pink-600 hover:bg-pink-700 border-0">Start Automating</Button>
                    </div>
                  </div>

                  <div className="relative">
                     <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                        <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop" alt="Instagram Automation" className="w-full h-auto" />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20 text-white">
                           <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center"><MessageCircle size={16}/></div>
                              <div className="text-sm font-bold">Auto-Reply Sent</div>
                           </div>
                           <p className="text-xs opacity-90">"Hey! Here is the link to the product you asked about 👇"</p>
                        </div>
                     </div>
                     <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 animate-float">
                         <div className="text-xs font-bold text-slate-400 uppercase mb-1">Response Time</div>
                         <div className="text-3xl font-bold text-slate-900">Instant</div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {[
                     { label: "Comment to DM", val: "Auto", desc: "User comments 'Link', AI DMs them instantly." },
                     { label: "Story Mentions", val: "Engage", desc: "Thank users automatically when they tag you." },
                     { label: "Sales", val: "24/7", desc: "Sell while you sleep with automated checkout links." }
                  ].map((stat, i) => (
                     <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-all">
                        <div className="text-4xl font-bold text-pink-600 mb-2">{stat.val}</div>
                        <p className="text-sm font-bold text-slate-800 uppercase mb-2">{stat.label}</p>
                        <p className="text-xs text-slate-500">{stat.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
          )}

          {/* ADS GENERATION INTEGRATION */}
          {activeTab === 'ads' && (
            <div className="p-8 md:p-16 bg-[#0B0F19] text-white h-full relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,100,0,0.1),transparent)] pointer-events-none"></div>
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                  <div className="space-y-8">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/50 text-orange-400 text-xs font-bold uppercase tracking-wider">
                        <Zap size={12} /> Performance Marketing AI
                     </div>
                     <h2 className="text-5xl font-bold leading-tight">Stop guessing.<br/>Start generating.</h2>
                     <p className="text-lg text-slate-400 leading-relaxed">
                        Aryantra's Ad Engine creates high-converting creatives, writes copy, and auto-optimizes your campaigns across Meta and Google Ads to maximize ROAS.
                     </p>
                     <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                           <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white"><Check size={14}/></div>
                           <span className="font-medium">AI-Generated Creatives (Static & Video)</span>
                        </li>
                        <li className="flex items-center gap-3">
                           <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white"><Check size={14}/></div>
                           <span className="font-medium">Multivariate Copy Testing</span>
                        </li>
                        <li className="flex items-center gap-3">
                           <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white"><Check size={14}/></div>
                           <span className="font-medium">Real-time Budget Optimization</span>
                        </li>
                     </ul>
                     <Button className="bg-orange-600 hover:bg-orange-500 border-0 text-white">Try Ad Engine</Button>
                  </div>

                  <div className="relative">
                     {/* Dashboard Visual */}
                     <div className="relative z-10 bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-2xl overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" alt="Analytics Dashboard" className="w-full h-64 object-cover rounded-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="bg-slate-900/90 p-6 rounded-xl border border-slate-600 backdrop-blur-sm">
                              <div className="flex items-center gap-4 mb-4">
                                 <div className="text-left">
                                    <div className="text-xs text-slate-400 uppercase">Total ROAS</div>
                                    <div className="text-3xl font-bold text-white">4.8x</div>
                                 </div>
                                 <div className="h-10 w-px bg-slate-700"></div>
                                 <div className="text-left">
                                    <div className="text-xs text-slate-400 uppercase">Spend</div>
                                    <div className="text-3xl font-bold text-white">$12k</div>
                                 </div>
                              </div>
                              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                 <div className="bg-orange-500 h-full w-[75%]"></div>
                              </div>
                           </div>
                        </div>
                     </div>
                     
                     {/* Decorative Glows */}
                     <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500 rounded-full blur-[80px] opacity-20"></div>
                     <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-20"></div>
                  </div>
               </div>
            </div>
          )}

          {/* WEBSITE INTEGRATION */}
          {activeTab === 'website' && (
            <div className="p-8 md:p-16">
               <div className="text-center max-w-3xl mx-auto mb-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6 shadow-md">
                     <Globe size={32} />
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">Your Website, Now Intelligent.</h2>
                  <p className="text-lg text-slate-500">
                     Embed Aryantra's Chat Widget in 2 minutes. It reads your website content automatically and starts answering visitor questions with human-like accuracy, capturing leads 24/7.
                  </p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                      {[
                         { title: "No-Code Setup", desc: "Just paste one line of JS code. Works with WordPress, Webflow, React, and more.", icon: MousePointerClick },
                         { title: "Auto-Scraping", desc: "Aryantra crawls your URLs to learn your pricing, features, and FAQs instantly.", icon: Zap },
                         { title: "Smart Lead Capture", desc: "Bot proactively asks for email/phone before answering key questions to grow your list.", icon: Users }
                      ].map((feat, i) => (
                         <div key={i} className="flex gap-4 p-4 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow bg-white">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><feat.icon size={20}/></div>
                            <div>
                               <h4 className="font-bold text-slate-900">{feat.title}</h4>
                               <p className="text-sm text-slate-500">{feat.desc}</p>
                            </div>
                         </div>
                      ))}
                  </div>
                  
                  <div className="relative">
                      <div className="bg-slate-900 rounded-xl p-2 shadow-2xl">
                         <div className="bg-slate-800 rounded-t-lg p-2 flex gap-2 items-center mb-1">
                            <div className="flex gap-1.5">
                               <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                               <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                            </div>
                            <div className="bg-slate-900 h-4 rounded-full w-2/3 mx-auto"></div>
                         </div>
                         <div className="relative bg-white rounded-b-lg h-64 overflow-hidden">
                             <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-50" alt="Website Mockup"/>
                             
                             {/* Chat Widget Mockup */}
                             <div className="absolute bottom-4 right-4 w-48 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-10 delay-500">
                                <div className="bg-blue-600 p-3 text-white text-xs font-bold">Aryantra Support</div>
                                <div className="p-3 space-y-2">
                                   <div className="bg-slate-100 p-2 rounded-lg rounded-tl-none text-[10px] text-slate-600">Hi! How can I help?</div>
                                   <div className="bg-blue-50 p-2 rounded-lg rounded-tr-none text-[10px] text-blue-600 ml-auto w-fit">Pricing?</div>
                                   <div className="bg-slate-100 p-2 rounded-lg rounded-tl-none text-[10px] text-slate-600">Plans start at $99/mo.</div>
                                </div>
                             </div>
                         </div>
                      </div>
                  </div>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};