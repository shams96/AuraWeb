import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

export async function GET() {
  const cwd = process.cwd()
  const storePath = path.join(cwd, 'data', 'users.json')
  const exists = fs.existsSync(storePath)
  let users: unknown[] = []
  let parseError = ''

  if (exists) {
    try {
      const raw = fs.readFileSync(storePath, 'utf-8')
      const parsed = JSON.parse(raw)
      users = Array.isArray(parsed) ? parsed : (parsed.users ?? [])
    } catch (e) {
      parseError = String(e)
    }
  }

  return NextResponse.json({
    cwd,
    storePath,
    fileExists: exists,
    userCount: (users as {email:string}[]).length,
    emails: (users as {email:string}[]).map(u => u.email),
    parseError,
  })
}
