import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { newsletterWelcomeEmail } from '@/lib/email-templates'

const DB_PATH = path.join(process.cwd(), 'data', 'subscribers.json')

async function readSubscribers(): Promise<string[]> {
  try {
    return JSON.parse(await fs.readFile(DB_PATH, 'utf8'))
  } catch {
    return []
  }
}

async function writeSubscribers(data: string[]): Promise<void> {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true })
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
}

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const subscribers = await readSubscribers()

  if (!subscribers.includes(email.toLowerCase())) {
    await writeSubscribers([...subscribers, email.toLowerCase()])

    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: 'Welcome to Isola Vitale — Your Protocol Awaits',
          html: newsletterWelcomeEmail({ email }),
        })
      } catch (err) {
        console.warn('[newsletter] welcome email failed:', err)
      }
    }
  }

  return NextResponse.json({ ok: true })
}
