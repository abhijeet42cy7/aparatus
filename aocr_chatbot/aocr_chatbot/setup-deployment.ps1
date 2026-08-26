# A_OCR Chatbot - Cloudflare Workers Setup Script (PowerShell)
# This script helps you set up the chatbot for deployment

Write-Host "🚀 A_OCR Chatbot - Cloudflare Workers Setup" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Check if wrangler is installed
try {
    wrangler --version | Out-Null
    Write-Host "✅ Wrangler CLI found" -ForegroundColor Green
} catch {
    Write-Host "❌ Wrangler CLI not found. Installing..." -ForegroundColor Red
    npm install -g wrangler
}

# Check if user is logged in
Write-Host "🔐 Checking Cloudflare authentication..." -ForegroundColor Yellow
try {
    wrangler whoami | Out-Null
    Write-Host "✅ Authenticated with Cloudflare" -ForegroundColor Green
} catch {
    Write-Host "Please login to Cloudflare:" -ForegroundColor Yellow
    wrangler login
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Create KV namespaces
Write-Host "🗄️ Creating KV namespaces for rate limiting..." -ForegroundColor Yellow

Write-Host "Creating production namespace..." -ForegroundColor Yellow
$prodNsOutput = wrangler kv:namespace create "RATE_LIMIT_STORAGE" --json
$prodNs = ($prodNsOutput | ConvertFrom-Json).id
Write-Host "Production namespace ID: $prodNs" -ForegroundColor Green

Write-Host "Creating preview namespace..." -ForegroundColor Yellow
$previewNsOutput = wrangler kv:namespace create "RATE_LIMIT_STORAGE" --preview --json
$previewNs = ($previewNsOutput | ConvertFrom-Json).id
Write-Host "Preview namespace ID: $previewNs" -ForegroundColor Green

# Update wrangler.toml with namespace IDs
Write-Host "📝 Updating wrangler.toml with namespace IDs..." -ForegroundColor Yellow
$wranglerContent = Get-Content "wrangler.toml" -Raw
$wranglerContent = $wranglerContent -replace "your-kv-namespace-id", $prodNs
$wranglerContent = $wranglerContent -replace "your-preview-kv-namespace-id", $previewNs
Set-Content "wrangler.toml" $wranglerContent

# Set up secrets
Write-Host "🔑 Setting up environment variables..." -ForegroundColor Yellow

Write-Host "Please enter your Gemini API key:" -ForegroundColor Cyan
$geminiKey = Read-Host
wrangler secret put GEMINI_API_KEY --text $geminiKey

Write-Host "Please enter allowed origins (comma-separated, or press Enter for *):" -ForegroundColor Cyan
$allowedOrigins = Read-Host
if ([string]::IsNullOrEmpty($allowedOrigins)) {
    $allowedOrigins = "*"
}
wrangler secret put ALLOWED_ORIGINS --text $allowedOrigins

# Optional: Set custom rate limits
Write-Host "⚙️ Setting up rate limiting (press Enter for defaults)..." -ForegroundColor Yellow

Write-Host "Max message length (default: 1000):" -ForegroundColor Cyan
$maxLength = Read-Host
if ([string]::IsNullOrEmpty($maxLength)) {
    $maxLength = "1000"
}
wrangler secret put MAX_MESSAGE_LENGTH --text $maxLength

Write-Host "Rate limit requests per window (default: 10):" -ForegroundColor Cyan
$rateRequests = Read-Host
if ([string]::IsNullOrEmpty($rateRequests)) {
    $rateRequests = "10"
}
wrangler secret put RATE_LIMIT_REQUESTS --text $rateRequests

Write-Host "Rate limit window in seconds (default: 60):" -ForegroundColor Cyan
$rateWindow = Read-Host
if ([string]::IsNullOrEmpty($rateWindow)) {
    $rateWindow = "60"
}
wrangler secret put RATE_LIMIT_WINDOW --text $rateWindow

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Test locally: npm run dev" -ForegroundColor White
Write-Host "2. Deploy to staging: npm run deploy:staging" -ForegroundColor White
Write-Host "3. Deploy to production: npm run deploy:production" -ForegroundColor White
Write-Host ""
Write-Host "Your chatbot will be available at:" -ForegroundColor Yellow
Write-Host "- Staging: https://aocr-chatbot-staging.your-subdomain.workers.dev" -ForegroundColor White
Write-Host "- Production: https://aocr-chatbot.your-subdomain.workers.dev" -ForegroundColor White
Write-Host ""
Write-Host "📚 For more information, see deploy.md" -ForegroundColor Cyan
