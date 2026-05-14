/**
 * Server-side product store.
 * Reads/writes data/products.json. Falls back to the static ALL_PRODUCTS
 * seed on first run (auto-creates the JSON file).
 *
 * All functions are synchronous — safe to call from Next.js route handlers
 * and server components. Never import this file from 'use client' components.
 */

import fs   from 'fs'
import path from 'path'
import { ALL_PRODUCTS, Product } from './products'

const STORE = path.join(process.cwd(), 'data', 'products.json')

function read(): Product[] {
  try {
    return JSON.parse(fs.readFileSync(STORE, 'utf8')) as Product[]
  } catch {
    // First run — seed from static catalog and persist
    write(ALL_PRODUCTS)
    return ALL_PRODUCTS
  }
}

function write(products: Product[]): void {
  const dir = path.dirname(STORE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(STORE, JSON.stringify(products, null, 2))
}

export function getProducts(): Product[] {
  return read()
}

export function getProduct(id: string): Product | undefined {
  return read().find(p => p.id === id)
}

export function upsertProduct(product: Product): Product[] {
  const list = read()
  const idx  = list.findIndex(p => p.id === product.id)
  if (idx >= 0) list[idx] = product
  else list.push(product)
  write(list)
  return list
}

export function deleteProduct(id: string): Product[] {
  const list = read().filter(p => p.id !== id)
  write(list)
  return list
}
