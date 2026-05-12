'use client'

import type { Product } from '@/lib/products'
import { HARDWARE_GOLD } from '@/lib/products'

interface PackagingVisualProps {
  product: Pick<Product, 'format' | 'finishColor' | 'name' | 'volume' | 'collection'>
  className?: string
}

// Shared label text rendered on packaging
function IVMonogram({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="11"
      fontWeight="700"
      fontFamily="'Playfair Display', Georgia, serif"
      letterSpacing="2"
      fill={color}
      opacity="0.55"
    >
      IV
    </text>
  )
}

// ─── Jar (creams, 50 ml) ──────────────────────────────────────────────────
function JarShape({ body, hardware, textColor }: { body: string; hardware: string; textColor: string }) {
  const highlight = body === '#F5F2EC' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.07)'
  return (
    <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="jar-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={body} stopOpacity="1" />
          <stop offset="40%" stopColor={body} stopOpacity="1" />
          <stop offset="100%" stopColor={body} stopOpacity="0.72" />
        </linearGradient>
        <linearGradient id="jar-hw" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={hardware} stopOpacity="0.7" />
          <stop offset="50%" stopColor={hardware} stopOpacity="1" />
          <stop offset="100%" stopColor={hardware} stopOpacity="0.6" />
        </linearGradient>
        <filter id="jar-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Drop shadow base */}
      <ellipse cx="50" cy="108" rx="28" ry="4" fill="rgba(0,0,0,0.18)" />

      {/* Lid */}
      <rect x="18" y="44" width="64" height="14" rx="4" fill="url(#jar-hw)" filter="url(#jar-shadow)" />
      {/* Lid edge highlight */}
      <rect x="18" y="44" width="64" height="2.5" rx="2" fill={hardware} opacity="0.5" />

      {/* Body */}
      <rect x="20" y="56" width="60" height="48" rx="5" fill="url(#jar-body)" filter="url(#jar-shadow)" />

      {/* Side highlight */}
      <rect x="20" y="56" width="10" height="48" rx="3" fill="url(#jar-body)" opacity="0.0" />
      <rect x="21" y="58" width="5" height="44" rx="2" fill={highlight} />

      {/* Hardware ring between lid and body */}
      <rect x="18" y="55" width="64" height="4" rx="1" fill={hardware} opacity="0.4" />

      {/* IV monogram */}
      <IVMonogram x={50} y={82} color={textColor} />

      {/* Thin base ring */}
      <rect x="20" y="101" width="60" height="3" rx="1.5" fill={hardware} opacity="0.3" />
    </svg>
  )
}

// ─── Pump bottle (cleansers, serums, SPF) ────────────────────────────────
function PumpShape({ body, hardware, textColor }: { body: string; hardware: string; textColor: string }) {
  const highlight = body === '#F5F2EC' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.07)'
  return (
    <svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="pump-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={body} stopOpacity="0.85" />
          <stop offset="35%" stopColor={body} stopOpacity="1" />
          <stop offset="100%" stopColor={body} stopOpacity="0.68" />
        </linearGradient>
        <linearGradient id="pump-hw" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={hardware} stopOpacity="0.65" />
          <stop offset="50%" stopColor={hardware} stopOpacity="1" />
          <stop offset="100%" stopColor={hardware} stopOpacity="0.55" />
        </linearGradient>
        <filter id="pump-shadow">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Shadow */}
      <ellipse cx="50" cy="130" rx="22" ry="3.5" fill="rgba(0,0,0,0.16)" />

      {/* Pump head */}
      <rect x="33" y="10" width="34" height="10" rx="5" fill="url(#pump-hw)" />
      {/* Pump neck */}
      <rect x="43" y="18" width="14" height="22" rx="3" fill="url(#pump-hw)" />
      {/* Pump collar */}
      <rect x="34" y="38" width="32" height="6" rx="3" fill={hardware} opacity="0.65" />

      {/* Bottle body */}
      <rect x="25" y="42" width="50" height="82" rx="8" fill="url(#pump-body)" filter="url(#pump-shadow)" />

      {/* Side highlight */}
      <rect x="26" y="44" width="7" height="78" rx="4" fill={highlight} />

      {/* Hardware shoulder band */}
      <rect x="25" y="42" width="50" height="4" rx="3" fill={hardware} opacity="0.35" />

      {/* IV monogram */}
      <IVMonogram x={50} y={86} color={textColor} />

      {/* Base band */}
      <rect x="25" y="120" width="50" height="4" rx="2" fill={hardware} opacity="0.3" />
    </svg>
  )
}

// ─── Dropper (essences, serums, 30 ml) ───────────────────────────────────
function DropperShape({ body, hardware, textColor }: { body: string; hardware: string; textColor: string }) {
  const highlight = body === '#F5F2EC' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)'
  return (
    <svg viewBox="0 0 100 148" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="drop-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={body} stopOpacity="0.82" />
          <stop offset="40%" stopColor={body} stopOpacity="1" />
          <stop offset="100%" stopColor={body} stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id="drop-hw" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={hardware} stopOpacity="0.6" />
          <stop offset="50%" stopColor={hardware} stopOpacity="1" />
          <stop offset="100%" stopColor={hardware} stopOpacity="0.5" />
        </linearGradient>
        <filter id="drop-shadow">
          <feDropShadow dx="0" dy="5" stdDeviation="7" floodOpacity="0.20" />
        </filter>
      </defs>

      {/* Shadow */}
      <ellipse cx="50" cy="138" rx="18" ry="3" fill="rgba(0,0,0,0.14)" />

      {/* Dropper rubber bulb */}
      <ellipse cx="50" cy="12" rx="12" ry="8" fill={hardware} opacity="0.75" />
      {/* Dropper cap tube */}
      <rect x="44" y="18" width="12" height="20" rx="3" fill="url(#drop-hw)" />
      {/* Cap collar */}
      <rect x="38" y="36" width="24" height="6" rx="3" fill={hardware} opacity="0.6" />

      {/* Bottle neck */}
      <rect x="41" y="40" width="18" height="18" rx="3" fill="url(#drop-body)" />

      {/* Bottle body */}
      <rect x="30" y="56" width="40" height="78" rx="7" fill="url(#drop-body)" filter="url(#drop-shadow)" />

      {/* Highlight */}
      <rect x="31" y="58" width="6" height="72" rx="3" fill={highlight} />

      {/* IV monogram */}
      <IVMonogram x={50} y={96} color={textColor} />

      {/* Base ring */}
      <rect x="30" y="130" width="40" height="4" rx="2" fill={hardware} opacity="0.28" />
    </svg>
  )
}

// ─── Mist / spray bottle ─────────────────────────────────────────────────
function MistShape({ body, hardware, textColor }: { body: string; hardware: string; textColor: string }) {
  const highlight = body === '#F5F2EC' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.07)'
  return (
    <svg viewBox="0 0 100 148" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="mist-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={body} stopOpacity="0.82" />
          <stop offset="40%" stopColor={body} stopOpacity="1" />
          <stop offset="100%" stopColor={body} stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id="mist-hw" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={hardware} stopOpacity="0.6" />
          <stop offset="50%" stopColor={hardware} stopOpacity="1" />
          <stop offset="100%" stopColor={hardware} stopOpacity="0.5" />
        </linearGradient>
        <filter id="mist-shadow">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodOpacity="0.20" />
        </filter>
      </defs>

      {/* Shadow */}
      <ellipse cx="50" cy="140" rx="22" ry="3.5" fill="rgba(0,0,0,0.14)" />

      {/* Spray nozzle arm */}
      <rect x="50" y="14" width="22" height="6" rx="3" fill="url(#mist-hw)" />
      <circle cx="72" cy="17" r="3.5" fill={hardware} opacity="0.8" />
      {/* Spray dots (mist) */}
      <circle cx="78" cy="11" r="1.2" fill={hardware} opacity="0.35" />
      <circle cx="82" cy="14" r="0.9" fill={hardware} opacity="0.25" />
      <circle cx="80" cy="8" r="0.7" fill={hardware} opacity="0.20" />

      {/* Pump collar */}
      <rect x="36" y="18" width="28" height="8" rx="4" fill="url(#mist-hw)" />
      {/* Pump neck */}
      <rect x="42" y="24" width="16" height="18" rx="3" fill="url(#mist-hw)" />

      {/* Shoulder collar */}
      <rect x="28" y="40" width="44" height="5" rx="3" fill={hardware} opacity="0.4" />

      {/* Bottle body */}
      <rect x="28" y="43" width="44" height="90" rx="8" fill="url(#mist-body)" filter="url(#mist-shadow)" />

      {/* Highlight */}
      <rect x="29" y="45" width="7" height="84" rx="3" fill={highlight} />

      {/* IV monogram */}
      <IVMonogram x={50} y={90} color={textColor} />

      {/* Base */}
      <rect x="28" y="129" width="44" height="4" rx="2" fill={hardware} opacity="0.3" />
    </svg>
  )
}

// ─── Eye pump (15 ml precision) ──────────────────────────────────────────
function EyePumpShape({ body, hardware, textColor }: { body: string; hardware: string; textColor: string }) {
  const highlight = body === '#F5F2EC' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)'
  return (
    <svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="eye-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={body} stopOpacity="0.82" />
          <stop offset="40%" stopColor={body} stopOpacity="1" />
          <stop offset="100%" stopColor={body} stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id="eye-hw" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={hardware} stopOpacity="0.6" />
          <stop offset="50%" stopColor={hardware} stopOpacity="1" />
          <stop offset="100%" stopColor={hardware} stopOpacity="0.5" />
        </linearGradient>
        <filter id="eye-shadow">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Shadow */}
      <ellipse cx="50" cy="122" rx="16" ry="2.5" fill="rgba(0,0,0,0.13)" />

      {/* Pump head */}
      <rect x="36" y="12" width="28" height="9" rx="4.5" fill="url(#eye-hw)" />
      {/* Pump neck */}
      <rect x="44" y="20" width="12" height="16" rx="3" fill="url(#eye-hw)" />
      {/* Collar */}
      <rect x="35" y="34" width="30" height="5" rx="2.5" fill={hardware} opacity="0.55" />

      {/* Bottle body — slim and tall */}
      <rect x="33" y="37" width="34" height="80" rx="6" fill="url(#eye-body)" filter="url(#eye-shadow)" />

      {/* Highlight */}
      <rect x="34" y="39" width="5" height="74" rx="2.5" fill={highlight} />

      {/* IV monogram */}
      <IVMonogram x={50} y={78} color={textColor} />

      {/* Base ring */}
      <rect x="33" y="113" width="34" height="4" rx="2" fill={hardware} opacity="0.3" />
    </svg>
  )
}

// ─── Collection background gradient ──────────────────────────────────────
const COLLECTION_BG: Record<string, string> = {
  laboratory: 'radial-gradient(ellipse at 60% 30%, rgba(15,36,25,0.55) 0%, rgba(15,36,25,0.20) 100%)',
  daily:      'radial-gradient(ellipse at 60% 30%, rgba(245,242,236,0.18) 0%, rgba(245,242,236,0.06) 100%)',
  chronos:    'radial-gradient(ellipse at 60% 30%, rgba(201,169,110,0.12) 0%, rgba(42,42,42,0.22) 100%)',
}

export function PackagingVisual({ product, className = '' }: PackagingVisualProps) {
  const { format, finishColor, collection } = product
  // Text/monogram colour: dark finish → light text, light finish → dark text
  const isLight = finishColor === '#F5F2EC' || finishColor === '#FAD6C9'
  const textColor = isLight ? 'rgba(15,36,25,0.55)' : 'rgba(245,242,236,0.60)'

  const shapeProps = { body: finishColor, hardware: HARDWARE_GOLD, textColor }

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${className}`}
      style={{ background: COLLECTION_BG[collection] ?? COLLECTION_BG.laboratory }}
    >
      <div className="w-[55%] h-[75%] drop-shadow-2xl">
        {format === 'jar'      && <JarShape      {...shapeProps} />}
        {format === 'pump'     && <PumpShape     {...shapeProps} />}
        {format === 'dropper'  && <DropperShape  {...shapeProps} />}
        {format === 'mist'     && <MistShape     {...shapeProps} />}
        {format === 'eye-pump' && <EyePumpShape  {...shapeProps} />}
      </div>
    </div>
  )
}
