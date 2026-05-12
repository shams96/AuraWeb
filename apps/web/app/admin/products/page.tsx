'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Archive, X, Check, Loader2 } from 'lucide-react'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  sku: string
  status: string
  quantity: number
  description: string
}

const EMPTY: Omit<Product, 'id'> = { name: '', slug: '', price: 0, sku: '', status: 'DRAFT', quantity: 0, description: '' }

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [form, setForm] = useState<Partial<Product>>(EMPTY)

  async function load() {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/products')
      if (!r.ok) throw new Error('Failed')
      setProducts(await r.json())
    } catch {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function openAdd() { setForm(EMPTY); setModal('add') }
  function openEdit(p: Product) { setForm(p); setModal('edit') }

  async function save() {
    setSaving(true)
    setError('')
    try {
      const method = modal === 'add' ? 'POST' : 'PATCH'
      const r = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!r.ok) throw new Error('Save failed')
      setModal(null)
      load()
    } catch {
      setError('Save failed. Try again.')
    } finally {
      setSaving(false)
    }
  }

  async function archive(id: string) {
    if (!confirm('Archive this product?')) return
    try {
      await fetch('/api/admin/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      load()
    } catch {
      setError('Archive failed')
    }
  }

  const STATUS_DOT: Record<string, string> = {
    ACTIVE: '#4ade80', DRAFT: '#facc15', ARCHIVED: '#f87171',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: 'var(--iv-gold)' }}>Catalogue</p>
          <h1 className="text-2xl font-bold text-iv-white" style={{ fontFamily: "'Playfair Display', serif" }}>Products</h1>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest"
          style={{ background: 'var(--iv-gold)', color: 'var(--iv-white)' }}
        >
          <Plus size={15} /> Add Product
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-300" style={{ background: 'rgba(145,56,50,0.15)', border: '1px solid rgba(145,56,50,0.30)' }}>
          {error}
        </div>
      )}

      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}>
        <div className="px-6 py-3 grid grid-cols-[1fr_100px_80px_80px_120px_80px] gap-4 text-[10px] font-black uppercase tracking-widest text-iv-cream/30 border-b" style={{ borderColor: 'rgba(145,56,50,0.14)' }}>
          <span>Product</span><span>SKU</span><span className="text-right">Price</span><span className="text-right">Stock</span><span className="text-center">Status</span><span />
        </div>

        {loading ? (
          <div className="px-6 py-16 text-center text-iv-cream/40">
            <Loader2 size={24} className="animate-spin mx-auto mb-3" style={{ color: 'var(--iv-gold)' }} />
            Loading…
          </div>
        ) : products.length === 0 ? (
          <div className="px-6 py-16 text-center text-iv-cream/40 text-sm">No products yet — add your first.</div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'rgba(145,56,50,0.08)' }}>
            {products.map((p) => (
              <div key={p.id} className="px-6 py-4 grid grid-cols-[1fr_100px_80px_80px_120px_80px] gap-4 items-center">
                <div>
                  <p className="text-sm font-medium text-iv-white">{p.name}</p>
                  <p className="text-xs text-iv-cream/30 mt-0.5">{p.slug}</p>
                </div>
                <p className="text-xs text-iv-cream/50 font-mono">{p.sku}</p>
                <p className="text-sm text-right font-semibold text-iv-white">£{Number(p.price).toFixed(2)}</p>
                <p className="text-sm text-right text-iv-cream/60">{p.quantity}</p>
                <div className="flex justify-center">
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(145,56,50,0.12)', color: 'var(--iv-cream)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: STATUS_DOT[p.status] ?? '#888' }} />
                    {p.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-iv-cream/40 hover:text-iv-white transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => archive(p.id)} className="p-1.5 rounded-lg text-iv-cream/40 hover:text-red-400 transition-colors">
                    <Archive size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(26,22,20,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-lg rounded-2xl p-8" style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.25)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-iv-white">{modal === 'add' ? 'Add Product' : 'Edit Product'}</h2>
              <button onClick={() => setModal(null)} className="text-iv-cream/40 hover:text-iv-white"><X size={18} /></button>
            </div>

            <div className="space-y-4">
              {[
                { key: 'name', label: 'Name', type: 'text' },
                { key: 'slug', label: 'Slug', type: 'text' },
                { key: 'sku',  label: 'SKU',  type: 'text' },
                { key: 'description', label: 'Description', type: 'textarea' },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-iv-cream/40 mb-1.5">{label}</label>
                  {type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={(form as Record<string, string>)[key] ?? ''}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 text-sm text-iv-white outline-none resize-none"
                      style={{ background: 'rgba(145,56,50,0.07)', border: '1px solid rgba(145,56,50,0.18)' }}
                    />
                  ) : (
                    <input
                      type={type}
                      value={(form as Record<string, string>)[key] ?? ''}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 text-sm text-iv-white outline-none"
                      style={{ background: 'rgba(145,56,50,0.07)', border: '1px solid rgba(145,56,50,0.18)' }}
                    />
                  )}
                </div>
              ))}

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-iv-cream/40 mb-1.5">Price (£)</label>
                  <input
                    type="number" step="0.01" min="0"
                    value={form.price ?? 0}
                    onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) }))}
                    className="w-full rounded-xl px-4 py-3 text-sm text-iv-white outline-none"
                    style={{ background: 'rgba(145,56,50,0.07)', border: '1px solid rgba(145,56,50,0.18)' }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-iv-cream/40 mb-1.5">Stock</label>
                  <input
                    type="number" min="0"
                    value={form.quantity ?? 0}
                    onChange={e => setForm(f => ({ ...f, quantity: parseInt(e.target.value) }))}
                    className="w-full rounded-xl px-4 py-3 text-sm text-iv-white outline-none"
                    style={{ background: 'rgba(145,56,50,0.07)', border: '1px solid rgba(145,56,50,0.18)' }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-iv-cream/40 mb-1.5">Status</label>
                  <select
                    value={form.status ?? 'DRAFT'}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full rounded-xl px-4 py-3 text-sm text-iv-white outline-none"
                    style={{ background: 'rgba(145,56,50,0.07)', border: '1px solid rgba(145,56,50,0.18)' }}
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="ACTIVE">Active</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            {error && <p className="mt-4 text-xs text-red-400">{error}</p>}

            <div className="flex gap-3 mt-6">
              <button
                onClick={save}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black uppercase tracking-widest"
                style={{ background: 'var(--iv-gold)', color: 'var(--iv-white)' }}
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                {modal === 'add' ? 'Create' : 'Save Changes'}
              </button>
              <button
                onClick={() => setModal(null)}
                className="px-6 py-3 rounded-xl text-sm font-medium text-iv-cream/60"
                style={{ border: '1px solid rgba(145,56,50,0.18)' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
