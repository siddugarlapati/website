# Aryantra - Automation, Reinvented

> **Frictionless automation. Enterprise-grade intelligence. Effortless execution.**

A modern, AI-powered automation platform built with React, TypeScript, and Vite. Aryantra empowers businesses with autonomous AI agents that handle customer engagement, lead management, and workflow automation across multiple channels.

![Version](https://img.shields.io/badge/version-0.0.0-blue.svg)
![License](https://img.shields.io/badge/license-Private-red.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178c6.svg)

---

## 🚀 Features

- **Multi-Page SPA**: Home, About, Services, Industries, Integrations, Case Studies, Resources, Contact, Careers
- **Admin Dashboard**: Manage bookings, applications, and clients
- **Client Portal**: Secure client login with project tracking
- **AI-Powered Services**: 
  - WhatsApp automation
  - Social media content generation
  - AI voice calling
  - Image generation
- **Real-time Chat Bot**: Interactive AI assistant
- **Responsive Design**: Mobile-first, glassmorphism UI with Tailwind CSS
- **Database Support**: LocalStorage (demo) + Supabase (production)

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Production Build](#production-build)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Deployment](#deployment)
- [Production Readiness Checklist](#production-readiness-checklist)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)

---

## 🔧 Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or yarn/pnpm)
- **Google Gemini API Key**: For AI features
- **Supabase Account**: (Optional) For production database

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aryantra-ai-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example env file
   cp .env.local .env.local
   ```

---

## ⚙️ Configuration

### Environment Variables

Edit `.env.local` and add your API keys:

```env
# Google Gemini API Key (Required for AI features)
API_KEY=your_google_gemini_api_key_here
```

### Database Configuration

Edit `utils/db.ts` to configure Supabase (optional):

```typescript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

**Note**: Without Supabase credentials, the app runs in **Demo Mode** using LocalStorage.

---

## 🛠️ Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Development Features
- Hot Module Replacement (HMR)
- TypeScript type checking
- React Fast Refresh
- Tailwind CSS with JIT compilation

---

## 🏗️ Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The optimized build will be in the `dist/` directory.

---

## 📁 Project Structure

```
aryantra-ai-automation/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── ChatBot.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── Hero.tsx
├── pages/              # Page components
│   ├── About.tsx
│   ├── Admin.tsx
│   ├── Careers.tsx
│   ├── CaseStudies.tsx
│   ├── ClientPortal.tsx
│   ├── Contact.tsx
│   ├── Home.tsx
│   ├── Industries.tsx
│   ├── Integrations.tsx
│   ├── Resources.tsx
│   ├── Services.tsx
│   └── SignIn.tsx
├── utils/              # Utility functions
│   └── db.ts          # Database service layer
├── App.tsx            # Main app component with routing
├── index.tsx          # App entry point
├── index.html         # HTML template
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
├── package.json       # Dependencies
└── .env.local         # Environment variables (not in git)
```

---

## 🔐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `API_KEY` | Google Gemini API key for AI features | Yes | `PLACEHOLDER_API_KEY` |

---

## 🗄️ Database Setup

### Demo Mode (LocalStorage)
By default, the app uses LocalStorage with seed data. No setup required.

### Production Mode (Supabase)

1. **Create a Supabase project** at [database.new](https://database.new)

2. **Create the following tables**:

   **bookings**
   ```sql
   CREATE TABLE bookings (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     company TEXT,
     type TEXT CHECK (type IN ('Online', 'Offline')),
     date DATE NOT NULL,
     time TEXT NOT NULL,
     status TEXT CHECK (status IN ('Pending', 'Confirmed', 'Closed')),
     meet_link TEXT,
     location TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

   **applications**
   ```sql
   CREATE TABLE applications (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     role TEXT NOT NULL,
     experience TEXT,
     status TEXT CHECK (status IN ('New', 'Reviewing', 'Shortlisted', 'Rejected')),
     cv_name TEXT,
     applied_at TIMESTAMP DEFAULT NOW()
   );
   ```

   **clients**
   ```sql
   CREATE TABLE clients (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     username TEXT UNIQUE NOT NULL,
     password TEXT NOT NULL,
     name TEXT NOT NULL,
     company TEXT,
     project TEXT,
     status TEXT CHECK (status IN ('Active', 'Maintenance', 'Development')),
     renewal_date TEXT
   );
   ```

3. **Update `utils/db.ts`** with your Supabase credentials

4. **Enable Row Level Security (RLS)** and create appropriate policies

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variables
4. Deploy

### Other Platforms

The app is a standard Vite + React SPA and can be deployed to any static hosting service.

---

## ✅ Production Readiness Checklist

### 🟢 Ready
- [x] TypeScript with strict type checking
- [x] No compilation errors
- [x] Responsive design (mobile-first)
- [x] Component-based architecture
- [x] Environment variable configuration
- [x] Build optimization (Vite)
- [x] Code splitting ready
- [x] SEO meta tags in HTML

### 🟡 Needs Attention
- [ ] **API Key Security**: API key exposed in client-side code
- [ ] **Authentication**: Basic password comparison (no hashing)
- [ ] **Database**: Using LocalStorage by default
- [ ] **Error Boundaries**: No React error boundaries implemented
- [ ] **Loading States**: Some API calls lack loading indicators
- [ ] **Form Validation**: Client-side only, needs server validation
- [ ] **Analytics**: No tracking implemented
- [ ] **Monitoring**: No error tracking (Sentry, etc.)

### 🔴 Critical Issues
- [ ] **Security**: Passwords stored in plaintext
- [ ] **API Keys**: Google Gemini API key in client bundle
- [ ] **CORS**: No backend API layer
- [ ] **Rate Limiting**: No protection against API abuse
- [ ] **SSL/HTTPS**: Required for production
- [ ] **Backup Strategy**: No database backup plan
- [ ] **Testing**: No unit/integration tests

---

## 🛡️ Security Recommendations

### Before Going Live:

1. **Move API calls to backend**
   - Create a Node.js/Express backend
   - Store API keys server-side
   - Implement proper authentication (JWT)

2. **Hash passwords**
   - Use bcrypt or argon2
   - Never store plaintext passwords

3. **Implement rate limiting**
   - Protect API endpoints
   - Add CAPTCHA for forms

4. **Enable HTTPS**
   - Use SSL certificates
   - Redirect HTTP to HTTPS

5. **Add security headers**
   - CSP (Content Security Policy)
   - HSTS
   - X-Frame-Options

6. **Input sanitization**
   - Validate all user inputs
   - Prevent XSS attacks

---

## 🧰 Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Lucide React
- **AI**: Google Gemini API
- **Database**: Supabase (optional)
- **Fonts**: Inter, Space Grotesk

---

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🤝 Contributing

This is a private project. For internal contributions:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📄 License

Private - All rights reserved © 2024 Aryantra Inc.

---

## 📞 Support

For questions or issues, contact the development team.

---

## 🎯 Roadmap

- [ ] Backend API implementation
- [ ] User authentication system
- [ ] Payment integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Automated testing suite
- [ ] CI/CD pipeline

---

**Built with ❤️ by the Aryantra Team**
