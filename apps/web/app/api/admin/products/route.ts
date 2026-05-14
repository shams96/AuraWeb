import { NextRequest, NextResponse } from 'next/server'
import { getProducts, getProduct, upsertProduct, deleteProduct } from '@/lib/product-store'
import { Product } from '@/lib/products'

export async function GET() {
  return NextResponse.json(getProducts())
}

export async function POST(req: NextRequest) {
  const body = await req.json() as Product
  if (!body.id || !body.name) return NextResponse.json({ error: 'id and name required' }, { status: 400 })
  const list = upsertProduct(body)
  return NextResponse.json(list.find(p => p.id === body.id), { status: 201 })
}

export async function PATCH(req: NextRequest) {
  const body = await req.json() as Partial<Product> & { id: string }
  if (!body.id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const existing = getProduct(body.id)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const updated = { ...existing, ...body }
  upsertProduct(updated)
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  deleteProduct(id)
  return NextResponse.json({ ok: true })
}
