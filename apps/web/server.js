// Force production mode by default -- without this, any launcher that
// doesn't explicitly export NODE_ENV=production (npm run start, node
// server.js, PM2, Hostinger's Passenger runner) silently falls back to
// Next.js dev mode: on-demand per-route compilation instead of the
// already-built .next output. That's slow enough on first load to look
// like a hung/broken page (e.g. the Grand Door never finishing its
// client-side hydration), despite `next build` having succeeded.
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production'

const { createServer } = require('http')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`Chiarel ready on port ${port}`)
  })
})
