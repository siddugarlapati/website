import React, { useState } from 'react';
import { 
  LayoutDashboard, FileText, CreditCard, Settings, LogOut, Download, 
  CheckCircle, Activity, TrendingUp, Users, MessageSquare, Bell,
  Calendar, Clock, DollarSign, BarChart3, Zap, Shield, Eye, Edit,
  Send, Paperclip, Search, Filter, ChevronRight, AlertCircle, CheckCircle2
} from 'lucide-react';
import { Button } from '../components/Button';

interface ClientPortalProps {
  client: any;
  onLogout: () => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({ client, onLogout }) => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'analytics' | 'documents' | 'invoices' | 'support' | 'settings'>('dashboard');
  const [supportMessage, setSupportMessage] = useState('');
  const [notifications, setNotifications] = useState(3);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'invoices', label: 'Invoices', icon: CreditCard },
    { id: 'support', label: 'Support', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Mock data
  const analytics = {
    totalLeads: 1247,
    conversions: 342,
    responseTime: '2.3 min',
    satisfaction: '98%'
  };

  const documents = [
    { id: 1, name: 'Service Level Agreement (SLA)', date: 'Oct 20, 2024', type: 'Contract', status: 'Signed' },
    { id: 2, name: 'Project Proposal - Phase 2', date: 'Nov 15, 2024', type: 'Proposal', status: 'Pending' },
    { id: 3, name: 'Monthly Report - October', date: 'Nov 1, 2024', type: 'Report', status: 'Delivered' },
    { id: 4, name: 'API Documentation v2.1', date: 'Oct 28, 2024', type: 'Technical', status: 'Active' },
  ];

  const invoices = [
    { id: 'INV-2024-001', amount: '$5,000', date: 'Oct 22, 2024', status: 'Paid', dueDate: 'Oct 22, 2024' },
    { id: 'INV-2024-002', amount: '$5,000', date: 'Nov 22, 2024', status: 'Pending', dueDate: 'Dec 7, 2024' },
    { id: 'INV-2023-012', amount: '$4,500', date: 'Sep 22, 2024', status: 'Paid', dueDate: 'Sep 22, 2024' },
  ];

  const supportTickets = [
    { id: 'TKT-001', subject: 'API Rate Limit Question', status: 'Open', date: 'Nov 20, 2024', priority: 'Medium' },
    { id: 'TKT-002', subject: 'Dashboard Loading Slow', status: 'In Progress', date: 'Nov 18, 2024', priority: 'High' },
    { id: 'TKT-003', subject: 'Feature Request: Export Data', status: 'Closed', date: 'Nov 10, 2024', priority: 'Low' },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">1,247</div>
          <div className="text-sm text-slate-500">Total Leads</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+8%</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">342</div>
          <div className="text-sm text-slate-500">Conversions</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Clock className="text-purple-600" size={24} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">-15%</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">2.3 min</div>
          <div className="text-sm text-slate-500">Avg Response Time</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Users className="text-orange-600" size={24} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+5%</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">98%</div>
          <div className="text-sm text-slate-500">Satisfaction Rate</div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 text-lg">Current Project</h3>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              {client.status}
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm text-slate-500 mb-1">Project Name</div>
              <div className="text-lg font-bold text-slate-900">{client.project}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-slate-500 mb-1">Start Date</div>
                <div className="font-semibold text-slate-900">Jan 15, 2024</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Next Renewal</div>
                <div className="font-semibold text-slate-900">{client.renewalDate}</div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-500">Project Progress</span>
                <span className="font-bold text-slate-900">78%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield size={24} />
            </div>
            <div>
              <div className="text-sm opacity-90">System Status</div>
              <div className="font-bold text-lg">All Systems Go</div>
            </div>
          </div>
          
          <div className="space-y-3 mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-90">API Uptime</span>
              <span className="font-bold">99.98%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-90">Response Time</span>
              <span className="font-bold">45ms</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-90">Last Incident</span>
              <span className="font-bold">None</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Activity size={20} className="text-blue-600" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {[
            { action: 'New lead captured', time: '2 hours ago', icon: Users, color: 'blue' },
            { action: 'Invoice #INV-2024-002 generated', time: '1 day ago', icon: CreditCard, color: 'green' },
            { action: 'Support ticket resolved', time: '2 days ago', icon: CheckCircle, color: 'purple' },
            { action: 'Monthly report delivered', time: '5 days ago', icon: FileText, color: 'orange' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className={`w-10 h-10 bg-${item.color}-100 rounded-lg flex items-center justify-center shrink-0`}>
                <item.icon className={`text-${item.color}-600`} size={18} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-900 text-sm">{item.action}</div>
                <div className="text-xs text-slate-500">{item.time}</div>
              </div>
              <ChevronRight size={16} className="text-slate-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6 text-lg">Performance Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
            <div className="text-sm text-slate-600">Total Leads Processed</div>
            <div className="text-xs text-green-600 font-semibold mt-1">↑ 12% from last month</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">27.4%</div>
            <div className="text-sm text-slate-600">Conversion Rate</div>
            <div className="text-xs text-green-600 font-semibold mt-1">↑ 3.2% improvement</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">$142K</div>
            <div className="text-sm text-slate-600">Revenue Generated</div>
            <div className="text-xs text-green-600 font-semibold mt-1">↑ 18% growth</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <div className="text-3xl font-bold text-orange-600 mb-2">4.8/5</div>
            <div className="text-sm text-slate-600">Customer Rating</div>
            <div className="text-xs text-green-600 font-semibold mt-1">↑ 0.3 points</div>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
          <div className="text-center">
            <BarChart3 size={48} className="text-slate-400 mx-auto mb-3" />
            <div className="text-slate-600 font-medium">Performance Chart</div>
            <div className="text-sm text-slate-400">Detailed analytics visualization</div>
          </div>
        </div>
      </div>

      {/* AI Agent Performance */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Zap size={20} className="text-yellow-500" />
          AI Agent Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-slate-200 rounded-xl">
            <div className="text-sm text-slate-500 mb-2">Messages Handled</div>
            <div className="text-2xl font-bold text-slate-900">8,432</div>
            <div className="text-xs text-slate-400 mt-1">This month</div>
          </div>
          <div className="p-4 border border-slate-200 rounded-xl">
            <div className="text-sm text-slate-500 mb-2">Avg Response Time</div>
            <div className="text-2xl font-bold text-slate-900">2.3s</div>
            <div className="text-xs text-green-600 mt-1">15% faster</div>
          </div>
          <div className="p-4 border border-slate-200 rounded-xl">
            <div className="text-sm text-slate-500 mb-2">Satisfaction Score</div>
            <div className="text-2xl font-bold text-slate-900">98%</div>
            <div className="text-xs text-green-600 mt-1">+2% increase</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-900 text-lg">Documents & Files</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Filter size={16} />
              Filter
            </button>
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Search size={16} />
              Search
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <FileText className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 text-sm mb-1">{doc.name}</div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{doc.type}</span>
                    <span>•</span>
                    <span>{doc.date}</span>
                    <span>•</span>
                    <span className={`font-semibold ${
                      doc.status === 'Signed' ? 'text-green-600' :
                      doc.status === 'Pending' ? 'text-orange-600' :
                      'text-blue-600'
                    }`}>{doc.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInvoices = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-900 text-lg">Invoices & Billing</h3>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 border-0">
            <Download size={16} className="mr-2" />
            Download All
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="text-sm text-green-700 mb-1">Total Paid</div>
            <div className="text-2xl font-bold text-green-900">$14,500</div>
          </div>
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
            <div className="text-sm text-orange-700 mb-1">Pending</div>
            <div className="text-2xl font-bold text-orange-900">$5,000</div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="text-sm text-blue-700 mb-1">Next Due</div>
            <div className="text-2xl font-bold text-blue-900">Dec 7</div>
          </div>
        </div>

        <div className="space-y-2">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                  invoice.status === 'Paid' ? 'bg-green-100' : 'bg-orange-100'
                }`}>
                  <CreditCard className={invoice.status === 'Paid' ? 'text-green-600' : 'text-orange-600'} size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 text-sm mb-1">{invoice.id}</div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>Issued: {invoice.date}</span>
                    <span>•</span>
                    <span>Due: {invoice.dueDate}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900 text-lg mb-1">{invoice.amount}</div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    invoice.status === 'Paid' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Ticket Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 text-lg">Create Support Ticket</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Subject</label>
              <input 
                type="text" 
                placeholder="Brief description of your issue"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Priority</label>
              <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Message</label>
              <textarea 
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                rows={6}
                placeholder="Describe your issue in detail..."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none"
              />
            </div>
            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 border-0 flex-1">
                <Send size={16} className="mr-2" />
                Submit Ticket
              </Button>
              <button className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <Paperclip size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Contact */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-white">
          <h3 className="font-bold mb-4">Need Immediate Help?</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-xl">
              <div className="text-sm opacity-80 mb-1">Email Support</div>
              <div className="font-semibold">support@aryantra.com</div>
            </div>
            <div className="p-4 bg-white/10 rounded-xl">
              <div className="text-sm opacity-80 mb-1">Phone Support</div>
              <div className="font-semibold">+1 (555) 123-4567</div>
            </div>
            <div className="p-4 bg-white/10 rounded-xl">
              <div className="text-sm opacity-80 mb-1">Business Hours</div>
              <div className="font-semibold">Mon-Fri, 9AM-6PM EST</div>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Tickets */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4">Your Support Tickets</h3>
        <div className="space-y-2">
          {supportTickets.map((ticket) => (
            <div key={ticket.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                  ticket.status === 'Open' ? 'bg-blue-100' :
                  ticket.status === 'In Progress' ? 'bg-orange-100' :
                  'bg-green-100'
                }`}>
                  <MessageSquare className={
                    ticket.status === 'Open' ? 'text-blue-600' :
                    ticket.status === 'In Progress' ? 'text-orange-600' :
                    'text-green-600'
                  } size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 text-sm mb-1">{ticket.subject}</div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{ticket.id}</span>
                    <span>•</span>
                    <span>{ticket.date}</span>
                    <span>•</span>
                    <span className={`font-semibold ${
                      ticket.priority === 'High' ? 'text-red-600' :
                      ticket.priority === 'Medium' ? 'text-orange-600' :
                      'text-slate-600'
                    }`}>{ticket.priority} Priority</span>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  ticket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                  ticket.status === 'In Progress' ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {ticket.status}
                </span>
              </div>
              <ChevronRight size={16} className="text-slate-400 ml-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6 text-lg">Account Settings</h3>
        
        <div className="space-y-6">
          {/* Profile Information */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Profile Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={client.name}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Company</label>
                <input 
                  type="text" 
                  defaultValue={client.company}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Email</label>
                <input 
                  type="email" 
                  defaultValue="contact@skylineproperties.com"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Phone</label>
                <input 
                  type="tel" 
                  defaultValue="+1 (555) 987-6543"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="pt-6 border-t border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-4">Notification Preferences</h4>
            <div className="space-y-3">
              {[
                { label: 'Email notifications for new invoices', checked: true },
                { label: 'SMS alerts for critical issues', checked: true },
                { label: 'Weekly performance reports', checked: false },
                { label: 'Monthly billing summaries', checked: true },
              ].map((pref, i) => (
                <label key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked={pref.checked}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500/20"
                  />
                  <span className="text-sm text-slate-700">{pref.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="pt-6 border-t border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-4">Security</h4>
            <div className="space-y-3">
              <button className="w-full text-left p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900 text-sm">Change Password</div>
                  <div className="text-xs text-slate-500">Last changed 3 months ago</div>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
              <button className="w-full text-left p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900 text-sm">Two-Factor Authentication</div>
                  <div className="text-xs text-green-600 font-semibold">Enabled</div>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-6 border-t border-slate-200">
            <Button className="bg-blue-600 hover:bg-blue-700 border-0">
              <CheckCircle2 size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
       {/* Sidebar */}
       <div className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                {client.name?.charAt(0) || 'C'}
             </div>
             <div className="flex-1">
                <div className="font-bold text-sm">Client Portal</div>
                <div className="text-xs text-slate-400 truncate">{client.company}</div>
             </div>
          </div>
          
          <div className="flex-1 py-6 space-y-1 px-3 overflow-y-auto">
             {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id as any)}
                  className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium transition-all ${
                    currentPage === item.id
                      ? 'bg-white/10 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
             ))}
          </div>
          
          <div className="p-4 border-t border-slate-800">
             <button 
               onClick={onLogout}
               className="flex items-center gap-2 text-slate-400 hover:text-white text-sm px-4 py-2 w-full rounded-xl hover:bg-white/5 transition-all"
             >
                <LogOut size={16} /> Sign Out
             </button>
          </div>
       </div>

       {/* Main Content */}
       <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
             <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {menuItems.find(m => m.id === currentPage)?.label || 'Dashboard'}
                </h1>
                <p className="text-slate-500 text-sm">Welcome back, {client.name}</p>
             </div>
             <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  <Bell size={20} />
                  {notifications > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
                <div className="flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  {client.status}
                </div>
             </div>
          </div>

          {/* Page Content */}
          <div className="p-8">
             {currentPage === 'dashboard' && renderDashboard()}
             {currentPage === 'analytics' && renderAnalytics()}
             {currentPage === 'documents' && renderDocuments()}
             {currentPage === 'invoices' && renderInvoices()}
             {currentPage === 'support' && renderSupport()}
             {currentPage === 'settings' && renderSettings()}
          </div>
       </div>
    </div>
  );
};
