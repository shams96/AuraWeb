import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function isAdmin(session: { user?: unknown } | null) {
  return ['ADMIN', 'OWNER'].includes((session?.user as { role?: string })?.role ?? '')
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { variants: true },
  })
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const product = await prisma.product.create({
    data: {
      name:        body.name,
      slug:        body.slug ?? body.name.toLowerCase().replace(/\s+/g, '-'),
      description: body.description ?? '',
      price:       body.price,
      sku:         body.sku,
      status:      body.status ?? 'DRAFT',
      quantity:    body.quantity ?? 0,
    },
  })
  return NextResponse.json(product, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id, ...data } = await req.json()
  const product = await prisma.product.update({ where: { id }, data })
  return NextResponse.json(product)
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await req.json()
  await prisma.product.update({ where: { id }, data: { status: 'ARCHIVED' } })
  return NextResponse.json({ ok: true })
}
