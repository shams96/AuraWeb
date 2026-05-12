import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function isAdmin(session: { user?: unknown } | null) {
  return ['ADMIN', 'OWNER'].includes((session?.user as { role?: string })?.role ?? '')
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const page  = parseInt(searchParams.get('page')  ?? '1')
  const limit = parseInt(searchParams.get('limit') ?? '25')

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      skip:    (page - 1) * limit,
      take:    limit,
      orderBy: { createdAt: 'desc' },
      include: { items: true, user: { select: { name: true, email: true } } },
    }),
    prisma.order.count(),
  ])

  return NextResponse.json({ orders, total, page, pages: Math.ceil(total / limit) })
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id, status } = await req.json()
  const order = await prisma.order.update({ where: { id }, data: { status } })
  return NextResponse.json(order)
}
