import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getProducts, getProduct, upsertProduct, deleteProduct } from '@/lib/product-store'
import { Product } from '@/lib/products'

const ADMIN_ROLES = new Set(['ADMIN', 'OWNER'])

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  const role = (session?.user as { role?: string })?.role ?? ''
  if (!ADMIN_ROLES.has(role)) return null
  return session
}

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  return NextResponse.json(getProducts())
}

export async function POST(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const body = await req.json() as Product
  if (!body.id || !body.name) return NextResponse.json({ error: 'id and name required' }, { status: 400 })
  const list = upsertProduct(body)
  return NextResponse.json(list.find(p => p.id === body.id), { status: 201 })
}

export async function PATCH(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const body = await req.json() as Partial<Product> & { id: string }
  if (!body.id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const existing = getProduct(body.id)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const updated = { ...existing, ...body }
  upsertProduct(updated)
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  deleteProduct(id)
  return NextResponse.json({ ok: true })
}
