
import React, { useState } from 'react';
import { Briefcase, UploadCloud, CheckCircle2, Search, MapPin, User, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { db } from '../utils/db';

export const Careers: React.FC = () => {
  const [applicationSent, setApplicationSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    field: 'Engineering',
    experience: '0-2 years',
    cv: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await db.submitApplication({
      name: formData.name,
      email: formData.email,
      role: formData.field,
      experience: formData.experience,
      cvName: formData.cv ? formData.cv.name : undefined
    });
    
    setIsSubmitting(false);
    setApplicationSent(true);
  };

  return (
    <div className="w-full pt-32 pb-20 px-6 overflow-hidden min-h-screen bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-20 animate-slide-up">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-wider mb-6">
              <Briefcase size={12} /> Join Aryantra
           </div>
           <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight mb-6">
              Do your life's best work.
           </h1>
           <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              We are building the autonomous workforce of the future. Join a team of visionaries, engineers, and problem solvers.
           </p>
        </div>

        {/* General Application Form */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-slide-up stagger-2 relative">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
           
           {applicationSent ? (
             <div className="p-20 flex flex-col items-center justify-center text-center animate-in zoom-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                   <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Received!</h2>
                <p className="text-slate-500 mb-8 max-w-md">
                   Thank you for your interest. Our HR team has received your profile in our secure database. We will contact you if a suitable role opens up.
                </p>
                <Button onClick={() => setApplicationSent(false)} variant="outline">Submit Another</Button>
             </div>
           ) : (
             <div className="p-8 md:p-12">
                <div className="mb-10">
                   <h2 className="text-2xl font-bold text-slate-900 mb-2">Talent Network Application</h2>
                   <p className="text-slate-500 text-sm">Tell us about yourself and where you fit in.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-700">Full Name</label>
                         <input 
                           required
                           value={formData.name}
                           onChange={e => setFormData({...formData, name: e.target.value})}
                           className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                           placeholder="John Doe"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-700">Email Address</label>
                         <input 
                           required
                           type="email"
                           value={formData.email}
                           onChange={e => setFormData({...formData, email: e.target.value})}
                           className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                           placeholder="john@example.com"
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-700">Field of Interest</label>
                         <select 
                           className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                           value={formData.field}
                           onChange={e => setFormData({...formData, field: e.target.value})}
                         >
                            <option>Engineering (Frontend/Backend)</option>
                            <option>AI / Machine Learning</option>
                            <option>Sales & Marketing</option>
                            <option>Product Management</option>
                            <option>Design (UI/UX)</option>
                            <option>Operations</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-700">Experience Level</label>
                         <select 
                           className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                           value={formData.experience}
                           onChange={e => setFormData({...formData, experience: e.target.value})}
                         >
                            <option>Student / Intern</option>
                            <option>0-2 years</option>
                            <option>3-5 years</option>
                            <option>5+ years</option>
                            <option>Executive</option>
                         </select>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Upload CV / Resume</label>
                      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer relative group">
                         <input 
                           type="file" 
                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                           onChange={(e) => setFormData({...formData, cv: e.target.files ? e.target.files[0] : null})}
                         />
                         <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                               <UploadCloud size={24} />
                            </div>
                            {formData.cv ? (
                               <p className="font-medium text-purple-600">{formData.cv.name}</p>
                            ) : (
                               <>
                                 <p className="font-medium text-slate-900">Click to upload or drag and drop</p>
                                 <p className="text-xs text-slate-500">PDF, DOCX (Max 5MB)</p>
                               </>
                            )}
                         </div>
                      </div>
                   </div>

                   <div className="pt-4">
                      <Button disabled={isSubmitting} size="xl" className="w-full bg-slate-900 text-white hover:bg-slate-800 border-0 rounded-xl shadow-lg shadow-slate-900/20">
                         {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Application"}
                      </Button>
                   </div>

                </form>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
