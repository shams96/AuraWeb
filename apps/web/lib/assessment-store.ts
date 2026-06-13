/**
 * Server-side assessment store.
 * Reads/writes data/assessments.json.
 * Tracks each customer's skin journey across multiple consultations.
 * Never import from 'use client' components.
 */

import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

export type AssessmentMode = 'discovery' | 'check-in' | 'evolution'
export type Protocol = 't1' | 't2' | 't3' | 't4'

export interface BaumannProfile {
  doScore: number   // 0=dry → 10=oily
  srScore: number   // 0=resistant → 10=sensitive
  wScore: number    // 0=tight → 18=wrinkle-prone
  pScore: number    // 0=non-pigmented → 10=pigmented
  hydration: 'dry' | 'normal' | 'combination' | 'oily'
  sensitivity: 'resistant' | 'balanced' | 'sensitive'
  baumannLabel: string
}

export interface StoredAssessment {
  id: string
  userId: string | null       // null for guests
  guestId: string | null      // UUID cookie for guests
  mode: AssessmentMode
  completedAt: string
  answers: Record<string, unknown>
  profile: BaumannProfile
  protocol: Protocol
  concerns: string[]
  previousAssessmentId: string | null
  improvementNarrative: string | null
}

const STORE = path.join(process.cwd(), 'data', 'assessments.json')

function read(): StoredAssessment[] {
  try {
    const raw = fs.readFileSync(STORE, 'utf-8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : (parsed.assessments ?? [])
  } catch {
    return []
  }
}

function write(assessments: StoredAssessment[]): void {
  const dir = path.dirname(STORE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(STORE, JSON.stringify({ assessments }, null, 2))
}

export function getAssessmentsByUser(userId: string): StoredAssessment[] {
  return read()
    .filter(a => a.userId === userId)
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
}

export function getAssessmentsByGuest(guestId: string): StoredAssessment[] {
  return read()
    .filter(a => a.guestId === guestId)
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
}

export function getLatestAssessment(userId: string | null, guestId: string | null): StoredAssessment | null {
  if (!userId && !guestId) return null
  const all = read().filter(a =>
    (userId && a.userId === userId) ||
    (guestId && a.guestId === guestId)
  )
  if (!all.length) return null
  return all.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())[0]
}

/** Migrate all guest assessments to a userId on registration/login */
export function migrateGuestAssessments(guestId: string, userId: string): number {
  const all = read()
  let count = 0
  const updated = all.map(a => {
    if (a.guestId === guestId && !a.userId) {
      count++
      return { ...a, userId }
    }
    return a
  })
  if (count > 0) write(updated)
  return count
}

function buildImprovementNarrative(prev: StoredAssessment, current: BaumannProfile): string {
  const lines: string[] = []
  const p = prev.profile

  const srDelta = p.srScore - current.srScore
  if (srDelta >= 2) lines.push('Your skin\'s sensitivity has reduced — a sign your barrier is strengthening.')
  else if (srDelta <= -2) lines.push('Your sensitivity has increased — your skin may need a gentler approach.')

  const wDelta = p.wScore - current.wScore
  if (wDelta >= 2) lines.push('Fine lines and firmness have improved since your last consultation.')
  else if (wDelta <= -2) lines.push('Your skin is showing new signs of ageing — your protocol may need to advance.')

  const doDelta = Math.abs(p.doScore - current.doScore)
  if (doDelta >= 2) lines.push('Your hydration balance has shifted — your ritual is adapting your skin.')

  if (lines.length === 0) {
    lines.push('Your skin profile remains consistent — your ritual is maintaining your results.')
  }

  return lines.join(' ')
}

export function saveAssessment(data: {
  userId: string | null
  guestId: string | null
  answers: Record<string, unknown>
  profile: BaumannProfile
  protocol: Protocol
  concerns: string[]
}): StoredAssessment {
  const all = read()
  const previous = getLatestAssessment(data.userId, data.guestId)

  const weeksSinceLast = previous
    ? (Date.now() - new Date(previous.completedAt).getTime()) / (1000 * 60 * 60 * 24 * 7)
    : null

  const mode: AssessmentMode =
    !previous ? 'discovery' :
    weeksSinceLast! < 12 ? 'check-in' : 'evolution'

  const improvementNarrative = previous
    ? buildImprovementNarrative(previous, data.profile)
    : null

  const assessment: StoredAssessment = {
    id: randomUUID(),
    userId: data.userId,
    guestId: data.guestId,
    mode,
    completedAt: new Date().toISOString(),
    answers: data.answers,
    profile: data.profile,
    protocol: data.protocol,
    concerns: data.concerns,
    previousAssessmentId: previous?.id ?? null,
    improvementNarrative,
  }

  write([...all, assessment])
  return assessment
}

export function getAssessmentHistory(userId: string | null, guestId: string | null): StoredAssessment[] {
  if (!userId && !guestId) return []
  return read()
    .filter(a =>
      (userId && a.userId === userId) ||
      (guestId && a.guestId === guestId)
    )
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
}
