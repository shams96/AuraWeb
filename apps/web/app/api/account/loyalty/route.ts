import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { findUserByEmail } from '@/lib/user-store'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = findUserByEmail(session.user.email)
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const points = user.loyaltyPoints ?? 0

  const tier =
    points >= 2000 ? 'Oro'    :
    points >= 500  ? 'Verde'  :
                     'Acqua'

  return NextResponse.json({ points, tier })
}
