'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, Pencil, Trash2, X, Check, Loader2, Upload, ImageIcon } from 'lucide-react'
import type { Product } from '@/lib/products'

type AdminProduct = Product & { id: string }

const TIERS   = ['t1', 't2', 't3', 't4', 'clinical', 'consumer', 'best-seller'] as const
const COLLS   = ['laboratory', 'daily', 'chronos'] as const
const FORMATS = ['jar', 'pump', 'dropper', 'mist', 'eye-pump'] as const

function emptyProduct(): Omit<AdminProduct, 'id'> {
  return {
    name: '', price: 0, tier: 't1', collection: 'laboratory', format: 'dropper',
    finishColor: '#0F2419', image: '', rating: 5, reviewCount: 0, tags: [],
    description: '', tagline: '', badge: '', volume: '',
    isNew: false, isBestSeller: false,
  }
}

function slug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// ── Inline label + field helpers ──────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5"
        style={{ color: 'rgba(253,250,245,0.35)' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full rounded-xl px-4 py-3 text-sm text-iv-white outline-none transition-colors focus:ring-1 focus:ring-iv-gold/40'
const inputStyle = { background: 'rgba(145,56,50,0.07)', border: '1px solid rgba(145,56,50,0.20)' }

// ── Image uploader ────────────────────────────────────────────────────────

function ImageUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const [err, setErr]             = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setErr('')
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!r.ok) throw new Error('Upload failed')
      const { url } = await r.json()
      onChange(url)
    } catch {
      setErr('Upload failed — max 8 MB, JPG/PNG/WebP/AVIF')
    } finally {
      setUploading(false)
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-2">
      <div
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="relative rounded-xl overflow-hidden cursor-pointer transition-colors"
        style={{ border: '1px dashed rgba(145,56,50,0.30)', background: 'rgba(145,56,50,0.05)', minHeight: 120 }}
      >
        {value ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={value} alt="Product" className="w-full h-36 object-contain p-3" />
        ) : (
          <div className="flex flex-col items-center justify-center h-[120px] gap-2">
            {uploading
              ? <Loader2 size={22} className="animate-spin" style={{ color: 'var(--iv-gold)' }} />
              : <ImageIcon size={22} style={{ color: 'rgba(253,250,245,0.20)' }} />
            }
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(253,250,245,0.25)' }}>
              {uploading ? 'Uploading…' : 'Drop image or click'}
            </p>
          </div>
        )}
        {value && uploading && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(26,22,20,0.7)' }}>
            <Loader2 size={22} className="animate-spin" style={{ color: 'var(--iv-gold)' }} />
          </div>
        )}
      </div>
      {value && (
        <div className="flex gap-2">
          <input
            type="text" value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="/images/products/…"
            className={inputCls + ' text-xs font-mono'}
            style={inputStyle}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-3 rounded-xl text-xs font-black uppercase tracking-widest flex-shrink-0"
            style={{ background: 'rgba(145,56,50,0.15)', border: '1px solid rgba(145,56,50,0.25)', color: 'var(--iv-cream)' }}
          >
            Replace
          </button>
        </div>
      )}
      {err && <p className="text-xs text-red-400">{err}</p>}
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
    </div>
  )
}

// ── Modal ─────────────────────────────────────────────────────────────────

function ProductModal({
  mode, initial, onClose, onSaved,
}: {
  mode: 'add' | 'edit'
  initial: Partial<AdminProduct>
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState<Partial<AdminProduct>>(initial)
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')

  function set<K extends keyof AdminProduct>(k: K, v: AdminProduct[K]) {
    setForm(f => ({ ...f, [k]: v }))
  }

  async function save() {
    if (!form.name?.trim()) { setError('Name is required'); return }
    setSaving(true); setError('')
    try {
      const payload = {
        ...form,
        id: form.id ?? slug(form.name!) + '-' + Date.now(),
      }
      const r = await fetch('/api/admin/products', {
        method: mode === 'add' ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!r.ok) throw new Error('Save failed')
      onSaved()
    } catch {
      setError('Save failed — please try again')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto"
      style={{ background: 'rgba(26,22,20,0.88)', backdropFilter: 'blur(12px)' }}>
      <div className="w-full max-w-2xl rounded-2xl mb-8"
        style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.25)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-6"
          style={{ borderBottom: '1px solid rgba(145,56,50,0.14)' }}>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-0.5" style={{ color: 'var(--iv-gold)' }}>
              {mode === 'add' ? 'New Product' : 'Edit Product'}
            </p>
            <h2 className="text-lg font-semibold text-iv-white" style={{ fontFamily: 'var(--iv-font-serif)' }}>
              {mode === 'add' ? 'Add to Catalogue' : form.name || 'Edit'}
            </h2>
          </div>
          <button onClick={onClose} className="text-iv-cream/40 hover:text-iv-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-6">

          {/* Image upload */}
          <Field label="Product Image">
            <ImageUploader
              value={form.image ?? ''}
              onChange={url => set('image', url)}
            />
          </Field>

          {/* Name + tagline */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name *">
              <input type="text" value={form.name ?? ''} onChange={e => set('name', e.target.value)}
                placeholder="1A Clinical Peptide Essence"
                className={inputCls} style={inputStyle} />
            </Field>
            <Field label="Tagline">
              <input type="text" value={form.tagline ?? ''} onChange={e => set('tagline', e.target.value)}
                placeholder="Brief one-liner"
                className={inputCls} style={inputStyle} />
            </Field>
          </div>

          {/* Description */}
          <Field label="Description">
            <textarea rows={3} value={form.description ?? ''} onChange={e => set('description', e.target.value)}
              className={inputCls + ' resize-none'} style={inputStyle} />
          </Field>

          {/* Price + volume + badge */}
          <div className="grid grid-cols-3 gap-4">
            <Field label="Price (£)">
              <input type="number" step="0.01" min="0" value={form.price ?? 0}
                onChange={e => set('price', parseFloat(e.target.value) || 0)}
                className={inputCls} style={inputStyle} />
            </Field>
            <Field label="Volume">
              <input type="text" value={form.volume ?? ''} onChange={e => set('volume', e.target.value)}
                placeholder="30 ml"
                className={inputCls} style={inputStyle} />
            </Field>
            <Field label="Badge">
              <input type="text" value={form.badge ?? ''} onChange={e => set('badge', e.target.value)}
                placeholder="New · Best Seller"
                className={inputCls} style={inputStyle} />
            </Field>
          </div>

          {/* Tier + collection + format */}
          <div className="grid grid-cols-3 gap-4">
            <Field label="Tier">
              <select value={form.tier ?? 't1'} onChange={e => set('tier', e.target.value as Product['tier'])}
                className={inputCls} style={inputStyle}>
                {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Collection">
              <select value={form.collection ?? 'laboratory'} onChange={e => set('collection', e.target.value as Product['collection'])}
                className={inputCls} style={inputStyle}>
                {COLLS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Format">
              <select value={form.format ?? 'dropper'} onChange={e => set('format', e.target.value as Product['format'])}
                className={inputCls} style={inputStyle}>
                {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </Field>
          </div>

          {/* Rating + reviews */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Rating (0–5)">
              <input type="number" step="0.1" min="0" max="5" value={form.rating ?? 5}
                onChange={e => set('rating', parseFloat(e.target.value) || 0)}
                className={inputCls} style={inputStyle} />
            </Field>
            <Field label="Review Count">
              <input type="number" min="0" value={form.reviewCount ?? 0}
                onChange={e => set('reviewCount', parseInt(e.target.value) || 0)}
                className={inputCls} style={inputStyle} />
            </Field>
          </div>

          {/* Tags */}
          <Field label="Tags (comma-separated)">
            <input type="text"
              value={Array.isArray(form.tags) ? form.tags.join(', ') : ''}
              onChange={e => set('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
              placeholder="peptide, barrier, brightening"
              className={inputCls} style={inputStyle} />
          </Field>

          {/* Checkboxes */}
          <div className="flex gap-6">
            {([['isNew', 'New Arrival'], ['isBestSeller', 'Best Seller'], ['refillable', 'Refillable']] as const).map(([k, label]) => (
              <label key={k} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={!!(form as Record<string, unknown>)[k]}
                  onChange={e => set(k as keyof AdminProduct, e.target.checked as never)}
                  className="w-4 h-4 rounded accent-iv-gold" />
                <span className="text-xs font-medium text-iv-cream/60">{label}</span>
              </label>
            ))}
          </div>

          {/* Finish colour */}
          <div className="flex items-center gap-4">
            <Field label="Finish Colour">
              <div className="flex items-center gap-3">
                <input type="color" value={form.finishColor ?? '#0F2419'}
                  onChange={e => set('finishColor', e.target.value)}
                  className="w-12 h-10 rounded-lg cursor-pointer border-0 p-0.5"
                  style={{ background: 'rgba(145,56,50,0.07)', border: '1px solid rgba(145,56,50,0.20)' }} />
                <input type="text" value={form.finishColor ?? '#0F2419'}
                  onChange={e => set('finishColor', e.target.value)}
                  className={inputCls} style={{ ...inputStyle, fontFamily: 'monospace' }} />
              </div>
            </Field>
          </div>

        </div>

        {/* Footer */}
        <div className="flex gap-3 px-8 pb-7 pt-2">
          {error && <p className="self-center text-xs text-red-400 flex-1">{error}</p>}
          <div className="flex gap-3 ml-auto">
            <button onClick={onClose}
              className="px-6 py-3 rounded-xl text-sm font-medium text-iv-cream/50 hover:text-iv-cream/80 transition-colors"
              style={{ border: '1px solid rgba(145,56,50,0.18)' }}>
              Cancel
            </button>
            <button onClick={save} disabled={saving}
              className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-opacity"
              style={{ background: 'var(--iv-gold)', color: 'var(--iv-white)', opacity: saving ? 0.6 : 1 }}>
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
              {mode === 'add' ? 'Add Product' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Delete confirm ────────────────────────────────────────────────────────

function DeleteModal({ name, onConfirm, onClose }: { name: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(26,22,20,0.88)', backdropFilter: 'blur(12px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-8 text-center"
        style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.30)' }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(145,56,50,0.15)' }}>
          <Trash2 size={20} style={{ color: 'var(--iv-gold)' }} />
        </div>
        <h3 className="text-base font-semibold text-iv-white mb-2" style={{ fontFamily: 'var(--iv-font-serif)' }}>Remove Product</h3>
        <p className="text-sm text-iv-cream/50 mb-6">
          <span className="text-iv-white">{name}</span> will be permanently removed from the catalogue.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl text-sm font-medium text-iv-cream/60"
            style={{ border: '1px solid rgba(145,56,50,0.18)' }}>
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-3 rounded-xl text-sm font-black uppercase tracking-widest"
            style={{ background: 'rgba(145,56,50,0.7)', color: 'var(--iv-white)' }}>
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')
  const [modal, setModal]       = useState<{ mode: 'add' | 'edit'; product: Partial<AdminProduct> } | null>(null)
  const [delTarget, setDelTarget] = useState<AdminProduct | null>(null)

  async function load() {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/products')
      if (!r.ok) throw new Error()
      setProducts(await r.json())
    } catch {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function handleDelete() {
    if (!delTarget) return
    try {
      await fetch('/api/admin/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: delTarget.id }),
      })
      setDelTarget(null)
      load()
    } catch {
      setError('Delete failed')
    }
  }

  const TIER_COLOUR: Record<string, string> = {
    t1: '#4ade80', t2: '#60a5fa', t3: '#f59e0b', t4: '#a78bfa',
    clinical: '#f87171', consumer: '#34d399', 'best-seller': '#fbbf24',
  }

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: 'var(--iv-gold)' }}>
            Catalogue Management
          </p>
          <h1 className="text-2xl font-semibold text-iv-white" style={{ fontFamily: 'var(--iv-font-serif)' }}>
            Products
          </h1>
        </div>
        <button
          onClick={() => setModal({ mode: 'add', product: emptyProduct() })}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest"
          style={{ background: 'var(--iv-gold)', color: 'var(--iv-white)' }}>
          <Plus size={15} /> New Product
        </button>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 rounded-xl text-sm text-red-300"
          style={{ background: 'rgba(145,56,50,0.12)', border: '1px solid rgba(145,56,50,0.28)' }}>
          {error}
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}>
        {/* Col headers */}
        <div className="px-6 py-3 grid items-center gap-4 text-[10px] font-black uppercase tracking-widest"
          style={{ borderBottom: '1px solid rgba(145,56,50,0.14)', color: 'rgba(253,250,245,0.28)',
            gridTemplateColumns: '56px 1fr 90px 90px 80px 64px' }}>
          <span />
          <span>Product</span>
          <span className="text-center">Tier</span>
          <span className="text-center">Collection</span>
          <span className="text-right">Price</span>
          <span />
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center gap-3 text-iv-cream/30">
            <Loader2 size={24} className="animate-spin" style={{ color: 'var(--iv-gold)' }} />
            <span className="text-xs uppercase tracking-widest font-black">Loading catalogue…</span>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center text-iv-cream/30 text-sm">
            No products yet — click <strong className="text-iv-white">New Product</strong> to add your first.
          </div>
        ) : (
          <div>
            {products.map((p) => (
              <div key={p.id}
                className="px-6 py-4 grid items-center gap-4 transition-colors hover:bg-white/[0.02]"
                style={{ borderBottom: '1px solid rgba(145,56,50,0.07)',
                  gridTemplateColumns: '56px 1fr 90px 90px 80px 64px' }}>

                {/* Thumbnail */}
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
                  style={{ background: p.finishColor || '#0F2419', border: '1px solid rgba(145,56,50,0.14)' }}>
                  {p.image
                    /* eslint-disable-next-line @next/next/no-img-element */
                    ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    : <ImageIcon size={16} style={{ color: 'rgba(253,250,245,0.15)' }} />
                  }
                </div>

                {/* Name + tagline */}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-iv-white truncate">{p.name}</p>
                  {p.tagline && <p className="text-xs text-iv-cream/35 mt-0.5 truncate">{p.tagline}</p>}
                </div>

                {/* Tier badge */}
                <div className="flex justify-center">
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(145,56,50,0.10)', color: 'var(--iv-cream)' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: TIER_COLOUR[p.tier] ?? '#888' }} />
                    {p.tier}
                  </span>
                </div>

                {/* Collection */}
                <p className="text-xs text-center text-iv-cream/40 capitalize">{p.collection}</p>

                {/* Price */}
                <p className="text-sm text-right font-semibold text-iv-white">
                  £{Number(p.price).toFixed(0)}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-1 justify-end">
                  <button
                    onClick={() => setModal({ mode: 'edit', product: p })}
                    title="Edit"
                    className="p-2 rounded-lg text-iv-cream/30 hover:text-iv-white transition-colors">
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => setDelTarget(p)}
                    title="Delete"
                    className="p-2 rounded-lg text-iv-cream/30 hover:text-red-400 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-iv-cream/20 text-right">
        {products.length} product{products.length !== 1 ? 's' : ''} in catalogue
      </p>

      {/* Modals */}
      {modal && (
        <ProductModal
          mode={modal.mode}
          initial={modal.product}
          onClose={() => setModal(null)}
          onSaved={() => { setModal(null); load() }}
        />
      )}

      {delTarget && (
        <DeleteModal
          name={delTarget.name}
          onConfirm={handleDelete}
          onClose={() => setDelTarget(null)}
        />
      )}
    </div>
  )
}
