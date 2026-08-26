# A_OCR Chatbot - Cloudflare Workers Deployment Guide

## Overview
This chatbot is deployed on Cloudflare Workers, providing:
- ✅ 100,000 requests/day free on Cloudflare Workers
- ✅ Global edge deployment for fast responses worldwide
- ✅ Same AI responses with your exact prompt engineering
- ✅ No server management - fully serverless
- ✅ Automatic scaling based on demand

## Prerequisites
1. Cloudflare account
2. Gemini API key from Google AI Studio
3. Wrangler CLI installed globally

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Login to Cloudflare
```bash
wrangler login
```

### 3. Create KV Namespace (for rate limiting)
```bash
# Create production namespace
wrangler kv:namespace create "RATE_LIMIT_STORAGE"

# Create preview namespace
wrangler kv:namespace create "RATE_LIMIT_STORAGE" --preview
```

Update the `wrangler.toml` file with the actual namespace IDs returned from the above commands.

### 4. Set Environment Variables
```bash
# Set your Gemini API key
wrangler secret put GEMINI_API_KEY

# Set allowed origins (comma-separated)
wrangler secret put ALLOWED_ORIGINS

# Optional: Set custom rate limits
wrangler secret put MAX_MESSAGE_LENGTH
wrangler secret put RATE_LIMIT_REQUESTS
wrangler secret put RATE_LIMIT_WINDOW
```

### 5. Deploy to Cloudflare Workers

#### Development/Testing
```bash
npm run dev
```

#### Deploy to Staging
```bash
npm run deploy:staging
```

#### Deploy to Production
```bash
npm run deploy:production
```

## API Endpoints

### Health Check
- `GET /` - Basic health check
- `GET /health` - Detailed health check

### Chat API
- `POST /chat` - Main chat endpoint

**Request Body:**
```json
{
  "message": "Hello, I need help with OCR services",
  "page_id": "home" // optional
}
```

**Response:**
```json
{
  "response": "Hello! I'd be happy to help you with our OCR services...",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Available Pages
- `GET /pages` - List of available page contexts

## Configuration

### Environment Variables
- `GEMINI_API_KEY` - Your Google Gemini API key (required)
- `ALLOWED_ORIGINS` - Comma-separated list of allowed origins (optional)
- `MAX_MESSAGE_LENGTH` - Maximum message length (default: 1000)
- `RATE_LIMIT_REQUESTS` - Requests per rate limit window (default: 10)
- `RATE_LIMIT_WINDOW` - Rate limit window in seconds (default: 60)

### Page Contexts
The chatbot supports page-specific responses for:
- `home` - Homepage
- `services` - Services page
- `about` - About us page
- `contact` - Contact page
- `pricing` - Pricing page
- `support` - Support/Help page
- `products` - Products page
- `default` - General pages

## Monitoring

### View Logs
```bash
npm run tail
```

### Monitor Performance
- Use Cloudflare Analytics dashboard
- Monitor request volume and response times
- Set up alerts for error rates

## Security Features
- Rate limiting per IP address
- Input validation and sanitization
- CORS protection
- Secure API key handling
- Request logging (without sensitive data)

## Troubleshooting

### Common Issues
1. **API Key Not Set**: Ensure `GEMINI_API_KEY` is properly set as a secret
2. **CORS Errors**: Check `ALLOWED_ORIGINS` configuration
3. **Rate Limiting**: Adjust rate limit settings if needed
4. **KV Namespace**: Ensure KV namespaces are created and IDs are correct

### Debug Mode
```bash
wrangler dev --local
```

## Cost Optimization
- Cloudflare Workers: 100,000 requests/day free
- Gemini API: Pay per token usage
- KV Storage: Minimal cost for rate limiting data
- No server costs or maintenance

## Support
For issues or questions:
- Check Cloudflare Workers documentation
- Review Gemini API documentation
- Contact: team@aocr.in
