import os
import httpx
import logging
from datetime import datetime, timedelta
from typing import Dict, Optional
from collections import defaultdict

from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, Field, validator
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Company Chatbot API",
    description="Secure chatbot API using Gemini AI",
    version="1.0.0"
)

# Security configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is required")

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "").split(",")
MAX_MESSAGE_LENGTH = int(os.getenv("MAX_MESSAGE_LENGTH", "1000"))
RATE_LIMIT_REQUESTS = int(os.getenv("RATE_LIMIT_REQUESTS", "10"))
RATE_LIMIT_WINDOW = int(os.getenv("RATE_LIMIT_WINDOW", "60"))

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Rate limiting storage
rate_limit_storage: Dict[str, list] = defaultdict(list)

# Security bearer token (optional additional layer)
security = HTTPBearer(auto_error=False)

class ChatMessage(BaseModel):
    message: str = Field(..., min_length=1, max_length=MAX_MESSAGE_LENGTH)
    page_id: Optional[str] = Field(None, description="Current page identifier")
    
    @validator('message')
    def validate_message(cls, v):
        # Basic input sanitization
        if not v.strip():
            raise ValueError("Message cannot be empty")
        return v.strip()
    
    @validator('page_id')
    def validate_page_id(cls, v):
        if v is not None:
            # Sanitize page_id to prevent injection
            allowed_chars = set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_/')
            if not all(c in allowed_chars for c in v):
                raise ValueError("Invalid page_id format")
        return v

class ChatResponse(BaseModel):
    response: str
    timestamp: datetime

# ============================================================================
# COMPANY PROMPT SECTION - CUSTOMIZE THIS SECTION WITH YOUR COMPANY DETAILS
# ============================================================================

COMPANY_SYSTEM_PROMPT = """
You are a customer service chatbot for [COMPANY NAME]. You MUST follow these strict guidelines:

COMPANY INFORMATION:
- Company Name: A_OCR
- Industry: AI TECH
- Services: OCR, AI OCR, OCR Pipeline, OCR API, OCR SDK, OCR Software, OCR Service, OCR Solution, OCR Technology, OCR Application, OCR Development, OCR Implementation, OCR Integration, OCR Customization, OCR Training, OCR Consulting, OCR Support, OCR Maintenance, OCR Upgrade, OCR Migration, OCR Implementation, OCR Integration, OCR Customization, OCR Training, OCR Consulting, OCR Support, OCR Maintenance, OCR Upgrade, OCR Migration
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
"""

# ============================================================================
# PAGE-SPECIFIC PROMPTS - CUSTOMIZE THESE FOR EACH PAGE OF YOUR WEBSITE
# ============================================================================

PAGE_SPECIFIC_PROMPTS = {
    "home": """
    CURRENT PAGE CONTEXT: Homepage
    The user is on the main homepage. Focus on:
    - Welcome messaging and general company overview
    - Highlighting key services and value propositions
    - Guiding users to relevant sections of the website
    - Answering general questions about the company
    """,
    
    "services": """
    CURRENT PAGE CONTEXT: Services Page
    The user is viewing our services. Focus on:
    - Detailed explanations of our service offerings
    - Pricing information and service packages
    - How to get started with our services
    - Service-specific benefits and features
    """,
    
    "about": """
    CURRENT PAGE CONTEXT: About Us Page
    The user is learning about our company. Focus on:
    - Company history and background
    - Team information and expertise
    - Mission, vision, and values
    - Company achievements and milestones
    """,
    
    "contact": """
    CURRENT PAGE CONTEXT: Contact Page
    The user wants to get in touch. Focus on:
    - Contact information and office hours
    - How to reach different departments
    - Response times and communication preferences
    - Scheduling appointments or consultations
    """,
    
    "pricing": """
    CURRENT PAGE CONTEXT: Pricing Page
    The user is interested in costs. Focus on:
    - Detailed pricing information
    - Package comparisons and recommendations
    - Payment options and billing cycles
    - Value propositions for each pricing tier
    """,
    
    "support": """
    CURRENT PAGE CONTEXT: Support/Help Page
    The user needs assistance. Focus on:
    - Troubleshooting common issues
    - How to access support resources
    - Support ticket creation process
    - Self-service options and documentation
    """,
    
    "products": """
    CURRENT PAGE CONTEXT: Products Page
    The user is exploring our products. Focus on:
    - Product features and specifications
    - Product comparisons and recommendations
    - How products solve customer problems
    - Product demos and trial information
    """,
    
    # Add more page-specific prompts as needed
    "default": """
    CURRENT PAGE CONTEXT: General Page
    The user is browsing our website. Provide helpful, relevant information about our company and services.
    """
}

def get_page_prompt(page_id: Optional[str]) -> str:
    """Get the appropriate page-specific prompt"""
    if not page_id:
        return PAGE_SPECIFIC_PROMPTS["default"]
    
    # Normalize page_id (remove leading slash, convert to lowercase)
    normalized_page = page_id.strip('/').lower()
    
    # Handle common page variations
    page_mappings = {
        'index': 'home',
        '': 'home',
        'service': 'services',
        'product': 'products',
        'help': 'support',
        'faq': 'support',
        'contact-us': 'contact',
        'about-us': 'about',
        'team': 'about'
    }
    
    # Map variations to standard page names
    if normalized_page in page_mappings:
        normalized_page = page_mappings[normalized_page]
    
    return PAGE_SPECIFIC_PROMPTS.get(normalized_page, PAGE_SPECIFIC_PROMPTS["default"])

# ============================================================================
# END OF COMPANY PROMPT SECTION
# ============================================================================

def check_rate_limit(client_ip: str) -> bool:
    """Check if client has exceeded rate limit"""
    now = datetime.now()
    client_requests = rate_limit_storage[client_ip]
    
    # Remove old requests outside the window
    cutoff_time = now - timedelta(seconds=RATE_LIMIT_WINDOW)
    rate_limit_storage[client_ip] = [req_time for req_time in client_requests if req_time > cutoff_time]
    
    # Check if under limit
    if len(rate_limit_storage[client_ip]) >= RATE_LIMIT_REQUESTS:
        return False
    
    # Add current request
    rate_limit_storage[client_ip].append(now)
    return True

async def get_client_ip(request: Request) -> str:
    """Get client IP address"""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host

async def call_gemini_api(message: str, page_id: Optional[str] = None) -> str:
    """Call Gemini API with security measures and page context"""
    try:
        # Get page-specific prompt
        page_prompt = get_page_prompt(page_id)
        
        # Construct the full prompt with company and page context
        full_prompt = f"{COMPANY_SYSTEM_PROMPT}\n\n{page_prompt}\n\nUser message: {message}"
        
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": full_prompt}
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.7,
                "maxOutputTokens": 500,
                "topP": 0.8,
                "topK": 40
            }
        }
        
        headers = {
            "Content-Type": "application/json",
            "X-goog-api-key": GEMINI_API_KEY
        }
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
                json=payload,
                headers=headers
            )
            
            if response.status_code != 200:
                logger.error(f"Gemini API error: {response.status_code} - {response.text}")
                raise HTTPException(status_code=500, detail="AI service temporarily unavailable")
            
            result = response.json()
            
            if "candidates" not in result or not result["candidates"]:
                raise HTTPException(status_code=500, detail="No response generated")
            
            return result["candidates"][0]["content"]["parts"][0]["text"]
            
    except httpx.TimeoutException:
        logger.error("Gemini API timeout")
        raise HTTPException(status_code=504, detail="AI service timeout")
    except Exception as e:
        logger.error(f"Gemini API call failed: {str(e)}")
        raise HTTPException(status_code=500, detail="AI service error")

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Company Chatbot API"}

@app.post("/chat", response_model=ChatResponse)
async def chat(
    chat_message: ChatMessage,
    request: Request,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
):
    """Main chat endpoint with security measures"""
    
    # Get client IP for rate limiting
    client_ip = await get_client_ip(request)
    
    # Check rate limit
    if not check_rate_limit(client_ip):
        logger.warning(f"Rate limit exceeded for IP: {client_ip}")
        raise HTTPException(
            status_code=429, 
            detail="Too many requests. Please wait before sending another message."
        )
    
    # Log the request (without sensitive data)
    logger.info(f"Chat request from IP: {client_ip}, page: {chat_message.page_id or 'unknown'}, message length: {len(chat_message.message)}")
    
    try:
        # Call Gemini API with page context
        ai_response = await call_gemini_api(chat_message.message, chat_message.page_id)
        
        return ChatResponse(
            response=ai_response,
            timestamp=datetime.now()
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/pages")
async def get_available_pages():
    """Get list of available page contexts"""
    return {
        "available_pages": list(PAGE_SPECIFIC_PROMPTS.keys()),
        "description": "Send page_id in chat requests to get page-specific responses"
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "timestamp": datetime.now(),
        "api_configured": bool(GEMINI_API_KEY),
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)