import { NextRequest, NextResponse } from 'next/server';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  meta?: Record<string, any>;
  requestId?: string;
  userId?: string;
  userAgent?: string;
  ip?: string;
}

class Logger {
  private level: LogLevel;

  constructor(level: LogLevel = LogLevel.INFO) {
    this.level = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.level;
  }

  private formatLogEntry(entry: LogEntry): string {
    const { timestamp, level, message, meta, requestId, userId, userAgent, ip } = entry;
    
    const levelStr = LogLevel[level];
    const context = [
      requestId ? `reqId=${requestId}` : '',
      userId ? `userId=${userId}` : '',
      ip ? `ip=${ip}` : '',
      userAgent ? `ua=${userAgent}` : '',
    ].filter(Boolean).join(' ');
    
    const metaStr = meta ? JSON.stringify(meta) : '';
    
    return `[${timestamp}] ${levelStr}: ${message} ${context} ${metaStr}`.trim();
  }

  private log(level: LogLevel, message: string, meta?: Record<string, any>, request?: NextRequest) {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      meta,
    };

    // Add request context if available
    if (request) {
      entry.requestId = this.getRequestId(request);
      entry.userId = this.getUserId(request);
      entry.userAgent = request.headers.get('user-agent') || undefined;
      entry.ip = this.getClientIP(request);
    }

    const formatted = this.formatLogEntry(entry);
    
    // Log to console
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formatted);
        break;
      case LogLevel.INFO:
        console.info(formatted);
        break;
      case LogLevel.WARN:
        console.warn(formatted);
        break;
      case LogLevel.ERROR:
        console.error(formatted);
        break;
    }

    // In production, send to external logging service
    if (process.env.NODE_ENV === 'production') {
      this.sendToExternalService(entry);
    }
  }

  private getRequestId(request: NextRequest): string {
    // Try to get from header, otherwise generate
    return request.headers.get('x-request-id') || this.generateRequestId();
  }

  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private getUserId(request: NextRequest): string | undefined {
    // In a real implementation, you would extract from session or token
    return undefined;
  }

  private getClientIP(request: NextRequest): string | undefined {
    return (
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      request.ip ||
      undefined
    );
  }

  private async sendToExternalService(entry: LogEntry) {
    // In a real implementation, send to Sentry, Datadog, etc.
    // For now, we'll just log to console
    console.log('Sending to external service:', entry);
  }

  debug(message: string, meta?: Record<string, any>, request?: NextRequest) {
    this.log(LogLevel.DEBUG, message, meta, request);
  }

  info(message: string, meta?: Record<string, any>, request?: NextRequest) {
    this.log(LogLevel.INFO, message, meta, request);
  }

  warn(message: string, meta?: Record<string, any>, request?: NextRequest) {
    this.log(LogLevel.WARN, message, meta, request);
  }

  error(message: string, meta?: Record<string, any>, request?: NextRequest) {
    this.log(LogLevel.ERROR, message, meta, request);
  }

  // Error handling middleware
  errorHandler(error: Error, request?: NextRequest) {
    const errorInfo = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      ...(request && {
        url: request.url,
        method: request.method,
        headers: Object.fromEntries(request.headers.entries()),
      }),
    };

    this.error('Unhandled error', errorInfo, request);

    // In production, don't expose stack traces
    const isProduction = process.env.NODE_ENV === 'production';
    const response = {
      error: isProduction ? 'Internal Server Error' : error.message,
      ...(isProduction ? {} : { stack: error.stack }),
    };

    return NextResponse.json(response, { status: 500 });
  }

  // Request logging middleware
  logRequest(request: NextRequest) {
    const start = Date.now();
    
    this.info('Incoming request', {
      method: request.method,
      url: request.url,
      userAgent: request.headers.get('user-agent'),
    }, request);

    // Log response when it's sent
    const originalSend = Response.prototype.json;
    Response.prototype.json = function(body, init) {
      const duration = Date.now() - start;
      
      logger.info('Outgoing response', {
        method: request.method,
        url: request.url,
        status: init?.status || 200,
        duration,
      }, request);

      return originalSend.call(this, body, init);
    };

    return () => {
      const duration = Date.now() - start;
      this.info('Request completed', {
        method: request.method,
        url: request.url,
        duration,
      }, request);
    };
  }
}

// Create a singleton instance
export const logger = new Logger();

// Export for convenience
export { Logger };
