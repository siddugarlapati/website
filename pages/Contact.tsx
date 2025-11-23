
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Mail, MapPin, Phone, ArrowRight, Globe, Calendar, Video, Users, CheckCircle2, Loader2, Building } from 'lucide-react';
import { api } from '../utils/api';

export const Contact: React.FC = () => {
  const [meetingType, setMeetingType] = useState<'Online' | 'Offline'>('Online');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [meetLink, setMeetLink] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    date: '',
    time: '',
    location: '' // Only for Offline
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to backend API
      const response = await api.createBooking({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        company: formData.company,
        type: meetingType,
        date: formData.date || new Date().toISOString().split('T')[0],
        time: formData.time || '10:00',
        location: meetingType === 'Offline' ? formData.location : undefined,
      });

      if (response.data?.meetLink) {
        setMeetLink(response.data.meetLink);
      }
      setIsSuccess(true);
    } catch (error) {
      console.error("Booking failed", error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-32 pb-20 px-6 overflow-hidden relative min-h-screen bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Info Column */}
          <div className="animate-in slide-in-from-left-8 fade-in duration-700 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-xs font-bold tracking-wide uppercase text-blue-600">Production Ready</span>
            </div>
            <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-6">Let's Automate Your Workflow.</h1>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed">
              Schedule a personalized consultation. We'll map your current processes and identify high-impact automation opportunities.
            </p>

            <div className="space-y-6 relative z-10">
              <button 
                onClick={() => setMeetingType('Online')}
                className={`w-full text-left flex items-start gap-4 p-6 rounded-2xl border transition-all duration-300 ${meetingType === 'Online' ? 'bg-blue-50 border-blue-200 shadow-md' : 'bg-white border-slate-100 hover:border-slate-300'}`}
              >
                 <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${meetingType === 'Online' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <Video size={24} />
                 </div>
                 <div>
                    <h3 className={`text-lg font-bold ${meetingType === 'Online' ? 'text-blue-900' : 'text-slate-900'}`}>Online Demo</h3>
                    <p className="text-slate-500 text-sm mt-1">Instant video meeting link. Screen sharing & dashboard walkthrough.</p>
                 </div>
                 {meetingType === 'Online' && <div className="ml-auto bg-blue-600 text-white p-1 rounded-full"><CheckCircle2 size={16}/></div>}
              </button>

              <button 
                onClick={() => setMeetingType('Offline')}
                className={`w-full text-left flex items-start gap-4 p-6 rounded-2xl border transition-all duration-300 ${meetingType === 'Offline' ? 'bg-blue-50 border-blue-200 shadow-md' : 'bg-white border-slate-100 hover:border-slate-300'}`}
              >
                 <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${meetingType === 'Offline' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <Building size={24} />
                 </div>
                 <div>
                    <h3 className={`text-lg font-bold ${meetingType === 'Offline' ? 'text-blue-900' : 'text-slate-900'}`}>Offline Meeting</h3>
                    <p className="text-slate-500 text-sm mt-1">We visit your office . In-depth workflow audit.</p>
                 </div>
                 {meetingType === 'Offline' && <div className="ml-auto bg-slate-900 text-white p-1 rounded-full"><CheckCircle2 size={16}/></div>}
              </button>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50 animate-in slide-in-from-right-8 fade-in duration-700 delay-200 relative overflow-hidden">
            
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-in zoom-in">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Booking Confirmed!</h2>
                <p className="text-slate-500 mb-8 max-w-md">
                  Your request has been securely saved. 
                  {meetingType === 'Online' ? " Check your email for the calendar invite." : " Our team will contact you shortly to confirm the venue."}
                </p>
                
                {meetingType === 'Online' && meetLink && (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 w-full mb-8 text-left">
                    <div className="flex items-center gap-2 mb-2">
                       <Video size={16} className="text-blue-600"/>
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Meeting Link Generated</span>
                    </div>
                    <a href={`https://${meetLink}`} target="_blank" className="text-blue-600 font-bold text-lg underline truncate block hover:text-blue-700 transition-colors">{meetLink}</a>
                    <div className="mt-2 text-xs text-slate-400">Copy this link or check your Admin dashboard.</div>
                  </div>
                )}

                <Button onClick={() => {setIsSuccess(false); setFormData({...formData, date: ''})}} variant="outline">Book Another Session</Button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                   <h2 className="text-2xl font-bold text-slate-900">
                      {meetingType === 'Online' ? 'Schedule Online Demo' : 'Request On-Site Visit'}
                   </h2>
                   <p className="text-sm text-slate-500 mt-1">Fill in your details to secure a slot.</p>
                </div>

                <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">First Name</label>
                      <input required value={formData.firstName} onChange={e=>setFormData({...formData, firstName: e.target.value})} type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Last Name</label>
                      <input required value={formData.lastName} onChange={e=>setFormData({...formData, lastName: e.target.value})} type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Work Email</label>
                    <input required value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="jane@company.com" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Company Name</label>
                    <input required value={formData.company} onChange={e=>setFormData({...formData, company: e.target.value})} type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Acme Corp" />
                  </div>

                  {/* Dynamic Fields based on Online/Offline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Preferred Date</label>
                        <input required value={formData.date} onChange={e=>setFormData({...formData, date: e.target.value})} type="date" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Preferred Time</label>
                        <input required value={formData.time} onChange={e=>setFormData({...formData, time: e.target.value})} type="time" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                      </div>
                  </div>

                  {meetingType === 'Offline' && (
                     <div className="space-y-2 animate-in slide-in-from-top-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Office Location</label>
                        <div className="relative">
                           <MapPin className="absolute left-4 top-3.5 text-slate-400" size={18}/>
                           <input required value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} type="text" className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="e.g. Hitech City, Hyderabad" />
                        </div>
                     </div>
                  )}

                  <Button disabled={isSubmitting} fullWidth size="lg" className="rounded-xl mt-4 group bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10">
                    {isSubmitting ? <Loader2 className="animate-spin"/> : <>{meetingType === 'Online' ? 'Generate Meeting Link' : 'Confirm Visit'} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></>}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
