
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Users, Video, MessageCircle, PenTool, Sparkles, Loader2, ImageIcon, Download, Check, Send, Play, Phone, FileText, RefreshCw, Copy, Bot, Calendar, FileSearch, Upload, CheckCircle, Building, TrendingUp, Search, Database, Wrench, AlertTriangle, ClipboardCheck, Mail, Globe, BarChart3, Smartphone, DollarSign, Briefcase, Shield, Megaphone, X, Puzzle, Layers, Instagram, Layout } from 'lucide-react';
import { Button } from '../components/Button';
import { GoogleGenAI } from "@google/genai";

export const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lead' | 'voice' | 'media' | 'support' | 'content' | 'scheduling' | 'docs' | 'maintenance' | 'market' | 'ads' | 'instagram'>('lead');

  // --- Shared AI State ---
  const [isGenerating, setIsGenerating] = useState(false);
  
  // --- Media Gen State ---
  const [imagePrompt, setImagePrompt] = useState('Modern luxury apartment interior with floor-to-ceiling windows, sunset view, photorealistic, 8k');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // --- Content Gen State ---
  const [contentTopic, setContentTopic] = useState('5 Tips for First-Time Home Buyers');
  const [contentFormat, setContentFormat] = useState('LinkedIn Post');
  const [contentTone, setContentTone] = useState('Professional');
  const [generatedContent, setGeneratedContent] = useState('');

  // --- Chat States (Lead & Support) ---
  const [chatInput, setChatInput] = useState('');
  const [leadMessages, setLeadMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Hi there! I'm Aryantra's sales assistant. I see you're interested in automation. What's your biggest operational bottleneck right now?" }
  ]);
  const [supportMessages, setSupportMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Hello! I'm the Aryantra Support Bot. How can I help you with your account or integrations today?" }
  ]);

  // --- Voice State ---
  const [isCallActive, setIsCallActive] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState<{speaker: 'Agent' | 'You', text: string}[]>([]);

  // --- Scheduling State ---
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<'select' | 'confirming' | 'booked'>('select');

  // --- Document Intelligence State ---
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [docResult, setDocResult] = useState<any | null>(null);

  // --- Maintenance AI State ---
  const [maintenanceInput, setMaintenanceInput] = useState('The kitchen sink is leaking water underneath the cabinet and ruining the wood.');
  const [maintenanceResult, setMaintenanceResult] = useState<any | null>(null);

  // --- Market Intelligence State ---
  const [marketInput, setMarketInput] = useState('Downtown Dubai');
  const [marketResult, setMarketResult] = useState<any | null>(null);

  // --- Ad Gen State ---
  const [adProduct, setAdProduct] = useState('Smart Home Security System');
  const [adAudience, setAdAudience] = useState('Tech-savvy homeowners');
  const [adResult, setAdResult] = useState<{headline: string, body: string, imagePrompt: string, imageUrl?: string} | null>(null);

  // --- Insta State ---
  const [instaInput, setInstaInput] = useState('');
  const [instaFeed, setInstaFeed] = useState<{user: string, text: string, reply?: string, dmSent?: boolean}[]>([
      { user: 'sarah_j', text: 'Price please? 😍', reply: 'Check your DMs! 📩', dmSent: true }
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll for chats
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [leadMessages, supportMessages, voiceTranscript]);

  // --- Handlers ---
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: imagePrompt,
        config: { numberOfImages: 1, outputMimeType: 'image/jpeg', aspectRatio: '1:1' },
      });
      if (response.generatedImages?.[0]) {
        setGeneratedImage(`data:image/jpeg;base64,${response.generatedImages[0].image.imageBytes}`);
      }
    } catch (err) {
      console.error(err);
      // Simulation Fallback
      setTimeout(() => {
          setGeneratedImage("https://images.unsplash.com/photo-1502005229762-cf1e2da0c542?q=80&w=1000&auto=format&fit=crop");
      }, 1500);
    } finally {
      setTimeout(() => setIsGenerating(false), 1500);
    }
  };

  const handleGenerateContent = async () => {
    if (!contentTopic.trim()) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Write a ${contentTone} ${contentFormat} about "${contentTopic}". Keep it concise (under 100 words) and engaging.`,
      });
      setGeneratedContent(response.text || "Could not generate content.");
    } catch (err) {
      console.error(err);
      // Simulation Fallback
      setGeneratedContent(`Here is a draft for your ${contentFormat}:\n\n"🏡 Ready to buy your first home? Here are 5 quick tips to get you started:\n\n1. Check your credit score early.\n2. Get pre-approved, not just pre-qualified.\n3. Save for a down payment + closing costs.\n4. Don't skip the home inspection!\n5. Look beyond the paint color.\n\n#RealEstate #HomeBuying #Tips"`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleChat = async (type: 'lead' | 'support') => {
    if (!chatInput.trim()) return;
    
    const newMessage = { role: 'user' as const, text: chatInput };
    const currentMessages = type === 'lead' ? leadMessages : supportMessages;
    const setMessages = type === 'lead' ? setLeadMessages : setSupportMessages;
    
    setMessages(prev => [...prev, newMessage]);
    const userInput = chatInput;
    setChatInput('');
    setIsGenerating(true);

    const systemPrompt = type === 'lead' 
      ? "You are a Sales Development Representative for Aryantra. Your goal is to qualify leads by asking about their company size, industry, and specific automation needs. Keep responses short, professional, and conversational."
      : "You are a Customer Support Agent for Aryantra. You help users with issues related to 'Flow Builder', 'API Keys', and 'Billing'. Be empathetic and helpful. If you don't know, ask for more details.";

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        config: { systemInstruction: systemPrompt },
        contents: [...currentMessages.map(m => ({ role: m.role, parts: [{ text: m.text }] })), { role: 'user', parts: [{ text: userInput }] }],
      });
      
      const reply = response.text;
      setMessages(prev => [...prev, { role: 'model', text: reply || "I'm having trouble connecting." }]);
    } catch (err) {
      console.error(err);
      // Simulation Fallback
      setTimeout(() => {
        const fallback = type === 'lead' 
            ? "That's interesting! Could you tell me a bit more about your team size? We have specific plans for growing agencies."
            : "I understand. Have you tried checking the 'Integrations' tab in your settings? That's usually where API keys are managed.";
        setMessages(prev => [...prev, { role: 'model', text: fallback }]);
      }, 1000);
    } finally {
      setIsGenerating(false);
    }
  };

  const startVoiceSimulation = () => {
    if (isCallActive) return;
    setIsCallActive(true);
    setVoiceTranscript([]);
    const script = [
      { speaker: 'Agent', text: "Hi, this is Sarah from Aryantra. Am I speaking with the business owner?", delay: 1000 },
      { speaker: 'You', text: "Yes, this is him. What is this about?", delay: 3000 },
      { speaker: 'Agent', text: "I noticed you recently downloaded our automation guide. I wanted to see if you had any questions about implementing AI agents?", delay: 5000 },
      { speaker: 'You', text: "Actually, yes. I'm worried about the integration time.", delay: 8000 },
      { speaker: 'Agent', text: "That's a common concern! Our average deployment time is actually less than 48 hours. Would you be open to a 10-minute demo?", delay: 11000 },
    ];
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    script.forEach((line) => {
      const id = setTimeout(() => {
        setVoiceTranscript(prev => [...prev, { speaker: line.speaker as any, text: line.text }]);
      }, line.delay);
      timeouts.push(id);
    });
    const endId = setTimeout(() => setIsCallActive(false), 14000);
    timeouts.push(endId);
  };

  const handleBooking = (slot: string) => {
    setSelectedDate(slot);
    setBookingStep('confirming');
    setTimeout(() => { setBookingStep('booked'); }, 1500);
  };

  const handleDocAnalysis = () => {
      setIsAnalyzing(true);
      setDocResult(null);
      setTimeout(() => {
          setIsAnalyzing(false);
          setDocResult({
              type: "Residential Lease Agreement",
              confidence: "99.2%",
              extracted: [
                  { label: "Tenant Name", value: "Jonathan Doe" },
                  { label: "Monthly Rent", value: "$2,400.00" },
                  { label: "Lease Start", value: "Jan 01, 2024" },
                  { label: "Lease End", value: "Dec 31, 2024" },
                  { label: "Security Deposit", value: "$4,800.00" },
                  { label: "Pet Clause", value: "Permitted (under 30lbs)" },
              ]
          })
      }, 2500);
  };

  const handleMaintenanceTriage = async () => {
      if(!maintenanceInput.trim()) return;
      setIsGenerating(true);
      setMaintenanceResult(null);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            config: { responseMimeType: "application/json" },
            contents: `Act as a property management AI. Analyze this tenant request: "${maintenanceInput}". Return JSON: {category, urgency, action_plan, reply_text}`
        });
        const text = response.text || "{}";
        setMaintenanceResult(JSON.parse(text));
      } catch (e) {
          // Simulation Fallback
          setTimeout(() => {
              setMaintenanceResult({
                  category: "Plumbing",
                  urgency: "High",
                  action_plan: "Dispatch approved plumber immediately. Notify owner of potential water damage.",
                  reply_text: "I'm sorry to hear that. I've classified this as urgent and have dispatched a plumber. They should contact you within 30 minutes."
              });
          }, 1500);
      } finally {
          setTimeout(() => setIsGenerating(false), 1500); 
      }
  };

  const handleMarketAnalysis = async () => {
      if(!marketInput.trim()) return;
      setIsGenerating(true);
      setMarketResult(null);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Provide a brief, 2-sentence real estate market summary for: "${marketInput}".`
        });
        setTimeout(() => {
            setMarketResult({ summary: response.text, price: "₹1.2 Cr", trend: "+5.4%", dom: "24 Days" });
            setIsGenerating(false);
        }, 1500);
      } catch(e) { 
         // Simulation Fallback
         setTimeout(() => {
            setMarketResult({ 
                summary: `The ${marketInput} market is currently experiencing high demand with inventory levels at historic lows. Prices have seen a steady appreciation over the last quarter driven by luxury developments.`,
                price: "$850k", 
                trend: "+12.4%", 
                dom: "18 Days" 
            });
            setIsGenerating(false);
         }, 1500);
      }
  };

  const handleAdGen = async () => {
    if (!adProduct || !adAudience) return;
    setIsGenerating(true);
    setAdResult(null);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // 1. Generate Copy & Visual Prompt
        const textResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            config: { responseMimeType: 'application/json' },
            contents: `Generate a Facebook Ad campaign for product: "${adProduct}" targeting: "${adAudience}". Return JSON with keys: headline, body, visual_prompt.`
        });
        
        const campaignData = JSON.parse(textResponse.text || '{}');
        
        // 2. Generate Image
        let imageUrl = "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop"; // Fallback
        try {
             const imageResponse = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: campaignData.visual_prompt || `Professional advertisement photo for ${adProduct}`,
                config: { numberOfImages: 1, outputMimeType: 'image/jpeg', aspectRatio: '16:9' },
             });
             if (imageResponse.generatedImages?.[0]) {
                imageUrl = `data:image/jpeg;base64,${imageResponse.generatedImages[0].image.imageBytes}`;
             }
        } catch (imgErr) {
            console.log("Image gen failed, using fallback");
        }

        setAdResult({
            headline: campaignData.headline || `Experience ${adProduct}`,
            body: campaignData.body || "Discover the future today.",
            imagePrompt: campaignData.visual_prompt,
            imageUrl: imageUrl
        });

    } catch (e) {
        console.error(e);
        // Fallback
        setAdResult({
            headline: `Upgrade to ${adProduct}`,
            body: "The ultimate solution for your needs. Shop now.",
            imagePrompt: "Product shot",
            imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop"
        });
    } finally {
        setIsGenerating(false);
    }
  };

  const handleInstaPost = async () => {
      if (!instaInput) return;
      const newComment = { user: 'you', text: instaInput };
      setInstaFeed(prev => [...prev, newComment]);
      setInstaInput('');
      setIsGenerating(true);
      
      // Simulate processing
      setTimeout(() => {
          setInstaFeed(prev => prev.map((c, i) => 
              i === prev.length - 1 ? { ...c, reply: 'Sent you the details! 🌟', dmSent: true } : c
          ));
          setIsGenerating(false);
      }, 1500);
  };

  const servicesList = [
    { id: 'lead', title: "Lead Qualification", icon: Users, desc: "Auto-qualify leads via chat." },
    { id: 'voice', title: "Voice Agent", icon: Mic, desc: "Simulate outbound calls." },
    { id: 'media', title: "Gen AI Media", icon: Video, desc: "Create visuals on demand." },
    { id: 'support', title: "AI Support Bot", icon: MessageCircle, desc: "24/7 Customer resolution." },
    { id: 'content', title: "Content Automation", icon: PenTool, desc: "Generate marketing assets." },
    { id: 'ads', title: "Ad Generator", icon: Megaphone, desc: "Create campaigns instantly." },
    { id: 'instagram', title: "Instagram Bot", icon: Instagram, desc: "Auto-reply & DM automation." },
    { id: 'scheduling', title: "Smart Scheduling", icon: Calendar, desc: "Auto-book viewings & calls." },
    { id: 'docs', title: "Document Intelligence", icon: FileSearch, desc: "Extract data from contracts." },
    { id: 'maintenance', title: "Maintenance AI", icon: Wrench, desc: "Triage tenant requests." }, 
    { id: 'market', title: "Market Intelligence", icon: TrendingUp, desc: "Instant valuation & trends." }, 
  ];

  const renderDemoContent = () => {
      switch(activeTab) {
          case 'lead':
          case 'support':
             const msgs = activeTab === 'lead' ? leadMessages : supportMessages;
             return (
                <div className="h-full flex flex-col animate-in fade-in zoom-in duration-300">
                   <div className="mb-4 border-b border-slate-100 pb-4 flex justify-between items-center">
                       <div>
                           <h2 className="text-2xl font-bold flex gap-2 items-center text-slate-900">
                               {activeTab === 'lead' ? <Users className="text-blue-600"/> : <MessageCircle className="text-green-600"/>}
                               {activeTab === 'lead' ? 'Lead Qualification' : 'Customer Support'}
                           </h2>
                           <p className="text-slate-500 mt-1 text-sm">
                               {activeTab === 'lead' ? 'Engage visitors and qualify intent instantly.' : 'Resolve tickets automatically 24/7.'}
                           </p>
                       </div>
                       <div className="flex items-center gap-2 text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-600">
                           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                           AI Active
                       </div>
                   </div>
                   <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col overflow-hidden shadow-inner">
                      <div className="flex-1 p-6 space-y-4 overflow-y-auto" ref={scrollRef}>
                          {msgs.map((m,i) => (
                              <div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'} animate-in slide-in-from-bottom-2`}>
                                  {m.role === 'model' && <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-600 shrink-0"><Bot size={14}/></div>}
                                  <div className={`px-4 py-2.5 max-w-[85%] rounded-2xl text-sm leading-relaxed shadow-sm ${
                                      m.role==='user'
                                      ? 'bg-slate-900 text-white rounded-br-none'
                                      : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'
                                  }`}>
                                      {m.text}
                                  </div>
                              </div>
                          ))}
                          {isGenerating && (
                              <div className="flex justify-start animate-in fade-in">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-600 shrink-0"><Bot size={14}/></div>
                                  <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                                     <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                                     </div>
                                  </div>
                              </div>
                          )}
                      </div>
                      <div className="p-4 bg-white border-t border-slate-100">
                          <form onSubmit={(e)=>{e.preventDefault();handleChat(activeTab)}} className="flex gap-2">
                              <input 
                                  value={chatInput} 
                                  onChange={e=>setChatInput(e.target.value)} 
                                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                                  placeholder="Type your reply..."
                              />
                              <Button type="submit" size="md" className={`rounded-xl ${activeTab === 'lead' ? 'bg-blue-600' : 'bg-green-600'} border-0`}>
                                  <Send size={18}/>
                              </Button>
                          </form>
                      </div>
                   </div>
                </div>
             );

          case 'voice':
              return (
                  <div className="h-full flex flex-col animate-in fade-in zoom-in duration-300">
                      <div className="mb-6 text-center">
                          <h2 className="text-2xl font-bold text-slate-900 mb-2">AI Voice Agent</h2>
                          <p className="text-slate-500 text-sm">Experience a live simulated call with our voice AI.</p>
                      </div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center relative bg-slate-900 rounded-3xl overflow-hidden p-8 shadow-2xl">
                          {/* Background Glow */}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent_70%)]"></div>

                          {/* Visualizer */}
                          <div className="relative z-10 mb-8 h-32 flex items-center justify-center gap-1.5">
                              {[...Array(12)].map((_, i) => (
                                  <div 
                                      key={i} 
                                      className={`w-2 bg-blue-500 rounded-full transition-all duration-150 ${isCallActive ? 'animate-pulse' : 'h-2 opacity-30'}`}
                                      style={{ 
                                          height: isCallActive ? `${Math.random() * 60 + 20}px` : '8px',
                                          animationDelay: `${i * 0.05}s`
                                      }}
                                  ></div>
                              ))}
                          </div>

                          {/* Status */}
                          <div className="mb-8 text-center">
                              {isCallActive ? (
                                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-bold animate-pulse">
                                      <div className="w-2 h-2 bg-red-500 rounded-full"></div> Live Call
                                      <span className="ml-2 text-slate-400 font-normal">00:{voiceTranscript.length < 10 ? `0${voiceTranscript.length * 2}` : voiceTranscript.length * 2}</span>
                                  </div>
                              ) : (
                                  <div className="text-slate-400 text-sm">Ready to start</div>
                              )}
                          </div>

                          {/* Controls */}
                          {!isCallActive ? (
                              <button 
                                  onClick={startVoiceSimulation}
                                  className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-green-500/30"
                              >
                                  <Phone size={28} fill="currentColor" />
                              </button>
                          ) : (
                              <button 
                                  onClick={() => setIsCallActive(false)}
                                  className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-red-500/30"
                              >
                                  <Phone size={28} fill="currentColor" className="rotate-[135deg]" />
                              </button>
                          )}

                          {/* Transcript Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md p-4 max-h-[150px] overflow-y-auto border-t border-slate-800">
                              <div className="space-y-3" ref={scrollRef}>
                                  {voiceTranscript.map((line, i) => (
                                      <div key={i} className="text-xs">
                                          <span className={`font-bold ${line.speaker === 'Agent' ? 'text-blue-400' : 'text-slate-400'}`}>{line.speaker}:</span>
                                          <span className="text-slate-300 ml-2">{line.text}</span>
                                      </div>
                                  ))}
                                  {voiceTranscript.length === 0 && <div className="text-center text-slate-600 text-xs italic">Transcript will appear here...</div>}
                              </div>
                          </div>
                      </div>
                  </div>
              );

          case 'media':
              return (
                  <div className="h-full flex flex-col animate-in fade-in zoom-in duration-300">
                      <div className="mb-6">
                          <h2 className="text-2xl font-bold text-slate-900">Generative AI Media</h2>
                          <p className="text-slate-500 text-sm">Create photorealistic real estate visuals instantly.</p>
                      </div>

                      <div className="flex-1 flex flex-col gap-4">
                          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Image Prompt</label>
                              <div className="flex gap-2">
                                  <input 
                                      value={imagePrompt}
                                      onChange={(e) => setImagePrompt(e.target.value)}
                                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                  />
                                  <Button 
                                      onClick={handleGenerateImage} 
                                      disabled={isGenerating}
                                      className="bg-purple-600 hover:bg-purple-700 border-0 text-white rounded-xl"
                                  >
                                      {isGenerating ? <Loader2 size={18} className="animate-spin"/> : <Sparkles size={18} />}
                                  </Button>
                              </div>
                          </div>

                          <div className="flex-1 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 relative overflow-hidden flex items-center justify-center group">
                              {generatedImage ? (
                                  <div className="relative w-full h-full animate-in fade-in zoom-in">
                                      <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
                                      <div className="absolute top-4 right-4 flex gap-2">
                                          <button className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-sm hover:bg-white transition-colors text-slate-700">
                                              <Download size={16} />
                                          </button>
                                          <button className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-sm hover:bg-white transition-colors text-slate-700">
                                              <X size={16} onClick={() => setGeneratedImage(null)} />
                                          </button>
                                      </div>
                                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-xs">
                                          Generated by Imagen 3
                                      </div>
                                  </div>
                              ) : (
                                  <div className="text-center text-slate-400">
                                      {isGenerating ? (
                                          <div className="flex flex-col items-center gap-3">
                                              <Loader2 size={40} className="animate-spin text-purple-500" />
                                              <p className="text-sm font-medium text-slate-500">Dreaming up your image...</p>
                                          </div>
                                      ) : (
                                          <div className="flex flex-col items-center gap-2">
                                              <ImageIcon size={48} className="opacity-20" />
                                              <p>Enter a prompt and hit generate</p>
                                          </div>
                                      )}
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              );

          case 'content':
              return (
                  <div className="h-full flex flex-col animate-in fade-in zoom-in duration-300">
                      <div className="mb-6">
                          <h2 className="text-2xl font-bold text-slate-900">Content Engine</h2>
                          <p className="text-slate-500 text-sm">Auto-generate blogs, emails, and social posts.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Topic</label>
                              <input 
                                  value={contentTopic}
                                  onChange={e => setContentTopic(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                              />
                          </div>
                          <div>
                              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Format</label>
                              <select 
                                  value={contentFormat}
                                  onChange={e => setContentFormat(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                              >
                                  <option>LinkedIn Post</option>
                                  <option>Email Newsletter</option>
                                  <option>Blog Outline</option>
                                  <option>Twitter Thread</option>
                              </select>
                          </div>
                      </div>
                      
                      <Button 
                          onClick={handleGenerateContent}
                          disabled={isGenerating}
                          className="w-full mb-4 bg-slate-900 text-white hover:bg-slate-800 rounded-xl"
                      >
                          {isGenerating ? <Loader2 className="animate-spin mr-2" size={16}/> : <PenTool className="mr-2" size={16}/>}
                          Generate Content
                      </Button>

                      <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 p-4 overflow-y-auto relative">
                          {generatedContent ? (
                              <div className="prose prose-sm prose-slate max-w-none animate-in fade-in slide-in-from-bottom-2 whitespace-pre-wrap">
                                  {generatedContent}
                              </div>
                          ) : (
                              <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
                                  AI output will appear here...
                              </div>
                          )}
                          {generatedContent && (
                              <button className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-500 hover:text-blue-600">
                                  <Copy size={14} />
                              </button>
                          )}
                      </div>
                  </div>
              );

          case 'ads':
                return (
                    <div className="h-full flex flex-col animate-in fade-in zoom-in duration-300">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">Ad Campaign Generator</h2>
                            <p className="text-slate-500 text-sm">Generate high-converting ad copy and visuals in seconds.</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Product / Service</label>
                                <input 
                                    value={adProduct}
                                    onChange={e => setAdProduct(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                                    placeholder="e.g. Luxury Villa"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Target Audience</label>
                                <input 
                                    value={adAudience}
                                    onChange={e => setAdAudience(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                                    placeholder="e.g. Investors"
                                />
                            </div>
                        </div>

                        <Button 
                            onClick={handleAdGen}
                            disabled={isGenerating}
                            className="w-full mb-6 bg-orange-600 hover:bg-orange-700 text-white rounded-xl border-0"
                        >
                            {isGenerating ? <Loader2 className="animate-spin mr-2" size={16}/> : <Megaphone className="mr-2" size={16}/>}
                            Generate Campaign
                        </Button>

                        {adResult && (
                            <div className="flex-1 overflow-y-auto pr-2 animate-in slide-in-from-bottom-4">
                                {/* Preview Card */}
                                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden max-w-sm mx-auto">
                                     <div className="p-3 flex items-center gap-2 border-b border-slate-50">
                                         <div className="w-8 h-8 bg-slate-100 rounded-full"></div>
                                         <div>
                                             <div className="text-xs font-bold text-slate-900">Your Brand</div>
                                             <div className="text-[10px] text-slate-400">Sponsored</div>
                                         </div>
                                     </div>
                                     <div className="p-3">
                                         <h3 className="font-bold text-sm mb-1">{adResult.headline}</h3>
                                         <p className="text-xs text-slate-700 mb-2">{adResult.body}</p>
                                     </div>
                                     <div className="h-48 bg-slate-100 relative">
                                         <img src={adResult.imageUrl} className="w-full h-full object-cover" alt="Ad Visual"/>
                                     </div>
                                     <div className="p-3 bg-slate-50 flex justify-between items-center">
                                         <div className="text-xs font-bold text-slate-700 uppercase">Learn More</div>
                                         <div className="text-[10px] text-slate-400 border border-slate-300 px-2 py-1 rounded bg-white">Sign Up</div>
                                     </div>
                                </div>
                                <div className="mt-4 bg-slate-50 p-3 rounded-xl text-xs text-slate-500 border border-slate-200">
                                    <span className="font-bold">Visual Prompt Used:</span> {adResult.imagePrompt}
                                </div>
                            </div>
                        )}
                    </div>
                )

            case 'instagram':
                return (
                    <div className="h-full flex flex-col animate-in fade-in zoom-in duration-300">
                         <div className="mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">Instagram Automation</h2>
                            <p className="text-slate-500 text-sm">Auto-reply to comments and send DMs instantly.</p>
                        </div>

                        <div className="flex-1 flex gap-6 min-h-0">
                            {/* Phone Mockup */}
                            <div className="w-1/2 bg-slate-900 rounded-[30px] p-3 shadow-2xl border-4 border-slate-800 relative overflow-hidden flex flex-col">
                                <div className="bg-white h-full rounded-[24px] overflow-hidden flex flex-col relative">
                                    {/* Post Image */}
                                    <div className="h-40 bg-slate-200 relative shrink-0">
                                         <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" />
                                    </div>
                                    {/* Comments Section */}
                                    <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50">
                                        {instaFeed.map((item, i) => (
                                            <div key={i} className="text-xs animate-in slide-in-from-bottom-2">
                                                <p>
                                                    <span className="font-bold text-slate-900 mr-1">{item.user}</span>
                                                    <span className="text-slate-700">{item.text}</span>
                                                </p>
                                                {item.reply && (
                                                    <div className="ml-3 mt-1 pl-2 border-l-2 border-slate-200">
                                                        <p className="text-[10px] text-slate-500">
                                                            <span className="font-bold text-slate-700 mr-1">aryantra.ai</span>
                                                            {item.reply}
                                                        </p>
                                                        {item.dmSent && (
                                                            <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded flex items-center gap-1 w-fit mt-1">
                                                                <Send size={8}/> DM Sent
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {/* Input */}
                                    <div className="p-3 border-t border-slate-100 bg-white shrink-0">
                                        <div className="flex gap-2">
                                            <input 
                                                className="flex-1 text-xs bg-slate-100 rounded-full px-3 py-1.5 focus:outline-none"
                                                placeholder="Add a comment..."
                                                value={instaInput}
                                                onChange={e => setInstaInput(e.target.value)}
                                                onKeyDown={e => e.key === 'Enter' && handleInstaPost()}
                                            />
                                            <button onClick={handleInstaPost} className="text-blue-600 font-bold text-xs">Post</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats / Logs */}
                            <div className="flex-1 space-y-4 overflow-y-auto">
                                <div className="bg-pink-50 p-4 rounded-2xl border border-pink-100">
                                    <div className="flex items-center gap-2 text-pink-600 font-bold mb-2">
                                        <Instagram size={16}/> Activity Log
                                    </div>
                                    <div className="space-y-2">
                                         {instaFeed.filter(f => f.dmSent).map((f, i) => (
                                             <div key={i} className="bg-white p-2 rounded-lg border border-pink-100 text-xs text-slate-600 shadow-sm animate-in fade-in">
                                                 Sent DM to <span className="font-bold">{f.user}</span> trigger: "{f.text}"
                                             </div>
                                         ))}
                                         {instaFeed.filter(f => f.dmSent).length === 0 && <p className="text-xs text-slate-400 italic">No automated actions yet.</p>}
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                    <div className="text-xs text-slate-400 uppercase font-bold mb-1">Automations Ran</div>
                                    <div className="text-2xl font-bold text-slate-900">{instaFeed.filter(f => f.dmSent).length}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

          case 'scheduling':
              return (
                  <div className="h-full flex flex-col animate-in fade-in zoom-in duration-300">
                      <div className="mb-6">
                          <h2 className="text-2xl font-bold text-slate-900">Smart Scheduling</h2>
                          <p className="text-slate-500 text-sm">AI coordinates times without the back-and-forth.</p>
                      </div>

                      {bookingStep === 'booked' ? (
                          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in">
                              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                  <CheckCircle size={40} />
                              </div>
                              <h3 className="text-2xl font-bold text-slate-900 mb-2">Meeting Confirmed!</h3>
                              <p className="text-slate-500 mb-8">A calendar invite has been sent to your email.</p>
                              <Button onClick={() => {setBookingStep('select'); setSelectedDate(null)}} variant="outline">Book Another</Button>
                          </div>
                      ) : (
                          <div className="flex-1 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
                              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                                  <span className="font-bold text-slate-700">October 2024</span>
                                  <div className="flex gap-2">
                                      <button className="p-1 hover:bg-slate-200 rounded"><X size={14}/></button>
                                  </div>
                              </div>
                              <div className="p-6 grid grid-cols-3 gap-4">
                                  {['Mon 24', 'Tue 25', 'Wed 26', 'Thu 27', 'Fri 28', 'Sat 29'].map((day, i) => (
                                      <div key={i} className="space-y-2">
                                          <div className="text-xs font-bold text-slate-400 text-center uppercase">{day}</div>
                                          <div className="space-y-2">
                                              {['10:00 AM', '2:00 PM'].map(time => (
                                                  <button
                                                      key={time}
                                                      onClick={() => handleBooking(`${day} ${time}`)}
                                                      className={`w-full py-2 text-xs font-medium rounded-lg border transition-all ${
                                                          selectedDate === `${day} ${time}`
                                                          ? 'bg-blue-600 text-white border-blue-600'
                                                          : 'border-slate-200 hover:border-blue-400 hover:text-blue-600'
                                                      }`}
                                                  >
                                                      {bookingStep === 'confirming' && selectedDate === `${day} ${time}` ? <Loader2 className="animate-spin mx-auto" size={14}/> : time}
                                                  </button>
                                              ))}
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )}
                  </div>
              );

          case 'docs':
              return (
                  <div className="h-full flex flex-col animate-in fade-in zoom-in duration-300">
                      <div className="mb-6">
                          <h2 className="text-2xl font-bold text-slate-900">Document AI</h2>
                          <p className="text-slate-500 text-sm">Extract structured data from PDFs instantly.</p>
                      </div>

                      <div className="flex-1 flex gap-6">
                          {/* Upload Area */}
                          <div 
                              onClick={handleDocAnalysis}
                              className="w-1/3 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all group"
                          >
                              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                  <Upload size={20} className="text-blue-500" />
                              </div>
                              <p className="text-sm font-bold text-slate-700 text-center">Click to Upload</p>
                              <p className="text-xs text-slate-400 text-center mt-1">PDF, DOCX, JPG</p>
                          </div>

                          {/* Results Area */}
                          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                              {isAnalyzing ? (
                                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10">
                                      <Loader2 size={32} className="animate-spin text-blue-600 mb-3" />
                                      <p className="text-sm font-medium text-slate-600">Scanning document...</p>
                                  </div>
                              ) : docResult ? (
                                  <div className="h-full overflow-y-auto animate-in slide-in-from-bottom-4">
                                      <div className="flex items-center justify-between mb-6">
                                          <div className="flex items-center gap-2">
                                              <FileText className="text-blue-600" size={20} />
                                              <span className="font-bold text-slate-900">{docResult.type}</span>
                                          </div>
                                          <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">{docResult.confidence} Confidence</span>
                                      </div>
                                      <div className="space-y-4">
                                          {docResult.extracted.map((item: any, i: number) => (
                                              <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-2">
                                                  <span className="text-sm text-slate-500">{item.label}</span>
                                                  <span className="text-sm font-medium text-slate-900">{item.value}</span>
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              ) : (
                                  <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                                      <FileSearch size={48} className="mb-4" />
                                      <p>Upload a lease or invoice to see extraction.</p>
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              );
            
          case 'maintenance':
              return (
                  <div className="h-full flex flex-col animate-in fade-in zoom-in duration-300">
                       <div className="mb-6">
                          <h2 className="text-2xl font-bold text-slate-900">Maintenance Triage</h2>
                          <p className="text-slate-500 text-sm">AI classifies requests and dispatches vendors.</p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
                          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Tenant Request</label>
                          <textarea 
                              value={maintenanceInput}
                              onChange={e => setMaintenanceInput(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm h-20 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                          />
                          <div className="flex justify-end mt-2">
                              <Button onClick={handleMaintenanceTriage} disabled={isGenerating} size="sm" className="bg-orange-600 hover:bg-orange-700 border-0">
                                  {isGenerating ? <Loader2 size={14} className="animate-spin mr-2"/> : <Wrench size={14} className="mr-2"/>}
                                  Analyze Request
                              </Button>
                          </div>
                      </div>

                      {maintenanceResult && (
                          <div className="flex-1 space-y-4 animate-in slide-in-from-bottom-4">
                              <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                      <div className="text-xs text-slate-400 uppercase font-bold mb-1">Category</div>
                                      <div className="text-lg font-bold text-slate-800">{maintenanceResult.category}</div>
                                  </div>
                                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                      <div className="text-xs text-slate-400 uppercase font-bold mb-1">Urgency</div>
                                      <div className={`text-lg font-bold ${maintenanceResult.urgency === 'High' ? 'text-red-600' : 'text-yellow-600'}`}>{maintenanceResult.urgency}</div>
                                  </div>
                              </div>
                              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                                  <div className="flex gap-2 items-center mb-2 text-blue-700 font-bold text-sm">
                                      <Bot size={16} /> AI Auto-Reply
                                  </div>
                                  <p className="text-sm text-slate-700 leading-relaxed italic">"{maintenanceResult.reply_text}"</p>
                              </div>
                          </div>
                      )}
                  </div>
              );

          case 'market':
              return (
                   <div className="h-full flex flex-col animate-in fade-in zoom-in duration-300">
                       <div className="mb-6">
                          <h2 className="text-2xl font-bold text-slate-900">Market Intelligence</h2>
                          <p className="text-slate-500 text-sm">Instant valuation and trend analysis.</p>
                      </div>

                      <div className="flex gap-2 mb-6">
                          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl flex items-center px-3">
                              <Search size={18} className="text-slate-400 mr-2" />
                              <input 
                                  value={marketInput}
                                  onChange={e => setMarketInput(e.target.value)}
                                  className="bg-transparent w-full py-3 text-sm focus:outline-none"
                                  placeholder="Enter location..."
                              />
                          </div>
                          <Button onClick={handleMarketAnalysis} disabled={isGenerating} className="bg-slate-900 rounded-xl">
                              {isGenerating ? <Loader2 size={18} className="animate-spin"/> : "Analyze"}
                          </Button>
                      </div>

                      {marketResult && (
                          <div className="flex-1 animate-in slide-in-from-bottom-4">
                              <div className="grid grid-cols-3 gap-3 mb-6">
                                  <div className="bg-slate-900 text-white p-4 rounded-2xl text-center">
                                      <div className="text-xs opacity-70 mb-1">Avg Price</div>
                                      <div className="font-bold text-lg">{marketResult.price}</div>
                                  </div>
                                  <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-2xl text-center">
                                      <div className="text-xs opacity-70 mb-1">Trend</div>
                                      <div className="font-bold text-lg flex justify-center items-center gap-1"><TrendingUp size={14}/> {marketResult.trend}</div>
                                  </div>
                                  <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center">
                                      <div className="text-xs text-slate-500 mb-1">Days on Market</div>
                                      <div className="font-bold text-lg text-slate-900">{marketResult.dom}</div>
                                  </div>
                              </div>
                              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                  <h4 className="font-bold text-slate-900 mb-2 text-sm">AI Summary</h4>
                                  <p className="text-sm text-slate-600 leading-relaxed">{marketResult.summary}</p>
                              </div>
                          </div>
                      )}
                   </div>
              );

          default: return null;
      }
  }

  return (
    <div className="w-full py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
           <div className="inline-block mb-4">
             <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">The Platform</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-6">One OS for Everything.</h1>
          <p className="text-xl text-slate-500">From generating leads to closing deals, Aryantra automates the entire lifecycle.</p>
        </div>

        {/* Interactive Demo Hub */}
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-200 overflow-hidden min-h-[700px] flex flex-col md:flex-row animate-slide-up">
          
          {/* Sidebar */}
          <div className="w-full md:w-72 bg-slate-50 border-r border-slate-200 p-4 flex flex-col gap-2 overflow-y-auto max-h-[700px]">
            <div className="p-4 mb-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Modules</h3>
            </div>
            {servicesList.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id as any)}
                className={`text-left px-4 py-4 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                  activeTab === s.id 
                    ? 'bg-white text-blue-600 shadow-md shadow-slate-100 ring-1 ring-slate-200' 
                    : 'text-slate-500 hover:bg-white/50 hover:text-slate-900'
                }`}
              >
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${activeTab === s.id ? 'bg-blue-100' : 'bg-slate-200/50'}`}>
                  <s.icon size={16} strokeWidth={2} />
                </div>
                <div>
                  <div className="font-bold text-sm">{s.title}</div>
                  <div className="text-[10px] opacity-70 hidden md:block">{s.desc}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Main Demo Area */}
          <div className="flex-1 p-6 md:p-10 bg-white relative overflow-hidden">
             {renderDemoContent()}
          </div>
        </div>

        {/* Custom Workflow Banner - ADDED PER REQUEST */}
        <div className="mt-20 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-2xl shadow-slate-200/50 animate-slide-up stagger-1">
           <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none"></div>
           <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
                  <Puzzle size={12} /> Custom Solutions
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Don't see what you need?</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                 Every business is unique. Aryantra specializes in building <strong>custom autonomous workflows</strong> tailored specifically to your operational needs. If you can map it, we can automate it.
              </p>
              <Button className="bg-white text-slate-900 hover:bg-slate-100 border-0">
                 Request Custom Workflow
              </Button>
           </div>
        </div>

        {/* EXPANDED FEATURE GRID */}
        <div className="mt-32 mb-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">The Complete Automation OS</h2>
                <p className="text-slate-500 text-lg max-w-3xl mx-auto">Aryantra integrates every aspect of your business. If it's digital, we can automate it.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4"><DollarSign size={20}/></div>
                    <h3 className="font-bold text-slate-900 mb-3">Sales Automation</h3>
                    <ul className="space-y-2 text-sm text-slate-500">
                      <li>• Lead Scoring</li>
                      <li>• CRM Data Entry</li>
                      <li>• Follow-up Drips</li>
                      <li>• Contract Generation</li>
                      <li>• Pipeline Analytics</li>
                    </ul>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center mb-4"><Megaphone size={20}/></div>
                    <h3 className="font-bold text-slate-900 mb-3">Marketing</h3>
                    <ul className="space-y-2 text-sm text-slate-500">
                      <li>• Ad Creative Gen</li>
                      <li>• Social Scheduling</li>
                      <li>• SEO Blog Writing</li>
                      <li>• Email Newsletters</li>
                      <li>• Review Management</li>
                    </ul>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4"><MessageCircle size={20}/></div>
                    <h3 className="font-bold text-slate-900 mb-3">Support (CS)</h3>
                    <ul className="space-y-2 text-sm text-slate-500">
                      <li>• 24/7 Chatbot</li>
                      <li>• Ticket Routing</li>
                      <li>• Refund Processing</li>
                      <li>• Knowledge Base</li>
                      <li>• Multilingual AI</li>
                    </ul>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-4"><Briefcase size={20}/></div>
                    <h3 className="font-bold text-slate-900 mb-3">Operations</h3>
                    <ul className="space-y-2 text-sm text-slate-500">
                      <li>• Invoice Processing</li>
                      <li>• Employee Onboarding</li>
                      <li>• Vendor Management</li>
                      <li>• Inventory Sync</li>
                      <li>• Compliance Checks</li>
                    </ul>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4"><Database size={20}/></div>
                    <h3 className="font-bold text-slate-900 mb-3">IT & Data</h3>
                    <ul className="space-y-2 text-sm text-slate-500">
                      <li>• Report Generation</li>
                      <li>• Data Cleaning</li>
                      <li>• API Connections</li>
                      <li>• Security Alerts</li>
                    </ul>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-cyan-50 text-cyan-600 rounded-lg flex items-center justify-center mb-4"><Users size={20}/></div>
                    <h3 className="font-bold text-slate-900 mb-3">HR & Recruiting</h3>
                    <ul className="space-y-2 text-sm text-slate-500">
                      <li>• Resume Screening</li>
                      <li>• Interview Scheduling</li>
                      <li>• Policy Q&A Bot</li>
                      <li>• Payroll Reminders</li>
                    </ul>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mb-4"><Shield size={20}/></div>
                    <h3 className="font-bold text-slate-900 mb-3">Legal & Admin</h3>
                    <ul className="space-y-2 text-sm text-slate-500">
                      <li>• Document Analysis</li>
                      <li>• NDA Generation</li>
                      <li>• Compliance Audits</li>
                      <li>• Meeting Summaries</li>
                    </ul>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4"><Sparkles size={20}/></div>
                    <h3 className="font-bold text-slate-900 mb-3">Creative Studio</h3>
                    <ul className="space-y-2 text-sm text-slate-500">
                      <li>• Video Editing AI</li>
                      <li>• Image Generation</li>
                      <li>• Copywriting</li>
                      <li>• Presentation AI</li>
                    </ul>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
