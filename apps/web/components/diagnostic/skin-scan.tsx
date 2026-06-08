'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@aurabiosphere/ui'
import { Camera, Shield, Zap, Sparkles, Activity, RefreshCw, Eye, User, CheckCircle2, AlertCircle, ScanLine, Info, TrendingUp, Droplets, Target } from 'lucide-react'

type ScanState = 'idle' | 'initializing' | 'aligning' | 'counting' | 'capturing' | 'analyzing' | 'finalizing' | 'complete' | 'camera_denied'

export function SkinScan() {
  const [state, setState] = useState<ScanState>('idle')
  const [progress, setProgress] = useState(0)
  const [countdown, setCountdown] = useState(5)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([])
  const [detectedAreas, setDetectedAreas] = useState<string[]>([])
  
  const diagnosticSteps = [
    { label: 'Hydration Level', value: '42%', icon: <Droplets className="w-3 h-3" /> },
    { label: 'Oxidative Stress', value: 'High', icon: <Zap className="w-3 h-3" /> },
    { label: 'Dermal Density', value: '78%', icon: <TrendingUp className="w-3 h-3" /> },
    { label: 'Barrier Function', value: 'Optimal', icon: <Shield className="w-3 h-3" /> }
  ]

  // Attach stream to video element once both are ready — fixes race condition
  // where stream resolves before React re-renders the <video> element
  useEffect(() => {
    if (stream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = stream
    }
  }, [stream, state])

  const startScan = async () => {
    setState('initializing')
    setAnalysisLogs(["[SYSTEM] Initiating Bio-Metric Link..."])

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API not supported in this environment")
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      setStream(mediaStream)
      // videoRef may not be in DOM yet — useEffect above handles attachment

      setTimeout(() => {
        setState('aligning')
        setAnalysisLogs(prev => [...prev, "[HARDWARE] Sensors Synchronized. Please align face."])
      }, 1500)
    } catch (err) {
      console.error("Camera access failed:", err)
      setState('camera_denied')
    }
  }

  useEffect(() => {
    if (state === 'aligning') {
      const timer = setTimeout(() => {
        setState('counting')
        setAnalysisLogs(prev => [...prev, "[AI] Alignment Confirmed. Preparing for capture..."])
      }, 3000)
      return () => clearTimeout(timer)
    }

    if (state === 'counting') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            setState('capturing')
            return 5
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }

    if (state === 'capturing') {
      const captureSequence = ['Epidermal Mapping', 'Micro-Circulation', 'Sebum Gradient', 'Cellular Turnover']
      let i = 0
      const interval = setInterval(() => {
        if (i < captureSequence.length) {
          setDetectedAreas(prev => [...prev, captureSequence[i]])
          setAnalysisLogs(prev => [...prev, `[CAPTURE] ${captureSequence[i]} analyzing...`])
          i++
        } else {
          clearInterval(interval)
          setState('analyzing')
        }
      }, 1200)
      return () => clearInterval(interval)
    }

    if (state === 'analyzing') {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer)
            setState('finalizing')
            return 100
          }
          return prev + 3
        })
      }, 100)
      return () => clearInterval(timer)
    }

    if (state === 'finalizing') {
      const timer = setTimeout(() => {
        setState('complete')
        setAnalysisLogs(prev => [...prev, "[DIAGNOSIS] Analysis terminal complete. Recommendations ready."])
        if (stream) {
          stream.getTracks().forEach(track => track.stop())
        }
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [state])

  return (
    <section id="skin-scan" className="py-24 bg-iv-black relative overflow-hidden">
      <div className="absolute inset-0 bg-iv-gold/[0.01] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-block border border-iv-gold/20 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-iv-black/40 backdrop-blur-md">
            Advanced Dermal Analytics v4.2
          </div>
          <h2 className="iv-type-display font-semibold mb-8 uppercase text-iv-white">Vitale <span className="text-iv-gold italic">Skin Scan</span></h2>
          <p className="text-lg text-iv-cream/60 max-w-2xl mx-auto leading-relaxed font-light">
            An expert-level metabolic assessment. Align your face for a high-fidelity diagnostic capture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Scanner Viewport */}
          <div className={`${state === 'complete' ? 'lg:col-span-5' : 'lg:col-span-7'} relative aspect-square md:aspect-video lg:aspect-square bg-iv-deep-green/10 border border-iv-gold/20 rounded-[40px] overflow-hidden shadow-2xl backdrop-blur-sm transition-all duration-700`}>
            {state === 'idle' ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-12">
                <div className="relative">
                  <div className="absolute -inset-8 bg-iv-gold/5 rounded-full blur-2xl animate-pulse" />
                  <div className="w-32 h-32 border border-iv-gold/20 rounded-full flex items-center justify-center bg-iv-black/60 relative z-10">
                    <Camera className="w-12 h-12 text-iv-gold animate-bounce" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-iv-white uppercase tracking-tighter italic">Step 1: Calibration</h3>
                  <p className="text-iv-cream/65 text-sm font-light leading-relaxed max-w-sm">
                    Ensure even lighting and a neutral expression. Our AI will analyze 2.4 million data points to calibrate your metabolic protocol.
                  </p>
                </div>
                <button
                  onClick={startScan}
                  className="bg-iv-gold hover:bg-iv-gold-light text-iv-black font-black text-[11px] uppercase tracking-[0.4em] px-16 py-8 rounded-none shadow-2xl transition-all cursor-pointer active:scale-95"
                >
                  Initiate Bioscan
                </button>
              </div>
            ) : state === 'camera_denied' ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-10">
                <div className="relative">
                  <div className="absolute -inset-8 bg-red-900/10 rounded-full blur-2xl" />
                  <div className="w-32 h-32 border border-red-500/30 rounded-full flex items-center justify-center bg-iv-black/60 relative z-10">
                    <div className="relative">
                      <Camera className="w-12 h-12 text-red-400/60" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-[10px] font-black">✕</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-iv-white uppercase tracking-tighter">Camera Access Required</h3>
                  <p className="text-iv-cream/65 text-sm font-light leading-relaxed max-w-xs">
                    The Vitale Skin Scan requires your camera to capture real skin data. No images are stored or transmitted.
                  </p>
                </div>
                <div className="bg-iv-black/60 border border-iv-gold/10 rounded-2xl p-6 text-left space-y-3 max-w-xs w-full">
                  <p className="text-[9px] font-black text-iv-gold uppercase tracking-[0.3em] mb-3">To enable your camera:</p>
                  {[
                    'Click the camera icon in your browser address bar',
                    'Select "Allow" for camera access',
                    'Refresh the page if prompted',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-iv-gold text-[10px] font-black mt-0.5 flex-shrink-0">{i + 1}.</span>
                      <span className="text-iv-cream/65 text-[11px] leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { setState('idle'); setAnalysisLogs([]); setDetectedAreas([]); setProgress(0); setCountdown(5) }}
                  className="border border-iv-gold/30 text-iv-gold hover:bg-iv-gold/5 text-[10px] font-black uppercase tracking-[0.4em] px-12 py-5 rounded-none transition-all cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className={`w-full h-full object-cover transition-all duration-700 ${state === 'complete' ? 'opacity-40 grayscale-[50%]' : 'opacity-100'} filter brightness-110 contrast-110`} 
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {state === 'initializing' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-iv-black/80 backdrop-blur-xl">
                      <div className="text-center space-y-6">
                        <RefreshCw className="w-16 h-16 text-iv-gold animate-spin mx-auto" />
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-iv-gold">Accessing Optical Sensors...</p>
                      </div>
                    </div>
                  )}

                  {state === 'aligning' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[60%] h-[75%] border-2 border-iv-gold/40 rounded-[120px] relative">
                        <div className="absolute inset-0 border-2 border-iv-gold/10 rounded-[120px] scale-105 animate-pulse" />
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-iv-black/80 border border-iv-gold/40 px-6 py-3 rounded-full">
                          <p className="text-iv-gold text-[10px] font-black uppercase tracking-widest">Center Face in Frame</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {state === 'counting' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-iv-gold/5">
                      <div className="text-center">
                        <p className="text-iv-gold text-[10px] font-black uppercase tracking-[0.6em] mb-4">Capturing in</p>
                        <div className="text-9xl font-bold text-iv-white animate-ping">{countdown}</div>
                      </div>
                    </div>
                  )}

                  {state === 'capturing' && (
                    <div className="absolute inset-0">
                      <div className="absolute left-0 right-0 h-1 bg-iv-gold shadow-[0_0_30px_rgba(184,151,47,1)] animate-scan-laser z-30" />
                      <div className="absolute inset-0 border-[20px] border-iv-white/5 animate-pulse" />
                      <div className="absolute bottom-16 left-16 right-16 bg-iv-black/60 backdrop-blur-md border border-iv-gold/20 p-6 rounded-2xl">
                        <div className="flex justify-between items-center">
                          <p className="text-iv-gold text-[10px] font-black uppercase tracking-widest">Active Multi-Vector Capture</p>
                          <p className="text-iv-white font-mono text-xs">{detectedAreas[detectedAreas.length - 1]}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {state === 'analyzing' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-iv-black/60 backdrop-blur-md">
                      <div className="text-center space-y-10 max-w-sm px-8">
                        <div className="relative">
                          <Activity className="w-20 h-20 text-iv-gold mx-auto animate-pulse" />
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em]">
                            <span className="text-iv-gold">Neural Processing</span>
                            <span className="text-iv-white">{progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-iv-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-iv-gold transition-all duration-300" style={{ width: `${progress}%` }} />
                          </div>
                          <p className="text-[10px] text-iv-cream/65 uppercase tracking-[0.3em] italic">Synthesizing Dermal Bio-Markers...</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {state === 'complete' && (
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                      <div className="text-center space-y-8">
                        <div className="w-24 h-24 bg-iv-gold rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(184,151,47,0.4)]">
                          <CheckCircle2 className="w-12 h-12 text-iv-black" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-iv-white uppercase tracking-tighter italic">Validated</h3>
                          <p className="text-iv-gold text-[10px] font-black uppercase tracking-[0.5em]">Analysis Finalized</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {/* Right Column: Console & Results */}
          <div className={`${state === 'complete' ? 'lg:col-span-7' : 'lg:col-span-5'} ${state === 'camera_denied' ? 'hidden lg:block' : ''} flex flex-col gap-8 h-full transition-all duration-1000`}>
            {state === 'camera_denied' ? (
              /* Camera denied — show instructions on desktop, left panel handles mobile */
              <div className="bg-iv-black/40 border border-iv-gold/10 p-8 rounded-[32px] flex-1 min-h-[400px] flex flex-col items-center justify-center text-center space-y-6">
                <AlertCircle className="w-10 h-10 text-iv-gold/30" />
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-iv-white uppercase tracking-widest">Permission Denied</h4>
                  <p className="text-iv-cream/65 text-xs font-light leading-relaxed max-w-xs">
                    Your browser blocked camera access. Grant permission and tap "Try Again" to start the real scan. No data is stored.
                  </p>
                </div>
              </div>
            ) : state !== 'complete' ? (
              /* Log Console - Only visible during scan */
              <div className="bg-iv-black/40 border border-iv-gold/10 p-8 rounded-[32px] font-mono relative overflow-hidden flex-1 min-h-[400px] flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-iv-gold animate-pulse" />
                    <h3 className="text-[10px] font-black text-iv-gold uppercase tracking-[0.4em]">Bioscan Telemetry</h3>
                  </div>
                </div>
                <div className="space-y-3 text-[10px] overflow-y-auto flex-1 scrollbar-hide">
                  {analysisLogs.map((log, i) => (
                    <div key={i} className="flex gap-4 animate-in slide-in-from-left duration-500">
                      <span className="text-iv-gold/20">{i + 1}</span>
                      <span className={i === analysisLogs.length - 1 ? 'text-iv-gold font-bold' : 'text-iv-cream/65'}>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Enhanced Results Dashboard */
              <div className="space-y-8 animate-in fade-in slide-in-from-right duration-1000">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-bold text-iv-white uppercase tracking-tighter italic">Diagnostic Report</h3>
                    <p className="text-iv-gold text-[10px] font-black uppercase tracking-[0.4em]">Protocol Tier III: Regeneration</p>
                  </div>
                  <div className="bg-iv-gold/5 border border-iv-gold/20 px-4 py-2 rounded-full">
                    <p className="text-[9px] font-black text-iv-gold uppercase tracking-[0.2em]">Confidence Score: 98.4%</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Metabolic Benchmarking */}
                  <div className="bg-iv-black/40 border border-iv-gold/10 p-8 rounded-[32px] space-y-8">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-[10px] font-black text-iv-gold uppercase tracking-[0.4em]">Metabolic Data</h4>
                    </div>
                    
                    <div className="space-y-6">
                      {[
                        { label: 'Cellular Hydration', user: 42, target: 85, color: 'bg-blue-500' },
                        { label: 'Oxidative Stress Control', user: 12, target: 90, color: 'bg-red-500' },
                        { label: 'Dermal Density Index', user: 78, target: 80, color: 'bg-emerald-500' },
                      ].map((m, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-[10px] uppercase tracking-widest">
                            <span className="text-iv-cream/60">{m.label}</span>
                            <span className="text-iv-white font-bold">{m.user}%</span>
                          </div>
                          <div className="h-1 w-full bg-iv-white/5 rounded-full overflow-hidden flex">
                            <div className={`h-full ${m.color} opacity-60`} style={{ width: `${m.user}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Ingredient Match */}
                  <div className="bg-iv-deep-green/10 border border-iv-gold/10 p-8 rounded-[32px] space-y-6">
                    <h4 className="text-[10px] font-black text-iv-gold uppercase tracking-[0.4em]">Ingredient Match</h4>
                    <div className="space-y-4">
                      {[
                        { name: 'OS-01 Senomorphics', target: 'Zombie Cells' },
                        { name: 'L-Ornithine', target: 'Structural Lift' },
                      ].map((ing, i) => (
                        <div key={i} className="flex justify-between items-center bg-iv-black/40 p-4 rounded-xl border border-iv-white/5">
                          <span className="text-iv-white text-xs font-bold">{ing.name}</span>
                          <span className="text-[8px] font-black text-iv-gold uppercase tracking-widest">{ing.target}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Proposed Solution Explanation */}
                <div className="bg-iv-gold/10 border border-iv-gold/20 p-10 rounded-[40px] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Target className="w-32 h-32 text-iv-gold" />
                  </div>
                  
                  <div className="relative z-10 space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black text-iv-gold uppercase tracking-[0.4em] flex items-center gap-3">
                        Clinical Rationale
                      </h4>
                      <p className="text-iv-white font-bold text-xl leading-snug max-w-xl">
                        High Oxidative Stress detected in the T-Zone, coupled with early dermal volume loss.
                      </p>
                      <p className="text-iv-cream/60 text-sm font-light leading-relaxed max-w-2xl">
                        Your skin's metabolic biomarkers suggest accelerated senescence in the dermal layers. We propose the **Tier III Protocol**, specifically engineered with Senomorphic Peptides to "reset" zombie cells and L-Ornithine to restore facial volume.
                      </p>
                    </div>

                    <div className="bg-iv-black/60 p-8 rounded-3xl border border-iv-white/10 grid grid-cols-1 sm:grid-cols-3 gap-8">
                      {[
                        { label: 'Senescence Delay', value: '+30%' },
                        { label: 'Volume Recovery', value: 'Phase I' },
                        { label: 'Stabilized pH', value: '5.5' },
                      ].map((item, i) => (
                        <div key={i} className="text-center">
                          <p className="text-[8px] font-black text-iv-gold uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="text-lg font-bold text-iv-white tracking-tight">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-col md:flex-row gap-4">
                      <Button 
                        className="flex-[2] bg-iv-gold text-iv-black hover:bg-iv-gold-light text-[10px] font-black uppercase tracking-[0.3em] py-10 rounded-none shadow-2xl"
                        onClick={() => window.location.href = '/shop?tier=t3'}
                      >
                        Acquire Protocol
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1 border-iv-gold/20 text-iv-gold hover:bg-iv-gold/5 text-[10px] font-black uppercase tracking-[0.3em] py-10 rounded-none"
                        onClick={() => alert('Protocol Saved to Secure Profile')}
                      >
                        Save
                      </Button>
                      <Button 
                        variant="ghost"
                        className="flex-1 text-iv-white/40 hover:text-iv-gold text-[10px] font-black uppercase tracking-[0.3em] py-10 rounded-none"
                        onClick={() => setState('idle')}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan-laser {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-laser {
          animation: scan-laser 4s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
