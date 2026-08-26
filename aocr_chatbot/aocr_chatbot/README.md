# A_OCR Chatbot - Cloudflare Workers

A serverless chatbot API built for Cloudflare Workers, powered by Google Gemini AI.

## Features

- ✅ **100,000 requests/day free** on Cloudflare Workers
- ✅ **Global edge deployment** for fast responses worldwide
- ✅ **Same AI responses** with your exact prompt engineering
- ✅ **No server management** - fully serverless
- ✅ **Automatic scaling** based on demand
- ✅ **Rate limiting** and security features
- ✅ **Page-specific responses** for different website sections

## Quick Start

### 1. Setup
```bash
# Run the setup script (choose one)
# For Linux/Mac:
./setup-deployment.sh

# For Windows PowerShell:
.\setup-deployment.ps1
```

### 2. Test Locally
```bash
npm run dev
```

### 3. Deploy
```bash
# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

### 4. Test Deployment
```bash
# Test your deployed chatbot
node test-deployment.js https://your-worker-url.workers.dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/health` | Detailed health check |
| GET | `/pages` | Available page contexts |
| POST | `/chat` | Main chat endpoint |

### Chat API Usage

```javascript
// Example request
const response = await fetch('https://your-worker.workers.dev/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message: 'Hello, I need help with OCR services',
    page_id: 'home' // optional
  })
});

const data = await response.json();
console.log(data.response); // AI response
```

## Configuration

### Environment Variables
- `GEMINI_API_KEY` - Your Google Gemini API key (required)
- `ALLOWED_ORIGINS` - Comma-separated allowed origins (optional)
- `MAX_MESSAGE_LENGTH` - Max message length (default: 1000)
- `RATE_LIMIT_REQUESTS` - Requests per window (default: 10)
- `RATE_LIMIT_WINDOW` - Rate limit window in seconds (default: 60)

### Page Contexts
- `home` - Homepage
- `services` - Services page
- `about` - About us page
- `contact` - Contact page
- `pricing` - Pricing page
- `support` - Support/Help page
- `products` - Products page
- `default` - General pages

## Development

### Local Development
```bash
npm run dev
```

### View Logs
```bash
npm run tail
```

### Update Secrets
```bash
npm run secret:put
```

## Files Structure

```
aocr_chatbot/
├── src/
│   └── index.js          # Main Cloudflare Worker code
├── wrangler.toml         # Wrangler configuration
├── package.json          # Dependencies and scripts
├── deploy.md             # Detailed deployment guide
├── setup-deployment.sh   # Linux/Mac setup script
├── setup-deployment.ps1  # Windows PowerShell setup script
├── test-deployment.js    # Test script
└── README.md            # This file
```

## Cost

- **Cloudflare Workers**: 100,000 requests/day free
- **Gemini API**: Pay per token usage
- **KV Storage**: Minimal cost for rate limiting
- **No server costs** or maintenance

## Support

For issues or questions:
- Check `deploy.md` for detailed setup instructions
- Review Cloudflare Workers documentation
- Contact: team@aocr.in

## License

MIT License - see LICENSE file for details