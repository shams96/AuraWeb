interface OrderItem { name: string; quantity: number; price: number }

const base = (content: string) => `
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body{margin:0;padding:0;background:#FDFAF5;font-family:Georgia,serif;color:#1A1614}
  .wrap{max-width:560px;margin:0 auto;padding:40px 24px}
  .logo{font-size:22px;font-weight:700;letter-spacing:0.12em;color:#913832;text-transform:uppercase;margin-bottom:32px}
  .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(145,56,50,0.25),transparent);margin:24px 0}
  .gold{color:#913832}
  .muted{color:#7A5C4E;font-size:13px;line-height:1.6}
  .btn{display:inline-block;background:#913832;color:#fff;padding:14px 32px;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;border-radius:4px}
  table{width:100%;border-collapse:collapse}
  td{padding:10px 0;border-bottom:1px solid rgba(145,56,50,0.08);font-size:14px}
  .total{font-size:18px;font-weight:700;color:#913832}
</style></head>
<body><div class="wrap">${content}</div></body></html>`

export function orderConfirmationEmail(data: {
  orderNumber: string
  customerName: string
  items: OrderItem[]
  total: number
  currency: string
}) {
  const rows = data.items.map(i =>
    `<tr><td>${i.name}</td><td style="text-align:right">×${i.quantity}</td><td style="text-align:right">${data.currency}${(i.price * i.quantity).toFixed(2)}</td></tr>`
  ).join('')

  return base(`
    <div class="logo">Isola Vitale</div>
    <h2 style="font-size:24px;margin:0 0 8px">Order Confirmed</h2>
    <p class="muted">Thank you, ${data.customerName}. Your order <strong class="gold">#${data.orderNumber}</strong> has been received and is being prepared at our Natural You Srl facility in Isola del Liri, Italy.</p>
    <div class="divider"></div>
    <table><tbody>${rows}</tbody>
      <tfoot><tr><td colspan="2" style="font-weight:700;padding-top:16px">Total</td>
      <td style="text-align:right" class="total">${data.currency}${data.total.toFixed(2)}</td></tr></tfoot>
    </table>
    <div class="divider"></div>
    <p class="muted">Your 48-hour Time To Wow experience begins the moment your protocol arrives. Expect delivery within 3–5 working days.</p>
    <a class="btn" href="${process.env.NEXTAUTH_URL}/account/orders">View Order</a>
    <p class="muted" style="margin-top:32px">Questions? Reply to this email or visit <a href="${process.env.NEXTAUTH_URL}/contact" style="color:#913832">isolavitale.com/contact</a></p>
  `)
}

export function returnConfirmationEmail(data: {
  orderNumber: string
  customerName: string
  reason: string
}) {
  return base(`
    <div class="logo">Isola Vitale</div>
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
    <div class="logo">Isola Vitale</div>
    <h2 style="font-size:24px;margin:0 0 8px">Welcome to the Circle</h2>
    <p class="muted">Thank you for joining the Isola Vitale inner circle. You'll receive curated science briefings, early access to new protocols, and exclusive clinical insights — never promotional noise.</p>
    <div class="divider"></div>
    <a class="btn" href="${process.env.NEXTAUTH_URL}/shop">Discover Your Protocol</a>
  `)
}
