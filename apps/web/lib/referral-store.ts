import fs from 'fs'
import path from 'path'
import { randomBytes } from 'crypto'

export type ReferralStatus = 'PENDING' | 'ATTRIBUTED' | 'REWARDED'

export interface Referral {
  id: string
  referrerId: string
  referrerEmail: string
  refereeEmail: string | null
  code: string
  status: ReferralStatus
  rewardCode: string | null
  clickCount: number
  createdAt: string
  convertedAt: string | null
  expiresAt: string
}

const STORE = path.join(process.cwd(), 'data', 'referrals.json')

function read(): Referral[] {
  try {
    const raw = JSON.parse(fs.readFileSync(STORE, 'utf-8'))
    return Array.isArray(raw) ? raw : (raw.referrals ?? [])
  } catch {
    return []
  }
}

function write(referrals: Referral[]): void {
  const dir = path.dirname(STORE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(STORE, JSON.stringify({ referrals }, null, 2))
}

export function generateCode(): string {
  return randomBytes(4).toString('hex') // 8-char lowercase hex
}

/** Returns the active referral record owned by this user, creating one if absent. */
export function getOrCreateReferral(referrerId: string, referrerEmail: string): Referral {
  const all = read()
  const existing = all.find(r => r.referrerId === referrerId && new Date(r.expiresAt) > new Date())
  if (existing) return existing

  const referral: Referral = {
    id:            randomBytes(8).toString('hex'),
    referrerId,
    referrerEmail,
    refereeEmail:  null,
    code:          generateCode(),
    status:        'PENDING',
    rewardCode:    null,
    clickCount:    0,
    createdAt:     new Date().toISOString(),
    convertedAt:   null,
    expiresAt:     new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
  }
  all.push(referral)
  write(all)
  return referral
}

export function findReferralByCode(code: string): Referral | undefined {
  return read().find(r => r.code === code)
}

export function findReferralByReferee(refereeEmail: string): Referral | undefined {
  return read().find(r => r.refereeEmail?.toLowerCase() === refereeEmail.toLowerCase())
}

export function getReferralsByReferrer(referrerId: string): Referral[] {
  return read().filter(r => r.referrerId === referrerId)
}

export function incrementClickCount(code: string): void {
  const all = read()
  const idx = all.findIndex(r => r.code === code)
  if (idx !== -1) { all[idx] = { ...all[idx], clickCount: all[idx].clickCount + 1 }; write(all) }
}

export function attributeReferral(code: string, refereeEmail: string): boolean {
  const all = read()
  const idx = all.findIndex(r => r.code === code)
  if (idx === -1) return false
  if (new Date(all[idx].expiresAt) < new Date()) return false
  if (all[idx].refereeEmail !== null) return false // already attributed
  // Prevent self-referral
  if (all[idx].referrerEmail.toLowerCase() === refereeEmail.toLowerCase()) return false

  all[idx] = { ...all[idx], refereeEmail, status: 'ATTRIBUTED' }
  write(all)
  return true
}

export function rewardReferral(code: string, rewardCode: string): void {
  const all = read()
  const idx = all.findIndex(r => r.code === code)
  if (idx === -1) return
  all[idx] = { ...all[idx], status: 'REWARDED', rewardCode, convertedAt: new Date().toISOString() }
  write(all)
}
