# 🚀 Deployment Guide - Aryantra Production

This guide covers deploying the Aryantra application to production with proper security.

---

## 📋 Prerequisites

Before deploying, ensure you have:

- [ ] Node.js 18+ installed
- [ ] Google Gemini API key
- [ ] Supabase account (optional but recommended)
- [ ] Domain name (for production)
- [ ] SSL certificate (handled by hosting providers)

---

## 🏗️ Architecture Overview

```
┌─────────────┐
│   Client    │  (React SPA - Vercel/Netlify)
│  Frontend   │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────┐
│   Backend   │  (Node.js API - Railway/Render)
│   API       │
└──────┬──────┘
       │
       ├──────► Google Gemini API
       └──────► Supabase Database
```

---

## 🔧 Step 1: Backend Deployment

### Option A: Railway (Recommended)

1. **Create Railway account** at [railway.app](https://railway.app)

2. **Create new project** and select "Deploy from GitHub"

3. **Configure build settings**:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add environment variables** in Railway dashboard:
   ```env
   NODE_ENV=production
   PORT=3001
   FRONTEND_URL=https://your-frontend-domain.com
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   GEMINI_API_KEY=your-google-gemini-api-key
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD_HASH=$2a$10$...
   CLIENT_USERNAME=skyline
   CLIENT_PASSWORD_HASH=$2a$10$...
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_KEY=your-supabase-service-key
   ```

5. **Generate password hashes**:
   ```bash
   cd server
   npm install
   node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 10));"
   ```

6. **Deploy** - Railway will auto-deploy on push

7. **Note your backend URL**: `https://your-app.railway.app`

### Option B: Render

1. Go to [render.com](https://render.com)
2. Create new "Web Service"
3. Connect GitHub repository
4. Configure:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables (same as Railway)
6. Deploy

### Option C: Heroku

```bash
cd server
heroku create aryantra-api
heroku config:set NODE_ENV=production
heroku config:set GEMINI_API_KEY=your-key
# ... add other env vars
git push heroku main
```

---

## 🎨 Step 2: Frontend Deployment

### Option A: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Update `.env.local`** with your backend URL:
   ```env
   VITE_API_URL=https://your-backend.railway.app
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Add environment variable** in Vercel dashboard:
   - `VITE_API_URL` = `https://your-backend.railway.app`

5. **Configure custom domain** (optional)

### Option B: Netlify

1. **Create `netlify.toml`**:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

3. **Add environment variables** in Netlify dashboard

### Option C: Manual Build

```bash
# Build frontend
npm run build

# Upload dist/ folder to any static hosting:
# - AWS S3 + CloudFront
# - DigitalOcean Spaces
# - GitHub Pages
# - Cloudflare Pages
```

---

## 🗄️ Step 3: Database Setup (Supabase)

1. **Create project** at [database.new](https://database.new)

2. **Run SQL migrations**:

```sql
-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  type TEXT CHECK (type IN ('Online', 'Offline')),
  date DATE NOT NULL,
  time TEXT NOT NULL,
  status TEXT CHECK (status IN ('Pending', 'Confirmed', 'Closed')) DEFAULT 'Pending',
  meet_link TEXT,
  location TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Applications table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  experience TEXT,
  status TEXT CHECK (status IN ('New', 'Reviewing', 'Shortlisted', 'Rejected')) DEFAULT 'New',
  cv_name TEXT,
  applied_at TIMESTAMP DEFAULT NOW()
);

-- Clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  project TEXT,
  status TEXT CHECK (status IN ('Active', 'Maintenance', 'Development')) DEFAULT 'Active',
  renewal_date TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_bookings_email ON bookings(email);
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_clients_username ON clients(username);
```

3. **Enable Row Level Security (RLS)**:

```sql
-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your needs)
CREATE POLICY "Allow public insert on bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on applications" ON applications
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can read
CREATE POLICY "Allow authenticated read on bookings" ON bookings
  FOR SELECT USING (auth.role() = 'authenticated');
```

4. **Copy credentials** to backend environment variables

---

## 🔒 Step 4: Security Checklist

### Before Going Live:

- [ ] **Change all default passwords**
- [ ] **Generate strong JWT secret** (min 32 characters)
- [ ] **Hash all passwords** using bcrypt
- [ ] **Enable HTTPS** (handled by hosting providers)
- [ ] **Configure CORS** to only allow your frontend domain
- [ ] **Set up rate limiting** (already in backend code)
- [ ] **Enable Supabase RLS policies**
- [ ] **Add security headers** (helmet.js already configured)
- [ ] **Review and limit API quotas** on Google Cloud
- [ ] **Set up monitoring** (see Step 5)
- [ ] **Test all endpoints** with production data
- [ ] **Backup database** regularly

### Environment Variables Security:

```bash
# Generate secure JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate secure password hash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YourSecurePassword123!', 10));"
```

---

## 📊 Step 5: Monitoring & Analytics

### Error Tracking (Sentry)

1. **Create account** at [sentry.io](https://sentry.io)

2. **Install Sentry**:
   ```bash
   # Backend
   cd server
   npm install @sentry/node

   # Frontend
   npm install @sentry/react
   ```

3. **Configure** (add to server/index.js):
   ```javascript
   import * as Sentry from '@sentry/node';
   
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
   });
   ```

### Uptime Monitoring

- **UptimeRobot**: Free monitoring for backend health
- **Pingdom**: Advanced monitoring with alerts
- **Better Uptime**: Status page + monitoring

### Analytics

1. **Google Analytics 4**:
   - Add GA4 tracking code to `index.html`
   - Track page views and events

2. **Plausible** (Privacy-friendly alternative):
   ```html
   <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
   ```

---

## 🧪 Step 6: Testing Production

### Health Check

```bash
# Test backend health
curl https://your-backend.railway.app/health

# Expected response:
# {"status":"ok","timestamp":"2024-11-22T..."}
```

### API Endpoints

```bash
# Test booking creation
curl -X POST https://your-backend.railway.app/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "type": "Online",
    "date": "2024-12-01",
    "time": "10:00"
  }'

# Test AI chat
curl -X POST https://your-backend.railway.app/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, what can you do?"
  }'
```

### Frontend

1. Open your deployed frontend URL
2. Test all pages load correctly
3. Test booking form submission
4. Test chatbot functionality
5. Test admin/client login
6. Check browser console for errors

---

## 🔄 Step 7: CI/CD Setup (Optional)

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📱 Step 8: Domain & SSL

### Custom Domain Setup

1. **Purchase domain** (Namecheap, GoDaddy, Cloudflare)

2. **Configure DNS**:
   ```
   Frontend (Vercel):
   A     @       76.76.21.21
   CNAME www     cname.vercel-dns.com

   Backend (Railway):
   CNAME api     your-app.railway.app
   ```

3. **SSL Certificate**: Auto-provisioned by hosting providers

4. **Update environment variables**:
   ```env
   FRONTEND_URL=https://aryantra.com
   VITE_API_URL=https://api.aryantra.com
   ```

---

## 🐛 Troubleshooting

### CORS Errors

```javascript
// server/index.js - Update CORS config
app.use(cors({
  origin: [
    'https://aryantra.com',
    'https://www.aryantra.com',
    'http://localhost:3000' // for local dev
  ],
  credentials: true
}));
```

### API Key Issues

- Verify `GEMINI_API_KEY` is set in backend environment
- Check Google Cloud Console for API quotas
- Ensure billing is enabled on Google Cloud

### Database Connection

- Verify Supabase credentials
- Check RLS policies aren't blocking requests
- Test connection with Supabase client

### Build Failures

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

---

## 📈 Performance Optimization

### Frontend

1. **Enable compression** (handled by Vercel/Netlify)
2. **Add CDN** (Cloudflare)
3. **Optimize images** (WebP format, lazy loading)
4. **Code splitting** (React.lazy)

### Backend

1. **Add Redis caching** for frequent queries
2. **Database connection pooling**
3. **Compress responses** (gzip)
4. **Rate limiting** (already implemented)

---

## 💰 Cost Estimation

### Free Tier (Suitable for MVP):
- **Frontend**: Vercel/Netlify Free
- **Backend**: Railway Free ($5/month after trial)
- **Database**: Supabase Free (500MB)
- **Total**: ~$5/month

### Production Scale:
- **Frontend**: Vercel Pro ($20/month)
- **Backend**: Railway Pro ($20/month)
- **Database**: Supabase Pro ($25/month)
- **Monitoring**: Sentry ($26/month)
- **Total**: ~$91/month

---

## ✅ Post-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations run successfully
- [ ] SSL certificates active
- [ ] Custom domain configured
- [ ] Monitoring and alerts set up
- [ ] Error tracking configured
- [ ] Backup strategy implemented
- [ ] Load testing completed
- [ ] Security audit performed
- [ ] Documentation updated
- [ ] Team trained on deployment process

---

## 🆘 Support

For deployment issues:
1. Check logs in hosting dashboard
2. Review error tracking (Sentry)
3. Test API endpoints manually
4. Contact hosting provider support

---

## 🔄 Rollback Procedure

### Vercel
```bash
vercel rollback
```

### Railway
- Go to deployments tab
- Click "Rollback" on previous deployment

### Manual
```bash
git revert HEAD
git push origin main
```

---

**Deployment completed successfully! 🎉**

Your Aryantra application is now production-ready and secure.
