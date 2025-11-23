# 🚀 Quick Start Guide - Aryantra

Get Aryantra running locally in 5 minutes!

---

## 📋 Prerequisites

- Node.js 18+ installed
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

---

## ⚡ Quick Setup

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 3. Configure Environment Variables

**Frontend** - Edit `.env.local`:
```env
VITE_API_URL=http://localhost:3001
```

**Backend** - Create `server/.env`:
```bash
cd server
cp .env.example .env
```

Edit `server/.env` and add your Google Gemini API key:
```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-dev-secret-key-change-in-production
GEMINI_API_KEY=your-google-gemini-api-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$rKZN7qH8qH8qH8qH8qH8qOqH8qH8qH8qH8qH8qH8qH8qH8qH8qH8q
```

**Generate password hash** (optional, for custom passwords):
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 10));"
```

### 4. Start Backend Server

```bash
cd server
npm start
```

Backend runs on `http://localhost:3001`

### 5. Start Frontend (New Terminal)

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## 🎉 You're Ready!

Open `http://localhost:3000` in your browser.

### Test Features:

1. **Browse the website** - All pages should load
2. **Try the chatbot** - Click the chat icon (bottom right)
3. **Book a demo** - Fill out the contact form
4. **Admin login** - Go to Sign In, use:
   - Username: `admin`
   - Password: `admin123` (default)

---

## 🔧 Troubleshooting

### Backend won't start

```bash
# Check if port 3001 is in use
netstat -ano | findstr :3001

# Kill the process if needed
taskkill /PID <process-id> /F
```

### Frontend can't connect to backend

1. Verify backend is running on port 3001
2. Check `.env.local` has correct `VITE_API_URL`
3. Check browser console for CORS errors

### API key errors

1. Verify `GEMINI_API_KEY` is set in `server/.env`
2. Check key is valid at [Google AI Studio](https://makersuite.google.com/)
3. Ensure billing is enabled on Google Cloud

---

## 📚 Next Steps

- Read [README.md](README.md) for full documentation
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Check [SECURITY.md](SECURITY.md) for security best practices
- Use [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) before going live

---

## 🆘 Need Help?

- Check the [Troubleshooting section](#troubleshooting)
- Review error messages in terminal
- Check browser console for frontend errors
- Verify all dependencies installed correctly

---

**Happy coding! 🎉**
