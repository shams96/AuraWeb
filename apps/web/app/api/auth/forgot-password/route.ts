import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import fs from 'fs'
import path from 'path'
import { findUserByEmail } from '@/lib/user-store'
import { resend, FROM_EMAIL } from '@/lib/resend'

interface ResetToken {
  email: string
  token: string
  expiresAt: number
}

const TOKENS_PATH = path.join(process.cwd(), 'data', 'reset-tokens.json')

function loadTokens(): ResetToken[] {
  try {
    return JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf-8'))
  } catch {
    return []
  }
}

function saveTokens(tokens: ResetToken[]): void {
  const dir = path.dirname(TOKENS_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(TOKENS_PATH, JSON.stringify(tokens, null, 2))
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email?.trim()) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    const emailLower = email.toLowerCase().trim()
    const user       = findUserByEmail(emailLower)

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({ ok: true })
    }

    // Generate token (expire in 1 hour)
    const token    = randomBytes(32).toString('hex')
    const expiresAt = Date.now() + 60 * 60 * 1000

    // Purge old tokens for this email, add new one
    const tokens = loadTokens().filter(t => t.email !== emailLower && t.expiresAt > Date.now())
    tokens.push({ email: emailLower, token, expiresAt })
    saveTokens(tokens)

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`

    if (resend) {
      await resend.emails.send({
        from:    FROM_EMAIL,
        to:      emailLower,
        subject: 'Reset your Isola Vitale password',
        html: `
          <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;background:#FDFAF5;color:#1A1614;padding:48px 40px;">
            <p style="color:#913832;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.3em;margin:0 0 24px;">Isola Vitale</p>
            <h1 style="font-size:22px;margin:0 0 16px;font-style:italic">Reset your password</h1>
            <p style="color:#7A5C4E;line-height:1.7;margin:0 0 28px;">
              We received a request to reset the password for your account.
              Click the button below — this link is valid for one hour.
            </p>
            <a href="${resetUrl}" style="display:inline-block;background:#913832;color:#fff;padding:14px 32px;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;border-radius:4px;">
              Reset Password
            </a>
            <p style="color:#7A5C4E;font-size:12px;margin-top:28px;line-height:1.6;">
              If you did not request this, you can safely ignore this email.<br>
              Your password will not change.
            </p>
            <hr style="border:none;border-top:1px solid rgba(145,56,50,0.1);margin:28px 0">
            <p style="color:#7A5C4E;font-size:11px;">
              Or paste this URL into your browser:<br>
              <span style="color:#913832">${resetUrl}</span>
            </p>
          </div>
        `,
      })
    } else {
      // Dev: log the reset URL so it can be used without email configured
      console.info(`[forgot-password] reset URL for ${emailLower}: ${resetUrl}`)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[forgot-password]', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
