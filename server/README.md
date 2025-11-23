# Aryantra Backend API

Secure Node.js backend for Aryantra AI Automation platform.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
- `GEMINI_API_KEY`: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- `JWT_SECRET`: Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Hash passwords with: `node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 10));"`

### 3. Start Server

```bash
# Development
npm run dev

# Production
npm start
```

Server runs on `http://localhost:3001`

## 📡 API Endpoints

### Public Endpoints

- `GET /health` - Health check
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/client/login` - Client login
- `POST /api/bookings` - Create booking
- `POST /api/applications` - Submit job application
- `POST /api/ai/generate-content` - Generate social media content
- `POST /api/ai/generate-image` - Generate image
- `POST /api/ai/chat` - Chat with AI

### Protected Endpoints (Require JWT)

- `GET /api/bookings` - Get all bookings (admin only)

## 🔒 Security Features

- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Rate limiting
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Input sanitization

## 🧪 Testing

```bash
# Health check
curl http://localhost:3001/health

# Test booking
curl -X POST http://localhost:3001/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "type": "Online",
    "date": "2024-12-01",
    "time": "10:00"
  }'
```

## 📦 Dependencies

- `express` - Web framework
- `@google/genai` - Google Gemini AI
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `helmet` - Security headers
- `cors` - CORS middleware
- `express-rate-limit` - Rate limiting
- `dotenv` - Environment variables

## 🚀 Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) for production deployment guide.

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (production/development) | No |
| `PORT` | Server port | No (default: 3001) |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |
| `JWT_SECRET` | Secret for JWT signing | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `ADMIN_USERNAME` | Admin username | Yes |
| `ADMIN_PASSWORD_HASH` | Hashed admin password | Yes |
| `SUPABASE_URL` | Supabase project URL | Optional |
| `SUPABASE_ANON_KEY` | Supabase anon key | Optional |

## 🔧 Development

```bash
# Install nodemon for auto-reload
npm install -g nodemon

# Run in dev mode
npm run dev
```

## 📄 License

Private - All rights reserved © 2024 Aryantra Inc.
