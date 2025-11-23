# Aryantra Setup Script for Windows
# Run this script to set up the project quickly

Write-Host "🚀 Aryantra Setup Script" -ForegroundColor Cyan
Write-Host "========================`n" -ForegroundColor Cyan

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Install frontend dependencies
Write-Host "`nInstalling frontend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}

# Install backend dependencies
Write-Host "`nInstalling backend dependencies..." -ForegroundColor Yellow
Set-Location server
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

# Check for .env files
Write-Host "`nChecking environment files..." -ForegroundColor Yellow

if (Test-Path ".env.local") {
    Write-Host "✅ Frontend .env.local exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  Frontend .env.local not found" -ForegroundColor Yellow
    Write-Host "   Creating from template..." -ForegroundColor Yellow
    @"
# Frontend Environment Variables
VITE_API_URL=http://localhost:3001
"@ | Out-File -FilePath ".env.local" -Encoding UTF8
    Write-Host "✅ Created .env.local" -ForegroundColor Green
}

if (Test-Path "server/.env") {
    Write-Host "✅ Backend .env exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  Backend .env not found" -ForegroundColor Yellow
    if (Test-Path "server/.env.example") {
        Copy-Item "server/.env.example" "server/.env"
        Write-Host "✅ Created server/.env from example" -ForegroundColor Green
        Write-Host "⚠️  IMPORTANT: Edit server/.env and add your GEMINI_API_KEY" -ForegroundColor Yellow
    }
}

# Summary
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "================================`n" -ForegroundColor Cyan

Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Edit server/.env and add your Google Gemini API key" -ForegroundColor White
Write-Host "   Get one here: https://makersuite.google.com/app/apikey`n" -ForegroundColor Gray

Write-Host "2. Start the backend server (in one terminal):" -ForegroundColor White
Write-Host "   cd server" -ForegroundColor Gray
Write-Host "   npm start`n" -ForegroundColor Gray

Write-Host "3. Start the frontend (in another terminal):" -ForegroundColor White
Write-Host "   npm run dev`n" -ForegroundColor Gray

Write-Host "4. Open http://localhost:3000 in your browser`n" -ForegroundColor White

Write-Host "📚 Documentation:" -ForegroundColor Yellow
Write-Host "   - QUICK_START.md - Quick setup guide" -ForegroundColor Gray
Write-Host "   - README.md - Full documentation" -ForegroundColor Gray
Write-Host "   - DEPLOYMENT.md - Production deployment" -ForegroundColor Gray
Write-Host "   - PRODUCTION_READY_SUMMARY.md - What changed`n" -ForegroundColor Gray

Write-Host "🎉 Happy coding!" -ForegroundColor Cyan
