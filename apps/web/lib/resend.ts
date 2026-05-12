import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY not set — emails will be skipped in dev')
}

export const resend = new Resend(process.env.RESEND_API_KEY ?? 'no-key')

export const FROM_EMAIL = 'Isola Vitale <hello@isolavitale.com>'
