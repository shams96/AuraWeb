import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | null }

function createPrismaClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) {
    if (process.env.NODE_ENV !== 'test') {
      console.warn('[prisma] DATABASE_URL not set — DB operations will be skipped in dev')
    }
    return null
  }
  return new PrismaClient({ log: process.env.NODE_ENV === 'development' ? ['error'] : [] })
}

export const prisma: PrismaClient | null =
  globalForPrisma.prisma !== undefined
    ? globalForPrisma.prisma
    : createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
