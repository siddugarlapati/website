
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ============================================================================
// ⚡️ LIVE DATABASE CONFIGURATION (SUPABASE)
// ============================================================================
// To go live:
// 1. Create a project at https://database.new
// 2. Paste your URL and ANON KEY below.
// 3. The app will automatically switch from "Demo Mode" to "Live Mode".

const SUPABASE_URL = ''; // e.g., https://xyzcompany.supabase.co
const SUPABASE_ANON_KEY = ''; // e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// ============================================================================

export interface Booking {
  id: string;
  name: string;
  email: string;
  company: string;
  type: 'Online' | 'Offline';
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Closed';
  meetLink?: string;
  location?: string;
  createdAt: string;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  role: string;
  experience: string;
  status: 'New' | 'Reviewing' | 'Shortlisted' | 'Rejected';
  cvName?: string;
  appliedAt: string;
}

export interface Client {
  id: string;
  username: string;
  password: string; 
  name: string;
  company: string;
  project: string;
  status: 'Active' | 'Maintenance' | 'Development';
  renewalDate: string;
}

// --- SEED DATA (Used only in Demo Mode) ---
const SEED_BOOKINGS: Booking[] = [
  {
    id: 'bk_1',
    name: 'Rajesh Kumar',
    email: 'rajesh@fintech-asia.com',
    company: 'FinTech Asia',
    type: 'Online',
    date: '2024-11-15',
    time: '10:00',
    status: 'Confirmed',
    meetLink: 'meet.aryantra.com/abc-defg-hij',
    createdAt: '2024-11-10T10:00:00Z'
  },
  {
    id: 'bk_2',
    name: 'Sarah Jenkins',
    email: 'sarah@proptech.io',
    company: 'PropTech Global',
    type: 'Offline',
    date: '2024-11-18',
    time: '14:30',
    status: 'Pending',
    location: 'WeWork Galaxy, Bangalore',
    createdAt: '2024-11-11T14:30:00Z'
  }
];

const SEED_APPS: Application[] = [
  {
    id: 'ap_1',
    name: 'Arjun Reddy',
    email: 'arjun.dev@gmail.com',
    role: 'AI Engineer',
    experience: '3-5 years',
    status: 'Shortlisted',
    cvName: 'arjun_resume_v2.pdf',
    appliedAt: '2024-11-01T09:00:00Z'
  }
];

const SEED_CLIENTS: Client[] = [
  {
    id: 'cl_1',
    username: 'skyline',
    password: 'password123',
    name: 'Vikram Malhotra',
    company: 'Skyline Properties',
    project: 'WhatsApp Lead Bot v2',
    status: 'Active',
    renewalDate: 'Dec 31, 2025'
  }
];

class DatabaseService {
  private supabase: SupabaseClient | null = null;
  public isLive = false; // Flag to check if we are using real DB

  private KEY_BOOKINGS = 'aryantra_db_bookings';
  private KEY_APPS = 'aryantra_db_apps';
  private KEY_CLIENTS = 'aryantra_db_clients';

  constructor() {
    // Initialize Supabase if keys are provided
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        this.isLive = true;
        console.log('🟢 Connected to Supabase (Live Mode)');
      } catch (e) {
        console.error('Failed to init Supabase, falling back to local.', e);
      }
    }

    if (!this.isLive) {
      console.log('🟡 Using LocalStorage (Demo Mode)');
      this.initializeLocal();
    }
  }

  private initializeLocal() {
    if (!localStorage.getItem(this.KEY_BOOKINGS)) {
      localStorage.setItem(this.KEY_BOOKINGS, JSON.stringify(SEED_BOOKINGS));
    }
    if (!localStorage.getItem(this.KEY_APPS)) {
      localStorage.setItem(this.KEY_APPS, JSON.stringify(SEED_APPS));
    }
    if (!localStorage.getItem(this.KEY_CLIENTS)) {
      localStorage.setItem(this.KEY_CLIENTS, JSON.stringify(SEED_CLIENTS));
    }
  }

  // =================================================
  // BOOKINGS
  // =================================================

  async getBookings(): Promise<Booking[]> {
    if (this.isLive && this.supabase) {
      const { data, error } = await this.supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) { console.error(error); return []; }
      
      // Map DB snake_case to camelCase if necessary, assume direct mapping for now or setup table matching
      return data.map((d: any) => ({
          ...d,
          meetLink: d.meet_link,
          createdAt: d.created_at
      })) as Booking[];
    }

    // Local Fallback
    await this.delay();
    const data = localStorage.getItem(this.KEY_BOOKINGS);
    return data ? JSON.parse(data) : [];
  }

  async createBooking(booking: Omit<Booking, 'id' | 'status' | 'createdAt'>): Promise<Booking> {
    const newBooking = {
      ...booking,
      status: 'Pending' as const,
      meetLink: booking.type === 'Online' ? `meet.aryantra.com/${this.randomStr(3)}-${this.randomStr(4)}-${this.randomStr(3)}` : undefined,
      // DB Expects snake_case columns usually, but we map manually
    };

    if (this.isLive && this.supabase) {
      const { data, error } = await this.supabase
        .from('bookings')
        .insert([{
            name: newBooking.name,
            email: newBooking.email,
            company: newBooking.company,
            type: newBooking.type,
            date: newBooking.date,
            time: newBooking.time,
            status: newBooking.status,
            meet_link: newBooking.meetLink,
            location: newBooking.location
        }])
        .select()
        .single();

      if (error) throw error;
      return { ...data, meetLink: data.meet_link, createdAt: data.created_at } as Booking;
    }

    // Local Fallback
    await this.delay();
    const localBooking = { 
        ...newBooking, 
        id: `bk_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString() 
    };
    const bookings = await this.getBookings(); // Gets local because isLive is false
    bookings.unshift(localBooking);
    localStorage.setItem(this.KEY_BOOKINGS, JSON.stringify(bookings));
    return localBooking;
  }

  // =================================================
  // APPLICATIONS
  // =================================================

  async getApplications(): Promise<Application[]> {
    if (this.isLive && this.supabase) {
      const { data, error } = await this.supabase
        .from('applications')
        .select('*')
        .order('applied_at', { ascending: false });
      
      if (error) return [];
      return data.map((d: any) => ({
          ...d,
          cvName: d.cv_name,
          appliedAt: d.applied_at
      })) as Application[];
    }

    await this.delay();
    const data = localStorage.getItem(this.KEY_APPS);
    return data ? JSON.parse(data) : [];
  }

  async submitApplication(app: Omit<Application, 'id' | 'status' | 'appliedAt'>): Promise<Application> {
    if (this.isLive && this.supabase) {
        const { data, error } = await this.supabase
          .from('applications')
          .insert([{
              name: app.name,
              email: app.email,
              role: app.role,
              experience: app.experience,
              cv_name: app.cvName,
              status: 'New'
          }])
          .select()
          .single();
        
        if (error) throw error;
        return { ...data, cvName: data.cv_name, appliedAt: data.applied_at };
    }

    await this.delay();
    const apps = JSON.parse(localStorage.getItem(this.KEY_APPS) || '[]');
    const newApp = {
      ...app,
      id: `ap_${Math.random().toString(36).substr(2, 9)}`,
      status: 'New' as const,
      appliedAt: new Date().toISOString()
    };
    apps.unshift(newApp);
    localStorage.setItem(this.KEY_APPS, JSON.stringify(apps));
    return newApp;
  }

  // =================================================
  // CLIENTS
  // =================================================

  async getClients(): Promise<Client[]> {
    if (this.isLive && this.supabase) {
      const { data, error } = await this.supabase.from('clients').select('*');
      if (error) return [];
      return data.map((d: any) => ({...d, renewalDate: d.renewal_date})) as Client[];
    }

    await this.delay();
    const data = localStorage.getItem(this.KEY_CLIENTS);
    return data ? JSON.parse(data) : [];
  }

  async verifyClient(username: string, password: string): Promise<Client | null> {
    if (this.isLive && this.supabase) {
        const { data, error } = await this.supabase
          .from('clients')
          .select('*')
          .eq('username', username)
          .eq('password', password) // Warning: Plaintext for demo. Use hashing in real prod.
          .single();
        
        if (error || !data) return null;
        return { ...data, renewalDate: data.renewal_date };
    }

    await this.delay();
    const clients = JSON.parse(localStorage.getItem(this.KEY_CLIENTS) || '[]');
    return clients.find((c: Client) => c.username === username && c.password === password) || null;
  }

  async createClient(clientData: Omit<Client, 'id'>): Promise<Client> {
    if (this.isLive && this.supabase) {
        const { data, error } = await this.supabase
          .from('clients')
          .insert([{
              username: clientData.username,
              password: clientData.password,
              name: clientData.name,
              company: clientData.company,
              project: clientData.project,
              status: clientData.status,
              renewal_date: clientData.renewalDate
          }])
          .select()
          .single();
        if (error) throw error;
        return { ...data, renewalDate: data.renewal_date };
    }

    await this.delay();
    const clients = JSON.parse(localStorage.getItem(this.KEY_CLIENTS) || '[]');
    const newClient = { ...clientData, id: `cl_${Math.random().toString(36).substr(2, 9)}` };
    clients.push(newClient);
    localStorage.setItem(this.KEY_CLIENTS, JSON.stringify(clients));
    return newClient;
  }

  // --- UTILS ---

  private delay() {
    return new Promise(resolve => setTimeout(resolve, 400)); // Simulate API latency
  }

  private randomStr(len: number) {
    return Math.random().toString(36).substr(2, len);
  }
}

export const db = new DatabaseService();
