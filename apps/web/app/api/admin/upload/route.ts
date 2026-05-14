import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
const MAX_BYTES     = 8 * 1024 * 1024 // 8 MB

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('image') as File | null

  if (!file)                          return NextResponse.json({ error: 'No file provided' },     { status: 400 })
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  if (file.size > MAX_BYTES)          return NextResponse.json({ error: 'File exceeds 8 MB' },    { status: 400 })

  const ext      = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const filename = `product-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`
  const uploadDir = path.join(process.cwd(), 'public', 'images', 'products')

  await mkdir(uploadDir, { recursive: true })
  await writeFile(path.join(uploadDir, filename), Buffer.from(await file.arrayBuffer()))

  return NextResponse.json({ url: `/images/products/${filename}` })
}
