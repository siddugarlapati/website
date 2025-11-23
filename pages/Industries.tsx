import React, { useState } from 'react';
import { Building2, ShoppingBag, ArrowRight, TrendingUp, Users, CheckCircle2, ChevronDown, ChevronUp, PlayCircle, PackageCheck, ShoppingCart, CreditCard, Activity, Box, Map } from 'lucide-react';
import { Button } from '../components/Button';

interface IndustriesProps {
  onNavigate: (page: string) => void;
}

export const Industries: React.FC<IndustriesProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'realestate' | 'ecommerce'>('realestate');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const industries = {
    realestate: {
      title: "Real Estate",
      icon: Building2,
      color: "blue",
      headline: "Scale Your Agency Without Adding Headcount",
      subhead: "Automate lead qualification, site visits, and follow-ups so your agents only speak to serious buyers.",
      stats: [
        { val: "3x", label: "More Site Visits" },
        { val: "24/7", label: "Lead Response" },
        { val: "-40%", label: "Ops Cost" }
      ],
      growthPoints: [
        "Instant Lead Qualification via WhatsApp",
        "Automated Site Visit Scheduling",
        "Post-Visit Feedback Collection",
        "Re-engagement of Cold Database Leads"
      ],
      faqs: [
        { q: "Can Aryantra integrate with my existing CRM?", a: "Yes, we integrate seamlessly with Salesforce, HubSpot, Pipedrive, and custom CRMs to sync leads instantly." },
        { q: "How does the AI handle difficult questions?", a: "The AI is trained on your specific project data. If it encounters a question it can't answer, it gracefully hands over to a human agent." },
        { q: "Is it WhatsApp official?", a: "Absolutely. We use the official WhatsApp Business API, ensuring high delivery rates and zero bans." }
      ],
      visualImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
    },
    ecommerce: {
      title: "E-commerce",
      icon: ShoppingBag,
      color: "purple",
      headline: "Turn Support into Sales & Recover Carts Instantly",
      subhead: "Stop losing revenue to slow replies. Aryantra's AI agent solves queries instantly, recommends products, and brings customers back to checkout.",
      stats: [
        { val: "70%", label: "Auto-Resolution" },
        { val: "25%", label: "Cart Recovery" },
        { val: "0s", label: "Wait Time" }
      ],
      growthPoints: [
        "Instant 'Where is my Order?' Tracking",
        "Automated Abandoned Cart Recovery on WhatsApp",
        "Personalized Product Recommendations (Upsell)",
        "One-Click Returns & Exchange Handling"
      ],
      faqs: [
        { q: "Does it work with Shopify?", a: "Yes, seamless 1-click integration with Shopify, WooCommerce, and Magento." },
        { q: "Can it handle images?", a: "Yes! Customers can upload photos of damaged items for instant return analysis." },
        { q: "How do I track ROI?", a: "Our dashboard tracks every dollar recovered from abandoned carts and support upsells." }
      ],
      visualImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop"
    }
  };

  const current = industries[activeTab];

  return (
    <div className="w-full pt-32 pb-20 px-6 bg-[#FAFAFA] min-h-screen relative overflow-hidden">
      {/* Ambient Lighting Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
         <div className={`absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-${current.color}-400/20 blur-[120px] rounded-full animate-pulse-slow transition-colors duration-700`}></div>
         <div className={`absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-${current.color === 'blue' ? 'cyan' : 'pink'}-400/20 blur-[120px] rounded-full animate-pulse-slow transition-colors duration-700`}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Industry Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
          {Object.entries(industries).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center gap-2 px-6 py-4 rounded-full text-sm font-bold transition-all duration-300 border ${
                activeTab === key 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <data.icon size={18} />
              {data.title}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div key={activeTab} className="animate-in fade-in zoom-in duration-500">
          
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${current.color}-50 text-${current.color}-600 text-xs font-bold uppercase tracking-wider mb-6`}>
               <TrendingUp size={14} /> Industry Solution
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight mb-6 leading-[1.1]">
              {current.headline}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
              {current.subhead}
            </p>
          </div>

          {/* Interactive Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {current.stats.map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                <div className={`text-4xl font-bold text-${current.color}-600 mb-2 group-hover:scale-110 transition-transform`}>{stat.val}</div>
                <div className="text-slate-500 font-medium uppercase text-xs tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* How We Help (Split Section) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
             {/* Background pattern for card */}
             <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]"></div>
             
             <div className="space-y-8 relative z-10">
                <h2 className="text-3xl font-bold text-slate-900">How Aryantra drives growth for {current.title}</h2>
                <div className="space-y-4">
                  {current.growthPoints.map((point, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors group">
                      <div className={`h-10 w-10 rounded-full bg-white flex items-center justify-center text-${current.color}-600 shadow-sm group-hover:scale-110 transition-transform border border-slate-100 shrink-0`}>
                        <CheckCircle2 size={20} />
                      </div>
                      <span className="font-medium text-slate-700">{point}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={() => onNavigate('contact')} size="lg" className={`bg-${current.color}-600 hover:bg-${current.color}-700 border-0 shadow-lg shadow-${current.color}-500/20 mt-4`}>
                  Get a Custom Audit
                </Button>
             </div>
             
             {/* Visual Representation */}
             <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
                <img 
                  src={current.visualImage} 
                  alt={current.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Overlay Floating UI Elements specific to industry */}
                {activeTab === 'ecommerce' && (
                   <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 animate-in slide-in-from-bottom-4 delay-300">
                      <div className="flex items-center justify-between mb-2">
                         <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                            <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><PackageCheck size={14}/></div>
                            Cart Recovered!
                         </div>
                         <span className="text-green-600 font-bold text-sm">+$145.00</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-green-500 w-[80%]"></div>
                      </div>
                   </div>
                )}

                 {activeTab === 'realestate' && (
                   <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 animate-in slide-in-from-bottom-4 delay-300 max-w-xs">
                      <div className="flex gap-3 items-start">
                         <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><Users size={16}/></div>
                         <div>
                            <p className="text-xs font-bold text-slate-900">Lead Qualified</p>
                            <p className="text-[10px] text-slate-500 mt-1">"Yes, looking for 3BHK in Downtown. Budget 2Cr."</p>
                         </div>
                      </div>
                   </div>
                )}
             </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mb-24">
            <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {current.faqs.map((faq, i) => (
                <div key={i} className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all hover:shadow-md group">
                  <button 
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-800 hover:bg-slate-50/50 transition-colors"
                  >
                    {faq.q}
                    <div className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                       <ChevronDown size={20} className="text-slate-400" />
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 mt-2 animate-in slide-in-from-top-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center bg-slate-900 text-white rounded-3xl p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#0f172a,#1e293b)] opacity-50"></div>
            {/* Decorative bg elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
               <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to grow your {current.title} business?</h2>
               <p className="text-slate-400 mb-8 max-w-xl mx-auto">See exactly how Aryantra can help you scale efficiently with a personalized demo.</p>
               <Button onClick={() => onNavigate('contact')} size="xl" className="bg-white text-slate-900 hover:bg-slate-100 border-0">
                 Book a Demo <ArrowRight className="ml-2" />
               </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};