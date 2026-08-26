// Cloudflare Worker for A_OCR Chatbot
// Converted from FastAPI to Cloudflare Workers

// Company system prompt - customize this section
const COMPANY_SYSTEM_PROMPT = `
You are a customer service chatbot for A_OCR. You MUST follow these strict guidelines:

COMPANY INFORMATION:
- Company Name: A_OCR
- Industry: AI TECH
- Services: OCR, AI OCR, OCR Pipeline, OCR API, OCR SDK, OCR Software, OCR Service, OCR Solution, OCR Technology, OCR Application, OCR Development, OCR Implementation, OCR Integration, OCR Customization, OCR Training, OCR Consulting, OCR Support, OCR Maintenance, OCR Upgrade, OCR Migration
- Mission: To provide the best OCR solution for our customers
- Values: data into information, and information into insight 
- Contact Information: team@aocr.in

STRICT CONVERSATION RULES:
1. You can ONLY discuss topics related to our company, products, and services
2. If asked about anything unrelated to our company, politely redirect the conversation
3. Never discuss competitors, politics, personal advice, or general topics
4. Always maintain a professional, helpful tone
5. If you don't know something about our company, admit it and offer to connect them with a human representative

RESPONSE TEMPLATE:
- Always start responses with a friendly greeting if it's the first interaction
- Focus on how our company can help the customer
- End with an offer for further assistance

FORBIDDEN TOPICS:
- Any company other than ours
- Personal advice unrelated to our services
- Political discussions
- General knowledge questions
- Technical support for other companies' products

Remember: You represent A_OCR and should only provide information about our company and services.
`;

// Page-specific prompts
const PAGE_SPECIFIC_PROMPTS = {
    "home": `
    CURRENT PAGE CONTEXT: Homepage
    The user is on the main homepage. Focus on:
    - Welcome messaging and general company overview
    - Highlighting key services and value propositions
    - Guiding users to relevant sections of the website
    - Answering general questions about the company
    `,
    
    "services": `
    CURRENT PAGE CONTEXT: Services Page
    The user is viewing our services. Focus on:
    - Detailed explanations of our service offerings
    - Pricing information and service packages
    - How to get started with our services
    - Service-specific benefits and features
    `,
    
    "about": `
    CURRENT PAGE CONTEXT: About Us Page
    The user is learning about our company. Focus on:
    - Company history and background
    - Team information and expertise
    - Mission, vision, and values
    - Company achievements and milestones
    `,
    
    "contact": `
    CURRENT PAGE CONTEXT: Contact Page
    The user wants to get in touch. Focus on:
    - Contact information and office hours
    - How to reach different departments
    - Response times and communication preferences
    - Scheduling appointments or consultations
    `,
    
    "pricing": `
    CURRENT PAGE CONTEXT: Pricing Page
    The user is interested in costs. Focus on:
    - Detailed pricing information
    - Package comparisons and recommendations
    - Payment options and billing cycles
    - Value propositions for each pricing tier
    `,
    
    "support": `
    CURRENT PAGE CONTEXT: Support/Help Page
    The user needs assistance. Focus on:
    - Troubleshooting common issues
    - How to access support resources
    - Support ticket creation process
    - Self-service options and documentation
    `,
    
    "products": `
    CURRENT PAGE CONTEXT: Products Page
    The user is exploring our products. Focus on:
    - Product features and specifications
    - Product comparisons and recommendations
    - How products solve customer problems
    - Product demos and trial information
    `,
    
    "default": `
    CURRENT PAGE CONTEXT: General Page
    The user is browsing our website. Provide helpful, relevant information about our company and services.
    `
};

// Configuration
const CONFIG = {
    MAX_MESSAGE_LENGTH: 1000,
    RATE_LIMIT_REQUESTS: 10,
    RATE_LIMIT_WINDOW: 60, // seconds
    GEMINI_API_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
};

// Rate limiting storage (in-memory for Cloudflare Workers)
const rateLimitStorage = new Map();

function getPagePrompt(pageId) {
    if (!pageId) {
        return PAGE_SPECIFIC_PROMPTS["default"];
    }
    
    // Normalize page_id
    const normalizedPage = pageId.replace(/^\/+/, '').toLowerCase();
    
    // Handle common page variations
    const pageMappings = {
        'index': 'home',
        '': 'home',
        'service': 'services',
        'product': 'products',
        'help': 'support',
        'faq': 'support',
        'contact-us': 'contact',
        'about-us': 'about',
        'team': 'about'
    };
    
    const mappedPage = pageMappings[normalizedPage] || normalizedPage;
    return PAGE_SPECIFIC_PROMPTS[mappedPage] || PAGE_SPECIFIC_PROMPTS["default"];
}

function checkRateLimit(clientIP) {
    const now = Date.now();
    const windowStart = now - (CONFIG.RATE_LIMIT_WINDOW * 1000);
    
    if (!rateLimitStorage.has(clientIP)) {
        rateLimitStorage.set(clientIP, []);
    }
    
    const requests = rateLimitStorage.get(clientIP);
    
    // Remove old requests outside the window
    const validRequests = requests.filter(timestamp => timestamp > windowStart);
    rateLimitStorage.set(clientIP, validRequests);
    
    // Check if under limit
    if (validRequests.length >= CONFIG.RATE_LIMIT_REQUESTS) {
        return false;
    }
    
    // Add current request
    validRequests.push(now);
    rateLimitStorage.set(clientIP, validRequests);
    return true;
}

function getClientIP(request) {
    const forwarded = request.headers.get("X-Forwarded-For");
    if (forwarded) {
        return forwarded.split(",")[0].trim();
    }
    return request.headers.get("CF-Connecting-IP") || "unknown";
}

async function callGeminiAPI(message, pageId, env) {
    try {
        const pagePrompt = getPagePrompt(pageId);
        const fullPrompt = `${COMPANY_SYSTEM_PROMPT}\n\n${pagePrompt}\n\nUser message: ${message}`;
        
        const payload = {
            contents: [
                {
                    parts: [
                        { text: fullPrompt }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
                topP: 0.8,
                topK: 40
            }
        };
        
        const response = await fetch(CONFIG.GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': env.GEMINI_API_KEY
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status} - ${await response.text()}`);
        }
        
        const result = await response.json();
        
        if (!result.candidates || !result.candidates.length) {
            throw new Error("No response generated");
        }
        
        return result.candidates[0].content.parts[0].text;
        
    } catch (error) {
        console.error('Gemini API call failed:', error);
        throw new Error('AI service error');
    }
}

function validateMessage(message) {
    if (!message || !message.trim()) {
        throw new Error("Message cannot be empty");
    }
    if (message.length > CONFIG.MAX_MESSAGE_LENGTH) {
        throw new Error(`Message too long. Maximum ${CONFIG.MAX_MESSAGE_LENGTH} characters allowed.`);
    }
    return message.trim();
}

function validatePageId(pageId) {
    if (!pageId) return null;
    
    const allowedChars = /^[a-zA-Z0-9\-_\/]+$/;
    if (!allowedChars.test(pageId)) {
        throw new Error("Invalid page_id format");
    }
    return pageId;
}

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
};

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const method = request.method;
        
        // Handle CORS preflight
        if (method === 'OPTIONS') {
            return new Response(null, {
                status: 200,
                headers: corsHeaders
            });
        }
        
        // Health check endpoint
        if (url.pathname === '/' && method === 'GET') {
            return new Response(JSON.stringify({
                status: "healthy",
                service: "A_OCR Chatbot API",
                timestamp: new Date().toISOString()
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
        
        // Health check endpoint
        if (url.pathname === '/health' && method === 'GET') {
            return new Response(JSON.stringify({
                status: "healthy",
                timestamp: new Date().toISOString(),
                api_configured: !!env.GEMINI_API_KEY,
                version: "1.0.0"
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
        
        // Available pages endpoint
        if (url.pathname === '/pages' && method === 'GET') {
            return new Response(JSON.stringify({
                available_pages: Object.keys(PAGE_SPECIFIC_PROMPTS),
                description: "Send page_id in chat requests to get page-specific responses"
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
        
        // Chat endpoint
        if (url.pathname === '/chat' && method === 'POST') {
            try {
                const clientIP = getClientIP(request);
                
                // Check rate limit
                if (!checkRateLimit(clientIP)) {
                    return new Response(JSON.stringify({
                        error: "Too many requests. Please wait before sending another message."
                    }), {
                        status: 429,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                }
                
                // Parse request body
                const body = await request.json();
                const { message, page_id } = body;
                
                // Validate input
                const validatedMessage = validateMessage(message);
                const validatedPageId = validatePageId(page_id);
                
                // Call Gemini API
                const aiResponse = await callGeminiAPI(validatedMessage, validatedPageId, env);
                
                return new Response(JSON.stringify({
                    response: aiResponse,
                    timestamp: new Date().toISOString()
                }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
                
            } catch (error) {
                console.error('Chat endpoint error:', error);
                
                let status = 500;
                let errorMessage = "Internal server error";
                
                if (error.message.includes("Message cannot be empty") || 
                    error.message.includes("Message too long") ||
                    error.message.includes("Invalid page_id")) {
                    status = 400;
                    errorMessage = error.message;
                } else if (error.message.includes("AI service")) {
                    status = 503;
                    errorMessage = "AI service temporarily unavailable";
                }
                
                return new Response(JSON.stringify({
                    error: errorMessage
                }), {
                    status,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }
        
        // 404 for unknown endpoints
        return new Response(JSON.stringify({
            error: "Not found"
        }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
};
