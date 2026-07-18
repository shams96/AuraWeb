/**
 * Server-side user store.
 * Reads/writes data/users.json. Never import from 'use client' components.
 */

import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import bcrypt from 'bcryptjs'

export interface StoredUser {
  id: string
  email: string
  name: string
  passwordHash: string
  role: 'CUSTOMER' | 'PROFESSIONAL' | 'ADMIN' | 'OWNER'
  accountType: 'personal' | 'business'
  createdAt: string
  loyaltyPoints?: number
}

const STORE = path.join(process.cwd(), 'data', 'users.json')

function read(): StoredUser[] {
  try {
    const raw = fs.readFileSync(STORE, 'utf-8')
    const parsed = JSON.parse(raw)
    // Handle both { users: [...] } and plain [...] formats
    return Array.isArray(parsed) ? parsed : (parsed.users ?? [])
  } catch {
    return []
  }
}

function write(users: StoredUser[]): void {
  const dir = path.dirname(STORE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(STORE, JSON.stringify({ users }, null, 2))
}

export function getUsers(): StoredUser[] {
  return read()
}

export function findUserByEmail(email: string): StoredUser | undefined {
  return read().find(u => u.email.toLowerCase() === email.toLowerCase())
}

export function findUserById(id: string): StoredUser | undefined {
  return read().find(u => u.id === id)
}

export function createUser(data: {
  name: string
  email: string
  password: string
  accountType?: 'personal' | 'business'
  role?: StoredUser['role']
}): StoredUser {
  const users = read()
  if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error('EMAIL_EXISTS')
  }
  const passwordHash = bcrypt.hashSync(data.password, 12)
  const user: StoredUser = {
    id: randomUUID(),
    email: data.email.toLowerCase().trim(),
    name: data.name.trim(),
    passwordHash,
    role: data.role ?? (data.accountType === 'business' ? 'PROFESSIONAL' : 'CUSTOMER'),
    accountType: data.accountType ?? 'personal',
    createdAt: new Date().toISOString(),
  }
  users.push(user)
  write(users)
  return user
}

export async function verifyPassword(user: StoredUser, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.passwordHash)
}

export function addLoyaltyPoints(email: string, points: number): void {
  const users = read()
  const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase())
  if (idx === -1) return
  users[idx] = { ...users[idx], loyaltyPoints: (users[idx].loyaltyPoints ?? 0) + points }
  write(users)
}

/** Ensure a default admin account exists. Called at auth startup. */
export function ensureAdminUser(): void {
  const existing = findUserByEmail('admin@chiarel.com')
  if (existing) return
  const seedPassword = process.env.ADMIN_SEED_PASSWORD ?? 'IsolaAdmin2024!'
  const passwordHash = bcrypt.hashSync(seedPassword, 12)
  const users = read()
  users.push({
    id: randomUUID(),
    email: 'admin@chiarel.com',
    name: 'Admin',
    passwordHash,
    role: 'OWNER',
    accountType: 'business',
    createdAt: new Date().toISOString(),
  })
  write(users)
}
