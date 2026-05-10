import { jest } from '@jest/globals';

// Mock Next.js modules
jest.mock('next/server', () => ({
  NextRequest: class {
    constructor(public url: string, public headers: Record<string, string> = {}) {}
    public method = 'GET';
    public ip = '127.0.0.1';
  },
  NextResponse: class {
    constructor(public body: any = null, public status: number = 200, public headers: Record<string, string> = {}) {}
    static json(body: any, init?: { status?: number; headers?: Record<string, string> }) {
      return new this(body, init?.status, init?.headers);
    }
  },
}));

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = 'test-secret';
process.env.STRIPE_SECRET_KEY = 'sk_test_test';
process.env.STRIPE_PUBLISHABLE_KEY = 'pk_test_test';
process.env.RESEND_API_KEY = 'test-key';
process.env.MEILISEARCH_URL = 'http://localhost:7700';
process.env.MEILISEARCH_MASTER_KEY = 'test-master-key';

// Mock Prisma
jest.mock('@aurabiosphere/config', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    category: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    cart: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    cartItem: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      aggregate: jest.fn(),
    },
    order: {
      create: jest.fn(),
      update: jest.fn(),
      findFirst: jest.fn(),
    },
    page: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    faq: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    tag: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    variant: {
      findMany: jest.fn(),
    },
    review: {
      findMany: jest.fn(),
    },
  },
}));

// Mock external services
jest.mock('stripe', () => ({
  Stripe: jest.fn().mockImplementation(() => ({
    checkout: {
      sessions: {
        create: jest.fn(),
        listLineItems: jest.fn(),
      },
    },
    webhooks: {
      constructEvent: jest.fn(),
    },
  })),
}));

jest.mock('meilisearch', () => ({
  MeiliSearch: jest.fn().mockImplementation(() => ({
    index: jest.fn().mockImplementation(() => ({
      fetchInfo: jest.fn(),
      addDocuments: jest.fn(),
      updateDocuments: jest.fn(),
      deleteDocument: jest.fn(),
      deleteAllDocuments: jest.fn(),
      search: jest.fn(),
      updateSettings: jest.fn(),
    })),
    createIndex: jest.fn(),
  })),
}));

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn(),
    },
  })),
}));

// Global test utilities
export const createMockRequest = (url: string, method = 'GET', headers = {}) => {
  return new (require('next/server').NextRequest)(url, headers);
};

export const createMockResponse = (body: any = null, status = 200, headers = {}) => {
  return new (require('next/server').NextResponse)(body, { status, headers });
};

export const mockPrisma = {
  reset: () => {
    jest.clearAllMocks();
  },
};

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});
