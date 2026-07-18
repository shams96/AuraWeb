export default function Home() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1A1614', color: '#FDFAF5' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#913832', marginBottom: 16 }}>
          Chiarel
        </p>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 8 }}>API Server</h1>
        <p style={{ color: 'rgba(253,250,245,0.45)', fontSize: '0.875rem' }}>Running on port 5001</p>
      </div>
    </main>
  )
}
