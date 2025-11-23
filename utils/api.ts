// API Client for communicating with backend server

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    // Load token from localStorage if exists
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Request failed' };
      }

      return { data };
    } catch (error) {
      console.error('API request error:', error);
      return { error: 'Network error. Please check your connection.' };
    }
  }

  // Auth endpoints
  async loginAdmin(username: string, password: string) {
    const response = await this.request<{ token: string; role: string }>(
      '/api/auth/admin/login',
      {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }
    );

    if (response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async loginClient(username: string, password: string) {
    const response = await this.request<{ token: string; role: string; client: any }>(
      '/api/auth/client/login',
      {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }
    );

    if (response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  logout() {
    this.clearToken();
  }

  // AI endpoints
  async generateContent(prompt: string, platform: string) {
    return this.request<{ content: string }>('/api/ai/generate-content', {
      method: 'POST',
      body: JSON.stringify({ prompt, platform }),
    });
  }

  async generateImage(prompt: string) {
    return this.request<{ imageUrl: string }>('/api/ai/generate-image', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
  }

  async chat(message: string, history: Array<{ role: string; content: string }> = []) {
    return this.request<{ response: string }>('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
    });
  }

  // Booking endpoints
  async createBooking(bookingData: {
    name: string;
    email: string;
    company?: string;
    type: 'Online' | 'Offline';
    date: string;
    time: string;
    location?: string;
  }) {
    return this.request<any>('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBookings() {
    return this.request<{ bookings: any[] }>('/api/bookings');
  }

  // Application endpoints
  async submitApplication(applicationData: {
    name: string;
    email: string;
    role: string;
    experience?: string;
    cvName?: string;
  }) {
    return this.request<any>('/api/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);
