
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Calendar, Mail, Briefcase, Settings, Bell, Search, ChevronDown, Plus, CheckCircle2, AlertCircle, Clock, BarChart3, LogOut, MapPin, Video, Shield, Database, CloudLightning } from 'lucide-react';
import { Button } from '../components/Button';
import { db, Booking, Application, Client } from '../utils/db';

interface AdminProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const Admin: React.FC<AdminProps> = ({ onNavigate, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Real Data States
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New Client Form State
  const [showClientForm, setShowClientForm] = useState(false);
  const [newClient, setNewClient] = useState({ username: '', password: '', name: '', company: '', project: '', status: 'Active' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const b = await db.getBookings();
    const a = await db.getApplications();
    const c = await db.getClients();
    setBookings(b);
    setApplications(a);
    setClients(c);
    setIsLoading(false);
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.createClient({
        ...newClient,
        status: 'Active',
        renewalDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()
    });
    setShowClientForm(false);
    loadData();
  };

  const pendingDemos = bookings.filter(b => b.status === 'Pending').length;
  const totalRevenue = "$242k"; 

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
       
       {/* Sidebar */}
       <div className="w-64 bg-[#0B0F19] text-white flex flex-col">
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold shadow-lg shadow-blue-900/50">A</div>
             <span className="font-bold text-lg">Aryantra Admin</span>
          </div>
          
          <div className="flex-1 py-6 space-y-1 px-3">
             {[
               { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
               { id: 'crm', icon: Users, label: 'Bookings & CRM' },
               { id: 'hr', icon: Mail, label: 'Recruitment' },
               { id: 'clients', icon: Shield, label: 'Client Access' },
             ].map((item) => (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id)}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                   activeTab === item.id ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                 }`}
               >
                 <item.icon size={18} />
                 {item.label}
               </button>
             ))}
          </div>

          <div className="px-4 pb-4">
             <div className={`rounded-xl p-3 flex items-center gap-3 border ${db.isLive ? 'bg-green-900/20 border-green-800' : 'bg-slate-800 border-slate-700'}`}>
                {db.isLive ? <CloudLightning size={16} className="text-green-400"/> : <Database size={16} className="text-slate-400"/>}
                <div>
                    <div className={`text-xs font-bold ${db.isLive ? 'text-green-400' : 'text-slate-300'}`}>
                        {db.isLive ? 'Live Database' : 'Demo Mode'}
                    </div>
                    <div className="text-[10px] text-slate-500">
                        {db.isLive ? 'Supabase Connected' : 'Local Storage'}
                    </div>
                </div>
             </div>
          </div>

          <div className="p-4 border-t border-slate-800">
             <button onClick={onLogout} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm px-4 py-2 w-full rounded-lg hover:bg-slate-800 transition-colors">
                <LogOut size={16} /> Sign Out
             </button>
          </div>
       </div>

       {/* Main Content */}
       <div className="flex-1 flex flex-col overflow-hidden relative">
          
          {/* Topbar */}
          <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
             <h2 className="text-xl font-bold text-slate-800 capitalize">{activeTab === 'hr' ? 'Recruitment' : activeTab}</h2>
             <div className="flex items-center gap-6">
                <button className="relative text-slate-500 hover:text-slate-900">
                   <Bell size={20} />
                   {pendingDemos > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
                </button>
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-md">AD</div>
                   <span className="text-sm font-bold text-slate-700">Admin</span>
                </div>
             </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
             
             {/* OVERVIEW TAB */}
             {activeTab === 'overview' && (
               <div className="space-y-8 animate-in fade-in duration-500">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                           <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users size={20}/></div>
                           <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Live</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{bookings.length}</div>
                        <div className="text-xs text-slate-500">Total Inquiries</div>
                     </div>
                     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                           <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><AlertCircle size={20}/></div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{pendingDemos}</div>
                        <div className="text-xs text-slate-500">Pending Actions</div>
                     </div>
                     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                           <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Briefcase size={20}/></div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{applications.length}</div>
                        <div className="text-xs text-slate-500">Candidates</div>
                     </div>
                     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                           <div className="p-2 bg-green-50 text-green-600 rounded-lg"><BarChart3 size={20}/></div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{totalRevenue}</div>
                        <div className="text-xs text-slate-500">Active Contract Value</div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                     {/* Live DB Bookings */}
                     <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h3 className="font-bold text-slate-800 mb-6 text-lg">Recent Activity Feed</h3>
                        <div className="overflow-x-auto">
                           <table className="w-full text-sm text-left">
                              <thead className="text-xs text-slate-400 uppercase border-b border-slate-100">
                                 <tr>
                                    <th className="pb-3 font-medium">Client</th>
                                    <th className="pb-3 font-medium">Interaction Type</th>
                                    <th className="pb-3 font-medium">Location / Link</th>
                                    <th className="pb-3 font-medium">Status</th>
                                    <th className="pb-3 font-medium text-right">Time</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                 {bookings.map((b) => (
                                    <tr key={b.id} className="group hover:bg-slate-50 transition-colors">
                                       <td className="py-3 font-medium text-slate-800">
                                          {b.name} 
                                          <span className="block text-xs text-slate-400 font-normal">{b.company}</span>
                                       </td>
                                       <td className="py-3">
                                          <span className={`flex items-center gap-2 font-medium ${b.type === 'Online' ? 'text-blue-600' : 'text-slate-700'}`}>
                                             {b.type === 'Online' ? <Video size={14}/> : <MapPin size={14}/>} {b.type} Demo
                                          </span>
                                       </td>
                                       <td className="py-3 text-xs text-slate-500 max-w-xs truncate font-mono bg-slate-50 p-1 rounded">
                                          {b.type === 'Online' ? b.meetLink : b.location}
                                       </td>
                                       <td className="py-3">
                                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                             b.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 
                                             b.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                                             'bg-slate-100 text-slate-600'
                                          }`}>{b.status}</span>
                                       </td>
                                       <td className="py-3 text-right text-slate-500">
                                          {b.date} <span className="text-xs opacity-70">{b.time}</span>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                           {bookings.length === 0 && <div className="p-4 text-center text-slate-400">No activity recorded yet.</div>}
                        </div>
                     </div>
                  </div>
               </div>
             )}

             {/* RECRUITMENT TAB */}
             {activeTab === 'hr' && (
                <div className="animate-in fade-in duration-500">
                   <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold text-slate-900">Talent Pipeline</h2>
                      <div className="flex gap-2">
                         <Button size="sm" variant="outline">Export CSV</Button>
                      </div>
                   </div>
                   <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      <table className="w-full text-sm text-left">
                         <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                            <tr>
                               <th className="p-4">Candidate</th>
                               <th className="p-4">Role</th>
                               <th className="p-4">Experience</th>
                               <th className="p-4">CV</th>
                               <th className="p-4">Status</th>
                               <th className="p-4 text-right">Applied</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {applications.map((app) => (
                               <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                                  <td className="p-4 font-bold text-slate-800">
                                     {app.name}
                                     <span className="block text-xs text-slate-400 font-normal">{app.email}</span>
                                  </td>
                                  <td className="p-4 text-slate-600">{app.role}</td>
                                  <td className="p-4 text-slate-500">{app.experience}</td>
                                  <td className="p-4">
                                     {app.cvName ? <span className="text-blue-600 underline cursor-pointer text-xs">{app.cvName}</span> : <span className="text-slate-300 italic">No file</span>}
                                  </td>
                                  <td className="p-4">
                                     <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                        app.status === 'New' ? 'bg-blue-50 text-blue-600' : 
                                        app.status === 'Shortlisted' ? 'bg-green-50 text-green-600' : 
                                        'bg-slate-100 text-slate-500'
                                     }`}>{app.status}</span>
                                  </td>
                                  <td className="p-4 text-right text-slate-400 text-xs">
                                     {new Date(app.appliedAt).toLocaleDateString()}
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                      {applications.length === 0 && (
                         <div className="p-12 text-center text-slate-400 flex flex-col items-center">
                            <Users size={48} className="mb-4 opacity-20" />
                            <p>No active applications.</p>
                         </div>
                      )}
                   </div>
                </div>
             )}

             {/* CLIENT ACCESS TAB */}
             {activeTab === 'clients' && (
                <div className="animate-in fade-in duration-500">
                   <div className="flex justify-between items-center mb-8">
                      <div>
                         <h2 className="text-2xl font-bold text-slate-900">Client Portals</h2>
                         <p className="text-slate-500 text-sm">Manage access for closed deals.</p>
                      </div>
                      <Button onClick={() => setShowClientForm(true)} className="bg-slate-900 text-white">
                         <Plus size={16} className="mr-2"/> Create Access
                      </Button>
                   </div>

                   {/* New Client Modal Mock */}
                   {showClientForm && (
                      <div className="mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-lg animate-in slide-in-from-top-4">
                         <h3 className="font-bold text-slate-900 mb-4">Grant New Client Access</h3>
                         <form onSubmit={handleCreateClient} className="grid grid-cols-2 gap-4">
                            <input placeholder="Company Name" required className="p-3 bg-slate-50 rounded-xl border border-slate-200" onChange={e => setNewClient({...newClient, company: e.target.value})} />
                            <input placeholder="Contact Person" required className="p-3 bg-slate-50 rounded-xl border border-slate-200" onChange={e => setNewClient({...newClient, name: e.target.value})} />
                            <input placeholder="Project Name" required className="p-3 bg-slate-50 rounded-xl border border-slate-200" onChange={e => setNewClient({...newClient, project: e.target.value})} />
                            <div className="col-span-2 grid grid-cols-2 gap-4">
                               <input placeholder="Username" required className="p-3 bg-slate-50 rounded-xl border border-slate-200" onChange={e => setNewClient({...newClient, username: e.target.value})} />
                               <input placeholder="Password" required className="p-3 bg-slate-50 rounded-xl border border-slate-200" onChange={e => setNewClient({...newClient, password: e.target.value})} />
                            </div>
                            <div className="col-span-2 flex justify-end gap-2 mt-2">
                               <Button type="button" variant="outline" onClick={() => setShowClientForm(false)}>Cancel</Button>
                               <Button type="submit" className="bg-green-600 text-white hover:bg-green-700 border-0">Generate Credentials</Button>
                            </div>
                         </form>
                      </div>
                   )}

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {clients.map((client) => (
                         <div key={client.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-4">
                               <div className="h-10 w-10 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                                  {client.company.charAt(0)}
                               </div>
                               <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-bold border border-green-100">Active</span>
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg">{client.company}</h3>
                            <p className="text-sm text-slate-500 mb-4">{client.project}</p>
                            
                            <div className="bg-slate-50 p-3 rounded-xl mb-4 border border-slate-100">
                               <div className="text-xs text-slate-400 uppercase font-bold mb-1">Credentials</div>
                               <div className="flex justify-between text-sm">
                                  <span className="font-mono text-slate-600">User: {client.username}</span>
                               </div>
                               <div className="flex justify-between text-sm">
                                  <span className="font-mono text-slate-600">Pass: ••••••••</span>
                               </div>
                            </div>

                            <div className="text-xs text-slate-400 text-center border-t border-slate-50 pt-3">
                               Renewal: {client.renewalDate}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             )}

             {/* CRM TAB - (Reuse Overview) */}
             {activeTab === 'crm' && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 animate-in fade-in">
                   <h2 className="text-2xl font-bold text-slate-900 mb-4">Global Booking Registry</h2>
                   <p className="text-slate-500 mb-6">Historical view of all interactions.</p>
                   {/* Simple list view for now */}
                   {bookings.length > 0 ? (
                      <div className="space-y-3">
                         {bookings.map(b => (
                            <div key={b.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50 flex justify-between items-center hover:bg-white hover:shadow-sm transition-all">
                               <div>
                                  <div className="font-bold text-slate-800">{b.name}</div>
                                  <div className="text-sm text-slate-500">{b.company} • {b.email}</div>
                               </div>
                               <div className="text-right">
                                  <div className="font-bold text-slate-700 text-sm">{b.type}</div>
                                  <div className="text-xs text-slate-400">{new Date(b.createdAt).toLocaleDateString()}</div>
                               </div>
                            </div>
                         ))}
                      </div>
                   ) : (
                      <div className="text-slate-400 italic">No records found.</div>
                   )}
                </div>
             )}
             
          </div>
       </div>
    </div>
  );
}