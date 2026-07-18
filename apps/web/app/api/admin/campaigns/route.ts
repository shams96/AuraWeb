import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { newsletterWelcomeEmail } from '@/lib/email-templates'

function isAdmin(session: { user?: unknown } | null) {
  return ['ADMIN', 'OWNER'].includes((session?.user as { role?: string })?.role ?? '')
}

const TEMPLATES: Record<string, { subject: string; html: (to: string) => string }> = {
  newsletter: {
    subject: 'Welcome to Chiarel — Your Protocol Awaits',
    html: (to: string) => newsletterWelcomeEmail({ email: to }),
  },
  reorder: {
    subject: 'Time to Resupply Your Chiarel Protocol',
    html: () => `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#1A1614;color:#FDFAF5;padding:40px 32px;border-radius:16px;">
        <p style="color:#9B4722;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.3em;">Your Protocol</p>
        <h1 style="font-family:'Georgia',serif;font-size:28px;margin:12px 0;">90 Days In — Time to Resupply</h1>
        <p style="color:rgba(253,250,245,0.6);line-height:1.7;">Your Chiarel protocol should be nearing completion. Maintain your results by reordering before your supply runs out.</p>
        <a href="https://chiarel.com/shop" style="display:inline-block;margin-top:24px;padding:14px 28px;background:#9B4722;color:#FDFAF5;text-decoration:none;border-radius:8px;font-size:11px;font-weight:900;letter-spacing:0.2em;text-transform:uppercase;">Reorder Now →</a>
      </div>
    `,
  },
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { template, subject, body, recipientType, email } = await req.json()

  if (!resend) {
    return NextResponse.json({ error: 'Email service not configured (RESEND_API_KEY missing)' }, { status: 503 })
  }

  const to = recipientType === 'email' ? email : 'delivered@resend.dev' // test endpoint for bulk

  let emailSubject = subject
  let emailHtml = body

  if (template !== 'custom') {
    const tmpl = TEMPLATES[template]
    if (!tmpl) return NextResponse.json({ error: 'Unknown template' }, { status: 400 })
    emailSubject = tmpl.subject
    emailHtml = tmpl.html(to)
  }

  if (!emailSubject || !emailHtml) {
    return NextResponse.json({ error: 'Subject and body are required for custom campaigns' }, { status: 400 })
  }

  try {
    await resend.emails.send({ from: FROM_EMAIL, to, subject: emailSubject, html: emailHtml })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Campaign send error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
