import { NextRequest, NextResponse } from 'next/server';

interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  max: number; // Maximum requests per window
  keyGenerator?: (request: NextRequest) => string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

interface RateLimitInfo {
  totalHits: number;
  resetTime: number;
  isBlocked: boolean;
}

// In-memory store for rate limits (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function createRateLimit(options: RateLimitOptions) {
  return {
    check: async (request: NextRequest): Promise<{ response: NextResponse | null; info: RateLimitInfo }> => {
      const key = options.keyGenerator ? options.keyGenerator(request) : request.ip || request.headers.get('x-forwarded-for') || 'unknown';
      const now = Date.now();
      const windowStart = now - options.windowMs;
      
      let entry = rateLimitStore.get(key);
      
      // If entry doesn't exist or has expired, create a new one
      if (!entry || entry.resetTime < now) {
        entry = {
          count: 1,
          resetTime: now + options.windowMs,
        };
        rateLimitStore.set(key, entry);
        
        return {
          response: null,
          info: {
            totalHits: 1,
            resetTime: entry.resetTime,
            isBlocked: false,
          },
        };
      }
      
      // Increment count
      entry.count++;
      rateLimitStore.set(key, entry);
      
      // Check if limit exceeded
      if (entry.count > options.max) {
        return {
          response: NextResponse.json(
            { error: 'Too many requests' },
            { 
              status: 429,
              headers: {
                'X-RateLimit-Limit': options.max.toString(),
                'X-RateLimit-Remaining': '0',
                'X-RateLimit-Reset': entry.resetTime.toString(),
                'Retry-After': Math.ceil(options.windowMs / 1000).toString(),
              },
            }
          ),
          info: {
            totalHits: entry.count,
            resetTime: entry.resetTime,
            isBlocked: true,
          },
        };
      }
      
      return {
        response: null,
        info: {
          totalHits: entry.count,
          resetTime: entry.resetTime,
          isBlocked: false,
        },
      };
    },
    
    reset: (key: string) => {
      rateLimitStore.delete(key);
    },
    
    resetAll: () => {
      rateLimitStore.clear();
    },
  };
}

// Common rate limit configurations
export const rateLimits = {
  // API endpoints: 100 requests per minute
  api: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100,
    keyGenerator: (request) => {
      // Use IP address as the key
      return request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    },
  }),
  
  // Login attempts: 5 attempts per 15 minutes
  login: createRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    keyGenerator: (request) => {
      // Use IP address for login attempts
      return `login:${request.ip || request.headers.get('x-forwarded-for') || 'unknown'}`;
    },
  }),
  
  // Password reset: 3 attempts per hour
  passwordReset: createRateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3,
    keyGenerator: (request) => {
      // Use IP address for password reset attempts
      return `reset:${request.ip || request.headers.get('x-forwarded-for') || 'unknown'}`;
    },
  }),
  
  // Email sending: 10 emails per minute
  email: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    keyGenerator: (request) => {
      // Use IP address for email sending
      return `email:${request.ip || request.headers.get('x-forwarded-for') || 'unknown'}`;
    },
  }),
};

// Middleware to apply rate limiting
export async function applyRateLimit(
  request: NextRequest,
  rateLimit: ReturnType<typeof createRateLimit>
): Promise<NextResponse | null> {
  const { response } = await rateLimit.check(request);
  return response;
}

// Security headers middleware
export function securityHeaders() {
  return {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.stripe.com https://hooks.stripe.com https://meilisearch.com;",
  };
}

// CORS configuration
export const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://aurabiosphere.com', 'https://www.aurabiosphere.com']
    : ['http://localhost:5000', 'http://localhost:5001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400, // 24 hours
};

// Sanitize input function
export function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    // Remove potentially dangerous characters
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {};
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        sanitized[key] = sanitizeInput(input[key]);
      }
    }
    return sanitized;
  }
  
  return input;
}

// Validate CSRF token
export function validateCSRFToken(token: string, request: NextRequest): boolean {
  // In a real implementation, you would check against a stored token
  // For now, we'll just check if it exists and has a minimum length
  return typeof token === 'string' && token.length >= 32;
}

// Generate secure random token
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}
