
import React from 'react';
import { ArrowRight, TrendingUp, Clock, ShieldAlert, Zap, CheckCircle2, XCircle, BarChart3, Users, BookOpen, Rocket, Lock, AlertTriangle, RefreshCw, Globe } from 'lucide-react';
import { Button } from '../components/Button';

export const Resources: React.FC = () => {
  const blogs = [
    {
      category: "Growth Strategy",
      title: "How AI acts as a Speed Multiplier for Business Growth",
      excerpt: "In the modern economy, speed is currency. Discover how replacing linear human workflows with parallel AI processing creates exponential growth curves.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      readTime: "5 min read",
      date: "Oct 12, 2023"
    },
    {
      category: "Aryantra Solutions",
      title: "Solving the Scalability Paradox with Aryantra",
      excerpt: "Traditionally, scaling meant hiring. Aryantra breaks this link. Learn how our autonomous agents allow you to handle 10x the volume without increasing headcount.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      readTime: "7 min read",
      date: "Nov 03, 2023"
    },
    {
      category: "Case Study Deep Dive",
      title: "From Bottleneck to Breakthrough: A Logistics Story",
      excerpt: "How a mid-sized logistics firm used Aryantra to automate dispatch coordination, reducing delay times by 85% in just three weeks.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      readTime: "4 min read",
      date: "Nov 15, 2023"
    },
    {
      category: "Real Estate Insights",
      title: "AI in Real Estate: Predicting Market Trends",
      excerpt: "Explore how AI is revolutionizing real estate by analyzing market data, predicting trends, and enabling smarter investment decisions.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
      readTime: "6 min read",
      date: "Nov 28, 2023"
    },
    {
      category: "Customer Success",
      title: "The 24/7 Leasing Agent: Never Miss a Lead",
      excerpt: "Human agents sleep. AI doesn't. Case study on how round-the-clock instant response increased lead conversion by 40% for a luxury high-rise.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800",
      readTime: "5 min read",
      date: "Dec 05, 2023"
    },
    {
      category: "Operational Efficiency",
      title: "Automating Vendor Dispatch: Property Management",
      excerpt: "Stop playing phone tag with plumbers. How we built an automated triage system that dispatches vendors based on urgency and skill set instantly.",
      image: "https://images.unsplash.com/photo-1581578731117-104f8a3d22df?auto=format&fit=crop&q=80&w=800",
      readTime: "6 min read",
      date: "Dec 12, 2023"
    },
    {
      category: "Sales Tech",
      title: "Why 'Speed to Lead' is the Only Metric That Matters",
      excerpt: "Data shows contacting a lead within 5 minutes increases qualification chances by 21x. See how Aryantra achieves sub-60 second response times.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
      readTime: "4 min read",
      date: "Jan 04, 2024"
    },
    {
      category: "E-commerce Automation",
      title: "Recovering $50k/mo in Abandoned Carts via WhatsApp",
      excerpt: "Email open rates are dropping. WhatsApp is at 98%. A case study on how switching cart recovery channels transformed revenue for a D2C brand.",
      image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&q=80&w=800",
      readTime: "5 min read",
      date: "Jan 10, 2024"
    },
    {
      category: "Data Science",
      title: "The End of Dirty CRM Data",
      excerpt: "How autonomous agents can clean, de-duplicate, and enrich your CRM data in real-time, ensuring your sales team always has the full picture.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      readTime: "7 min read",
      date: "Jan 18, 2024"
    },
    {
      category: "Healthcare AI",
      title: "Triage Bots: Reducing ER Wait Times",
      excerpt: "Deploying a symptom-checker bot to pre-screen patients before they arrive. How technology is humanizing healthcare by reducing administrative burden.",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800",
      readTime: "6 min read",
      date: "Feb 02, 2024"
    },
    {
      category: "Future of Work",
      title: "The Rise of the 'Agentic' Workforce",
      excerpt: "We are moving from 'using software' to 'hiring software'. What the shift to autonomous agents means for the future of organizational structure.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
      readTime: "8 min read",
      date: "Feb 15, 2024"
    },
    {
      category: "FinTech",
      title: "Automating Loan Origination Documents",
      excerpt: "Using OCR and LLMs to classify, read, and verify loan documents instantly, cutting processing time from days to minutes.",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800",
      readTime: "5 min read",
      date: "Feb 22, 2024"
    },
    {
      category: "Marketing Automation",
      title: "Hyper-Personalization at Scale",
      excerpt: "Moving beyond 'Hi [Name]'. How AI generates unique landing pages and video messages for every single prospect in your funnel.",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=800",
      readTime: "5 min read",
      date: "Mar 01, 2024"
    },
    {
      category: "Cost Analysis",
      title: "ROI Calculator: Manual vs. AI Operations",
      excerpt: "A transparent breakdown of the costs of human error, training, and turnover vs. the fixed cost of autonomous software infrastructure.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      readTime: "6 min read",
      date: "Mar 10, 2024"
    },
    // NEW RESOURCES
    {
      category: "PropTech",
      title: "Virtual Staging with Generative AI",
      excerpt: "How to turn empty listing photos into fully furnished, beautiful homes in seconds using GenAI, increasing click-through rates by 75%.",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
      readTime: "4 min read",
      date: "Mar 15, 2024"
    },
    {
      category: "Construction Tech",
      title: "AI for Predictive Site Safety",
      excerpt: "Using computer vision to monitor construction sites for safety violations in real-time, reducing accident rates by over 60%.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
      readTime: "6 min read",
      date: "Mar 20, 2024"
    },
    {
      category: "Smart Cities",
      title: "The Nervous System of a Smart City",
      excerpt: "How interconnected AI agents manage traffic flow, energy consumption, and waste management in modern urban developments.",
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800",
      readTime: "8 min read",
      date: "Mar 25, 2024"
    },
    {
      category: "Blockchain",
      title: "Tokenizing Real Estate Assets",
      excerpt: "A primer on how blockchain and AI are working together to fractionalize property ownership and automate dividend payouts.",
      image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800",
      readTime: "7 min read",
      date: "Apr 01, 2024"
    },
    {
      category: "Legal Tech",
      title: "The End of Lease Disputes",
      excerpt: "How natural language processing models are drafting smarter, clearer contracts that reduce ambiguity and legal costs.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
      readTime: "5 min read",
      date: "Apr 05, 2024"
    },
    {
      category: "Voice AI",
      title: "Replacing the Call Center",
      excerpt: "Voice AI agents are now indistinguishable from humans. What this means for the BPO industry and customer service standards.",
      image: "https://images.unsplash.com/photo-1526304640152-d4619684e484?auto=format&fit=crop&q=80&w=800",
      readTime: "6 min read",
      date: "Apr 12, 2024"
    },
    {
      category: "Retail Tech",
      title: "The Autonomous Store Manager",
      excerpt: "Case study: How a retail chain uses AI to predict stock shortages and auto-order inventory before shelves go empty.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
      readTime: "5 min read",
      date: "Apr 18, 2024"
    },
    {
      category: "Sustainability",
      title: "Energy Optimization Algorithms",
      excerpt: "Reducing the carbon footprint of commercial buildings by 30% simply by letting AI control the HVAC and lighting systems.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
      readTime: "6 min read",
      date: "Apr 24, 2024"
    },
    {
      category: "Security",
      title: "Data Privacy in the Age of Agents",
      excerpt: "How Aryantra ensures enterprise-grade security and compliance when deploying autonomous agents in sensitive sectors.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
      readTime: "5 min read",
      date: "May 01, 2024"
    },
    {
      category: "EdTech",
      title: "Personalized Learning Paths",
      excerpt: "Moving away from the 'one size fits all' classroom. How AI tutors adapt curriculum in real-time based on student performance.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
      readTime: "6 min read",
      date: "May 10, 2024"
    }
  ];

  return (
    <div className="w-full pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-4xl mx-auto mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 shadow-sm mb-6">
            <BookOpen size={14} className="text-blue-600" />
            <span className="text-xs font-bold tracking-wide uppercase text-blue-600">Knowledge Hub</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight mb-8 leading-[1.1]">
            Insights for the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Exponential Enterprise.</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Deep dives into automation strategies, scaling methodologies, and the future of autonomous business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {blogs.map((blog, i) => (
            <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="h-48 overflow-hidden relative bg-slate-100">
                <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    onError={(e) => {
                        // Fallback in case Unsplash fails
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800";
                    }}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm border border-slate-200">
                  {blog.category}
                </div>
              </div>
              <div className="p-6 flex flex-col h-[240px]">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-3">
                  <span>{blog.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                  {blog.excerpt}
                </p>
                <button className="text-blue-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                  Read Article <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* REVISED ARYANTRA EFFECT SECTION */}
        <div className="mb-32 animate-slide-up stagger-1">
          <div className="text-center mb-16">
             <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">The Aryantra Effect</h2>
             <p className="text-slate-500 text-lg">A side-by-side comparison of the old way versus the autonomous way.</p>
          </div>

          <div className="relative bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            {/* Split Background */}
            <div className="absolute inset-0 flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 bg-slate-50/80 border-b md:border-b-0 md:border-r border-slate-200"></div>
              <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-50/30 to-white"></div>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 z-10">
              
              {/* LEFT: Manual / Problem Side */}
              <div className="p-8 md:p-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mb-10">
                  <Clock size={12} /> The Old Way (Manual)
                </div>
                
                <div className="space-y-10">
                  {/* Point 1 */}
                  <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100 group-hover:scale-110 transition-transform">
                      <XCircle size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">Linear Scaling Costs</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">To double your output, you must double your headcount. Profit margins shrink as you grow.</p>
                    </div>
                  </div>

                  {/* Point 2 */}
                  <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100 group-hover:scale-110 transition-transform">
                      <ShieldAlert size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">Human Latency</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">Leads wait hours for responses. Support tickets pile up over weekends. Opportunities are lost to speed.</p>
                    </div>
                  </div>

                  {/* Point 3 */}
                  <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100 group-hover:scale-110 transition-transform">
                      <Lock size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">Data Silos</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">Information is trapped in emails, spreadsheets, and sticky notes. No single source of truth.</p>
                    </div>
                  </div>

                   {/* Point 4 */}
                   <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100 group-hover:scale-110 transition-transform">
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">Reactive Solving</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">Teams only fix problems after they happen. Fire-fighting becomes the daily norm.</p>
                    </div>
                  </div>

                   {/* Point 5 */}
                   <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100 group-hover:scale-110 transition-transform">
                      <BarChart3 size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">Inconsistent Quality</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">Output varies by employee mood, energy levels, and training. The customer experience is a gamble.</p>
                    </div>
                  </div>
                  
                   {/* Point 6 */}
                   <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100 group-hover:scale-110 transition-transform">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">Limited Availability</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">Your business essentially shuts down at 5 PM. Night-owl customers are ignored.</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* RIGHT: Aryantra / Solution Side */}
              <div className="p-8 md:p-12 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-10">
                  <Zap size={12} /> With Aryantra (Autonomous)
                </div>

                <div className="space-y-10">
                  {/* Point 1 */}
                  <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Zero Marginal Cost</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">Scale from 100 to 10,000 interactions per day instantly, without adding a single new hire.</p>
                    </div>
                  </div>

                  {/* Point 2 */}
                  <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Instant Gratification</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">Leads get qualified in seconds, 24/7/365. Speed becomes your competitive moat.</p>
                    </div>
                  </div>

                  {/* Point 3 */}
                  <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Unified Intelligence</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">Agents sync data across your CRM, Email, and Databases instantly. Perfect recall, every time.</p>
                    </div>
                  </div>

                   {/* Point 4 */}
                   <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                      <Rocket size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Proactive Resolution</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">Agents predict issues before they escalate (e.g., inventory alerts, lease renewals) and act automatically.</p>
                    </div>
                  </div>

                   {/* Point 5 */}
                   <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                      <RefreshCw size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Standardized Excellence</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">Every customer gets your best sales pitch, every time. No bad days, no missed scripts.</p>
                    </div>
                  </div>

                   {/* Point 6 */}
                   <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                      <Globe size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Infinite Uptime</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">Your business is truly always open. Capture revenue while your competitors (and you) are sleeping.</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="bg-[#0B0F19] rounded-3xl p-8 md:p-16 text-white relative overflow-hidden animate-slide-up stagger-2 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0B0F19] to-[#0B0F19]"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
                  <TrendingUp size={12} /> Proven Impact
               </div>
               <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                 The "Hockey Stick" <br/>Growth Curve
               </h2>
               <p className="text-slate-400 text-lg leading-relaxed mb-8">
                 When you decouple revenue generation from human effort, you unlock a new tier of scalability. Our clients typically see a 300% increase in capacity within the first 60 days.
               </p>
               
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <div className="text-4xl font-bold text-white mb-1">3x</div>
                   <div className="text-sm text-slate-500 font-medium">Revenue / Employee</div>
                 </div>
                 <div>
                   <div className="text-4xl font-bold text-white mb-1">-40%</div>
                   <div className="text-sm text-slate-500 font-medium">Operational Burn</div>
                 </div>
               </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 relative h-80 flex items-end">
               <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none opacity-20">
                 <div className="w-full h-px bg-white"></div>
                 <div className="w-full h-px bg-white"></div>
                 <div className="w-full h-px bg-white"></div>
                 <div className="w-full h-px bg-white"></div>
                 <div className="w-full h-px bg-white"></div>
               </div>

               <div className="relative w-full h-full">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                     <path 
                       d="M0,280 C100,270 200,260 300,150 C350,100 400,50 500,0" 
                       fill="none" 
                       stroke="url(#gradient)" 
                       strokeWidth="4" 
                       strokeLinecap="round"
                       className="drop-shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                     />
                     <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                           <stop offset="0%" stopColor="#94a3b8" />
                           <stop offset="50%" stopColor="#60a5fa" />
                           <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                     </defs>
                  </svg>

                  <div className="absolute bottom-[10%] left-[0%] transform -translate-x-1/2 translate-y-1/2">
                     <div className="bg-slate-700 text-xs px-2 py-1 rounded text-white whitespace-nowrap mb-2 opacity-0 group-hover:opacity-100 transition-opacity">Launch</div>
                     <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                  </div>
                  <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 translate-y-1/2 group">
                     <div className="bg-blue-900 border border-blue-700 text-xs px-2 py-1 rounded text-blue-100 whitespace-nowrap mb-2 absolute -top-8 left-1/2 -translate-x-1/2">Aryantra Integration</div>
                     <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-500/30 animate-pulse"></div>
                  </div>
                  <div className="absolute top-[0%] right-[0%] transform translate-x-1/2 translate-y-1/2">
                     <div className="bg-white text-blue-900 text-xs font-bold px-2 py-1 rounded whitespace-nowrap mb-2 absolute -top-8 right-0">New Normal</div>
                     <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
