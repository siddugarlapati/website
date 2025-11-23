
import React from 'react';
import { ArrowUpRight, TrendingUp, CheckCircle2, AlertCircle, Zap, Layout, BarChart3, Bot, Landmark, Truck, Stethoscope, Building, Home, MessageSquare, Users, Phone, Clock, DollarSign, FileText } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  
  // Helper component for charts
  const StatBar = ({ label, before, after, color }: { label: string, before: number, after: number, color: string }) => (
      <div className="mb-4">
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">{label}</div>
          <div className="relative h-8 bg-slate-100 rounded-full overflow-hidden flex items-center">
               {/* Before Bar */}
               <div style={{width: `${before}%`}} className="h-full bg-slate-300 relative group">
                   <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-600">Before</span>
               </div>
               {/* After Bar */}
               <div style={{width: `${after}%`}} className={`h-full bg-${color}-500 relative flex items-center justify-end pr-2 transition-all duration-1000 animate-pulse-slow`}>
                    <span className="text-xs font-bold text-white">After (Aryantra)</span>
               </div>
          </div>
      </div>
  );

  const realEstateStudies = [
    {
        id: 'prestige',
        client: "Prestige High Fields",
        location: "Financial District, Hyderabad",
        problem: "Sales team was drowning in 2,000+ monthly leads from Facebook & MagicBricks. 85% were unqualified/window shoppers. Response time averaged 6 hours.",
        solution: "Deployed 'Arya', a Voice & WhatsApp AI Agent that calls leads within 30 seconds of inquiry, asks qualifying questions (Budget, Timeline, Intent), and only books site visits for qualified buyers.",
        results: {
            leads_processed: "15,000+",
            qualified_rate: "18%",
            site_visits: "+340%",
            roi: "12x"
        },
        graph: { label: "Lead Response Time", before: 100, after: 5, unit: "mins" }, // Normalized for visual
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
        color: "blue"
    },
    {
        id: 'greenfield',
        client: "Greenfield Developers",
        location: "Pune",
        problem: "High no-show rate for site visits. Customers would book but forget or cancel last minute without notifying, wasting sales agents' weekends.",
        solution: "Automated 'Smart Reminders' sequence via WhatsApp that sends maps, confirms attendance, and offers rescheduling slots instantly if a client cancels.",
        results: {
            show_up_rate: "85%",
            sales_efficiency: "+40%",
            rescheduled_auto: "40%",
            revenue_impact: "+$2M"
        },
        graph: { label: "Site Visit No-Show Rate", before: 60, after: 15, unit: "%" },
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=2074&auto=format&fit=crop",
        color: "purple"
    },
    {
        id: 'lodha',
        client: "Lodha Luxury Collection",
        location: "Mumbai & London",
        problem: "High Cost Per Lead (CPL) and low conversion on premium inventory (>₹5 Cr). Generic marketing automation was failing to engage HNI clients who expect personalized, high-touch service.",
        solution: "Implemented 'Concierge AI'. Instead of generic forms, the AI engages via personalized WhatsApp Business API, offering virtual tours, investment yield calculations, and instant brochure customization based on client interest.",
        results: {
            cpl_reduction: "-40%",
            engagement_rate: "65%",
            sales_velocity: "2x Faster",
            revenue_impact: "₹45 Cr+"
        },
        graph: { label: "Marketing CPL Efficiency", before: 100, after: 60, unit: "%" },
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
        color: "amber"
    },
    {
        id: 'urban',
        client: "Urban Skyline Developers",
        location: "Bangalore",
        problem: "Post-sales chaos. Customers constantly calling for 'Construction Updates', 'Demand Letters', and 'Receipts'. The CRM team was overwhelmed with repetitive queries.",
        solution: "Integrated a 'Client Portal Bot' on WhatsApp. Customers simply type 'My Updates' to get real-time construction photos, payment schedules, and download invoices instantly from the database.",
        results: {
            tickets_deflected: "92%",
            csat_score: "4.9/5",
            man_hours_saved: "120/mo",
            cost_savings: "$45k/yr"
        },
        graph: { label: "Support Ticket Volume", before: 90, after: 15, unit: "tickets" },
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        color: "emerald"
    },
    {
        id: 'dlf_cyber',
        client: "DLF Cyber City Offices",
        location: "Gurgaon",
        problem: "Lease renewal leakage. Managing 500+ commercial tenants meant missing renewal dates, delayed rent escalations, and lost revenue to slow paperwork processing.",
        solution: "Deployed 'LeaseBot'. It proactively notifies tenants 90 days before expiry, auto-generates renewal contracts with updated pricing, and collects digital signatures via email/WhatsApp.",
        results: {
            on_time_renewals: "98%",
            admin_time: "-85%",
            rent_collection: "+12%",
            legal_errors: "0%"
        },
        graph: { label: "Contract Processing Time", before: 100, after: 10, unit: "days" },
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
        color: "cyan"
    },
    {
        id: 'royal_palms',
        client: "Royal Palms Infrastructure",
        location: "Mumbai",
        problem: "During their 'Monsoon Launch', the sales team received 5,000+ leads in a week. They were physically unable to call everyone within 24 hours, leading to massive lead leakage and lost revenue to competitors.",
        solution: "Implemented 'Aryantra Scale', a multi-channel AI (WhatsApp + IVR) that instantly engaged every lead. It filtered out 65% of 'window shoppers' and scheduled site visits for the top 10% directly into sales calendars.",
        results: {
            leads_engaged: "5,200",
            calls_saved: "3,400",
            site_visits: "450",
            revenue_booked: "$12M"
        },
        graph: { label: "Lead Contact Rate (First Hour)", before: 15, after: 100, unit: "%" },
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop",
        color: "orange"
    },
    {
        id: 'apex_reit',
        client: "Apex Capital REIT",
        location: "Bangalore & Chennai",
        problem: "Managing maintenance for 2,000 commercial units was a nightmare of emails and phone calls. Vendor dispatch was slow, and tenant satisfaction scores were dropping below 3.0 due to delays.",
        solution: "Deployed a centralized 'Maintenance OS'. Tenants report issues via app/WhatsApp photo. AI analyzes urgency, auto-assigns the correct vendor based on SLA, and follows up until resolution.",
        results: {
            resolution_time: "-70%",
            admin_cost: "-30%",
            tenant_csat: "4.8/5",
            vendor_compliance: "99%"
        },
        graph: { label: "Avg Resolution Time", before: 72, after: 8, unit: "hours" },
        image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=2069&auto=format&fit=crop",
        color: "indigo"
    }
  ];

  return (
    <div className="w-full py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center max-w-3xl mx-auto animate-slide-up">
          <div className="inline-block mb-4">
             <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Real World Impact</span>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-6">Case Studies: Real Estate Focus</h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            While we serve many sectors, our impact on Real Estate is transformative. 
            Here is how we solved complex problems for top developers.
          </p>
        </div>

        {/* FEATURED REAL ESTATE CASE STUDIES */}
        <div className="space-y-24">
            {realEstateStudies.map((study, index) => (
                <div key={study.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} animate-slide-up`}>
                    {/* Visual / Graph Side */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-4 border-white group">
                             {/* Main Image */}
                             <img src={study.image} alt={study.client} className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75 group-hover:brightness-100" />
                             
                             {/* Overlay Gradient */}
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>

                             {/* Floating Graph Card */}
                             <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/50">
                                 <StatBar 
                                    label={study.graph.label} 
                                    before={study.graph.before} 
                                    after={study.graph.after} 
                                    color={study.color} 
                                 />
                                 <div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
                                     <span>Manual Process</span>
                                     <span className={`font-bold text-${study.color}-600`}>Aryantra Automation</span>
                                 </div>
                             </div>
                             
                             {/* Rotating Light Border Effect - Per user request */}
                             <div className="absolute inset-0 pointer-events-none border-[3px] border-transparent rounded-[36px] [background:linear-gradient(var(--bg),var(--bg))_padding-box,conic-gradient(from_var(--border-angle),theme('colors.slate.200')_80%,_theme('colors.blue.500')_86%,_theme('colors.blue.300')_90%,_theme('colors.blue.500')_94%,_theme('colors.slate.200'))_border-box] animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div>
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${study.color}-50 text-${study.color}-600 text-xs font-bold uppercase tracking-wider mb-4`}>
                                <Building size={14} /> Real Estate Automation
                            </div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-2">{study.client}</h2>
                            <p className="text-slate-400 font-medium flex items-center gap-2"><Landmark size={16}/> {study.location}</p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
                                <h4 className="text-rose-700 font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2"><AlertCircle size={16}/> The Problem</h4>
                                <p className="text-slate-700 leading-relaxed">{study.problem}</p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                                <h4 className="text-green-700 font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2"><CheckCircle2 size={16}/> The Aryantra Solution</h4>
                                <p className="text-slate-700 leading-relaxed">{study.solution}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                            {Object.entries(study.results).map(([key, val], i) => (
                                <div key={i}>
                                    <div className={`text-2xl font-bold text-${study.color}-600`}>{val}</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider">{key.replace('_', ' ')}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* OTHER INDUSTRIES CAROUSEL */}
        <div className="mt-32">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900">Beyond Real Estate</h2>
                <p className="text-slate-500">We apply the same "Agent" logic to other complex industries.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group">
                    <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6"><Truck size={24}/></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Logistics</h3>
                    <p className="text-slate-500 text-sm mb-4">Automated dispatch and driver coordination.</p>
                    <div className="flex items-center gap-2 text-xs font-bold text-green-600">
                        <TrendingUp size={14}/> Reduced delays by 40%
                    </div>
                </div>
                 <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group">
                    <div className="h-12 w-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center mb-6"><Stethoscope size={24}/></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Healthcare</h3>
                    <p className="text-slate-500 text-sm mb-4">Patient appointment triage and follow-ups.</p>
                    <div className="flex items-center gap-2 text-xs font-bold text-green-600">
                        <TrendingUp size={14}/> 24/7 Patient Support
                    </div>
                </div>
                 <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group">
                    <div className="h-12 w-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6"><DollarSign size={24}/></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">FinTech</h3>
                    <p className="text-slate-500 text-sm mb-4">Loan application document collection.</p>
                    <div className="flex items-center gap-2 text-xs font-bold text-green-600">
                        <TrendingUp size={14}/> 3x Faster Processing
                    </div>
                </div>
            </div>
        </div>
        
        <div className="mt-24 text-center animate-slide-up stagger-4">
          <p className="text-slate-500 mb-4">Want to see how this applies to your business?</p>
          <button className="inline-flex items-center text-sm font-bold text-white bg-slate-900 px-8 py-4 rounded-full hover:bg-slate-800 transition-all hover:-translate-y-1 shadow-lg shadow-slate-900/20">
            Book a Strategy Call <ArrowUpRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
