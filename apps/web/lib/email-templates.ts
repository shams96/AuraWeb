interface OrderItem { name: string; quantity: number; price: number }

const base = (content: string) => `
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body{margin:0;padding:0;background:#FDFAF5;font-family:Georgia,serif;color:#1A1614}
  .wrap{max-width:560px;margin:0 auto;padding:40px 24px}
  .logo{font-size:22px;font-weight:700;letter-spacing:0.12em;color:#9B4722;text-transform:uppercase;margin-bottom:32px}
  .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(155, 71, 34,0.25),transparent);margin:24px 0}
  .gold{color:#9B4722}
  .muted{color:#7A5C4E;font-size:13px;line-height:1.6}
  .btn{display:inline-block;background:#9B4722;color:#fff;padding:14px 32px;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;border-radius:4px}
  table{width:100%;border-collapse:collapse}
  td{padding:10px 0;border-bottom:1px solid rgba(155, 71, 34,0.08);font-size:14px}
  .total{font-size:18px;font-weight:700;color:#9B4722}
</style></head>
<body><div class="wrap">${content}</div></body></html>`

export function orderConfirmationEmail(data: {
  orderNumber: string
  customerName: string
  items: OrderItem[]
  total: number
  currency: string
  isSubscription?: boolean
}) {
  const rows = data.items.map(i =>
    `<tr><td>${i.name}</td><td style="text-align:right">×${i.quantity}</td><td style="text-align:right">${data.currency}${(i.price * i.quantity).toFixed(2)}</td></tr>`
  ).join('')

  const heading = data.isSubscription ? 'Your ritual membership is confirmed' : 'Your ritual is on its way'
  const subNote = data.isSubscription
    ? `<p class="muted" style="border-left:2px solid #9B4722;padding-left:16px;margin:16px 0;">
        Your ritual is now active. Your formulation arrives every 45 days — the interval a jar actually lasts, so nothing is wasted and nothing runs out.
        Manage or cancel anytime at <a href="${process.env.NEXTAUTH_URL}/account/subscription" style="color:#9B4722">your account</a>.
      </p>`
    : ''

  return base(`
    <div class="logo">Chiarel</div>
    <h2 style="font-size:24px;margin:0 0 8px">${heading}</h2>
    <p class="muted">Thank you, ${data.customerName}. Order <strong class="gold">#${data.orderNumber}</strong> is being prepared at Natural You Srl, Isola del Liri, Italy.</p>
    ${subNote}
    <div class="divider"></div>
    <table><tbody>${rows}</tbody>
      <tfoot><tr><td colspan="2" style="font-weight:700;padding-top:16px">Total</td>
      <td style="text-align:right" class="total">${data.currency}${data.total.toFixed(2)}</td></tr></tfoot>
    </table>
    <div class="divider"></div>
    <p class="muted">Your 48-hour Time To Wow experience begins the moment your formulation arrives. Expect delivery within 3–5 working days.</p>
    <a class="btn" href="${process.env.NEXTAUTH_URL}/account/orders">View Order</a>
    <p class="muted" style="margin-top:32px">Questions? Reply to this email or visit <a href="${process.env.NEXTAUTH_URL}/contact" style="color:#9B4722">chiarel.com/contact</a></p>
  `)
}

export function returnConfirmationEmail(data: {
  orderNumber: string
  customerName: string
  reason: string
}) {
  return base(`
    <div class="logo">Chiarel</div>
    <h2 style="font-size:24px;margin:0 0 8px">Return Request Received</h2>
    <p class="muted">Hi ${data.customerName}, we have received your return request for order <strong class="gold">#${data.orderNumber}</strong>.</p>
    <div class="divider"></div>
    <p class="muted"><strong>Reason:</strong> ${data.reason}</p>
    <p class="muted">Our client care team will respond within 24 hours with a prepaid return label. Once received and inspected, your refund will be processed within 5 business days.</p>
    <div class="divider"></div>
    <p class="muted">We're sorry this protocol didn't deliver your expected results. We would love to understand more — reply to this email to speak with a clinical advisor.</p>
  `)
}

export function newsletterWelcomeEmail(data: { email: string }) {
  return base(`
    <div class="logo">Chiarel</div>
    <h2 style="font-size:24px;margin:0 0 8px">Welcome to the Circle</h2>
    <p class="muted">Thank you for joining the Chiarel inner circle. You'll receive curated science briefings, early access to new protocols, and exclusive clinical insights — never promotional noise.</p>
    <div class="divider"></div>
    <a class="btn" href="${process.env.NEXTAUTH_URL}/shop">Discover Your Protocol</a>
  `)
}

export function accountWelcomeEmail(data: { name: string; accountType: 'personal' | 'business' }) {
  const firstName = data.name.split(' ')[0]
  const isPro = data.accountType === 'business'

  const heading = isPro
    ? `Your professional access is confirmed, ${firstName}.`
    : `Welcome to Chiarel, ${firstName}.`

  const body = isPro
    ? `Your professional account has been created. Once our team verifies your practice details (within 5 business days), you'll have full access to the Clinical A-Series, wholesale pricing, and IRB study data.`
    : `Your account is ready. Discover your protocol, build your ritual, and let science do the quiet work.`

  const ctaHref = isPro
    ? `${process.env.NEXTAUTH_URL}/professional`
    : `${process.env.NEXTAUTH_URL}/shop`

  const ctaLabel = isPro ? 'Visit Your Professional Portal' : 'Discover Your Protocol'

  return base(`
    <div class="logo">Chiarel</div>
    <h2 style="font-size:24px;margin:0 0 8px;font-style:italic">${heading}</h2>
    <p class="muted" style="margin:0 0 24px">${body}</p>
    <div class="divider"></div>
    ${isPro ? `
    <p class="muted" style="font-size:12px;border-left:2px solid #9B4722;padding-left:14px;margin-bottom:24px">
      In the meantime, you can explore consumer formulations and prepare your first order.
      Clinical A-Series access will be unlocked once your application is approved.
    </p>` : `
    <p class="muted" style="font-size:12px;margin-bottom:24px">
      Born in Isola del Liri, Lazio, Italy. Formulated by Natural You Srl.
      Science that whispers — never shouts.
    </p>`}
    <a class="btn" href="${ctaHref}">${ctaLabel}</a>
    <p class="muted" style="margin-top:32px;font-size:12px">
      Questions? Our concierge team is available at
      <a href="mailto:concierge@chiarel.com" style="color:#9B4722">concierge@chiarel.com</a>
    </p>
  `)
}

export function subscriptionReminderEmail(data: {
  customerName: string
  renewalDate: string
  total: number
  currency: string
}) {
  const firstName = data.customerName.split(' ')[0]
  return base(`
    <div class="logo">Chiarel</div>
    <h2 style="font-size:24px;margin:0 0 8px;font-style:italic">Your ritual renews in 3 days.</h2>
    <p class="muted">
      ${firstName}, your next formulation will be despatched on <strong class="gold">${data.renewalDate}</strong>
      and charged at <strong>${data.currency}${data.total.toFixed(2)}</strong>.
      It will arrive — as always — before you run out.
    </p>
    <div class="divider"></div>
    <p class="muted" style="font-size:12px">
      Need to update your delivery address or payment method? Visit your account before the renewal date.
    </p>
    <a class="btn" href="${process.env.NEXTAUTH_URL}/account/subscription">Manage Your Ritual</a>
    <p class="muted" style="margin-top:32px;font-size:12px">
      To cancel, visit your account at any time — no penalties, no questions.
    </p>
  `)
}

export function referralRewardEmail(data: {
  referrerName: string
  rewardCode: string
  refereeEmail: string
}) {
  const maskedEmail = data.refereeEmail.replace(/(.{2}).*(@.*)/, '$1…$2')
  return base(`
    <div class="logo">Chiarel</div>
    <h2 style="font-size:24px;margin:0 0 8px;font-style:italic">Your invitation worked, ${data.referrerName}.</h2>
    <p class="muted" style="margin:0 0 24px">
      Someone you invited (<strong class="gold">${maskedEmail}</strong>) has just completed their first ritual order.
      Your Ambassador reward is ready.
    </p>
    <div class="divider"></div>
    <div style="background:#F4EAE2;border-radius:12px;padding:20px 24px;margin:24px 0;text-align:center">
      <p style="font-size:11px;font-weight:900;letter-spacing:0.25em;text-transform:uppercase;color:#9B4722;margin:0 0 8px">Your 10% Discount Code</p>
      <p style="font-size:28px;font-weight:900;color:#1A1614;letter-spacing:0.1em;margin:0;font-family:monospace">${data.rewardCode}</p>
      <p class="muted" style="font-size:12px;margin:8px 0 0">Single use · apply at checkout</p>
    </div>
    <a class="btn" href="${process.env.NEXTAUTH_URL}/account/referrals">View Your Rewards</a>
    <p class="muted" style="margin-top:24px;font-size:12px">
      Thank you for sharing Chiarel with someone who matters to you.
      Every great ritual deserves a great beginning.
    </p>
  `)
}
