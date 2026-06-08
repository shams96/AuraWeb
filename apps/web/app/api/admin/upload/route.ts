import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import { randomBytes } from 'crypto'
import path from 'path'

const ADMIN_ROLES    = new Set(['ADMIN', 'OWNER'])
const ALLOWED_TYPES  = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'])
const ALLOWED_EXTS   = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'])
const MAX_BYTES      = 8 * 1024 * 1024 // 8 MB

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const role    = (session?.user as { role?: string })?.role ?? ''
  if (!ADMIN_ROLES.has(role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const formData = await req.formData()
  const file     = formData.get('image') as File | null

  if (!file)                          return NextResponse.json({ error: 'No file provided' },     { status: 400 })
  if (!ALLOWED_TYPES.has(file.type))  return NextResponse.json({ error: 'Invalid file type' },   { status: 400 })
  if (file.size > MAX_BYTES)          return NextResponse.json({ error: 'File exceeds 8 MB' },    { status: 400 })

  // Validate extension from filename — strip everything except the final segment
  const rawExt = (file.name.split('.').pop() ?? '').toLowerCase()
  if (!ALLOWED_EXTS.has(rawExt)) return NextResponse.json({ error: 'Invalid file extension' }, { status: 400 })

  const filename  = `product-${Date.now()}-${randomBytes(4).toString('hex')}.${rawExt}`
  const uploadDir = path.join(process.cwd(), 'public', 'images', 'products')

  await mkdir(uploadDir, { recursive: true })
  await writeFile(path.join(uploadDir, filename), Buffer.from(await file.arrayBuffer()))

  return NextResponse.json({ url: `/images/products/${filename}` })
}
