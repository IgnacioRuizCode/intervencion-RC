import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import type { BackgroundVariant } from './welcomeTypes'
import './Background.css'

interface BackgroundProps {
  variant: BackgroundVariant
  reducedMotion?: boolean
  className?: string
}

interface SymbolSpec {
  char: string
  x: number
  y: number
  size: number
  duration: number
  delay: number
  drift: number
  opacity: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
}

type CustomProperties = CSSProperties & Record<`--${string}`, string>

const SYMBOLS: SymbolSpec[] = [
  { char: '<>', x: 6, y: 14, size: 38, duration: 17, delay: -4, drift: 26, opacity: 0.14 },
  { char: '{}', x: 18, y: 74, size: 24, duration: 13, delay: -8, drift: -18, opacity: 0.1 },
  { char: '=>', x: 31, y: 24, size: 18, duration: 21, delay: -2, drift: 22, opacity: 0.09 },
  { char: ';', x: 42, y: 86, size: 30, duration: 15, delay: -11, drift: -14, opacity: 0.12 },
  { char: '</>', x: 54, y: 12, size: 22, duration: 19, delay: -6, drift: 30, opacity: 0.1 },
  { char: '()', x: 66, y: 68, size: 34, duration: 23, delay: -3, drift: -24, opacity: 0.11 },
  { char: '&&', x: 79, y: 30, size: 16, duration: 14, delay: -12, drift: 18, opacity: 0.08 },
  { char: '};', x: 91, y: 82, size: 29, duration: 18, delay: -7, drift: -20, opacity: 0.13 },
  { char: 'const', x: 9, y: 46, size: 14, duration: 22, delay: -9, drift: 16, opacity: 0.07 },
  { char: '[]', x: 23, y: 58, size: 20, duration: 16, delay: -1, drift: 26, opacity: 0.09 },
  { char: '===', x: 37, y: 42, size: 15, duration: 20, delay: -13, drift: -16, opacity: 0.08 },
  { char: '=>', x: 49, y: 76, size: 26, duration: 12, delay: -5, drift: 20, opacity: 0.1 },
  { char: '<', x: 61, y: 48, size: 44, duration: 19, delay: -10, drift: -30, opacity: 0.13 },
  { char: '>', x: 72, y: 16, size: 34, duration: 15, delay: -2, drift: 24, opacity: 0.12 },
  { char: '{', x: 84, y: 56, size: 48, duration: 24, delay: -8, drift: -26, opacity: 0.11 },
  { char: '}', x: 94, y: 38, size: 40, duration: 17, delay: -14, drift: 18, opacity: 0.1 },
  { char: '//', x: 14, y: 90, size: 16, duration: 13, delay: -6, drift: 22, opacity: 0.07 },
  { char: '!', x: 28, y: 8, size: 22, duration: 18, delay: -15, drift: -12, opacity: 0.08 },
  { char: '?', x: 46, y: 64, size: 19, duration: 21, delay: -4, drift: 24, opacity: 0.09 },
  { char: '=>', x: 58, y: 92, size: 17, duration: 14, delay: -9, drift: -20, opacity: 0.08 },
  { char: '&&', x: 76, y: 88, size: 24, duration: 20, delay: -3, drift: 28, opacity: 0.1 },
  { char: '<>', x: 88, y: 6, size: 30, duration: 16, delay: -12, drift: -18, opacity: 0.12 },
]

function symbolStyle(symbol: SymbolSpec): CustomProperties {
  return {
    '--symbol-x': `${symbol.x}%`,
    '--symbol-y': `${symbol.y}%`,
    '--symbol-size': `${symbol.size}px`,
    '--symbol-duration': `${symbol.duration}s`,
    '--symbol-delay': `${symbol.delay}s`,
    '--symbol-drift': `${symbol.drift}px`,
    '--symbol-opacity': `${symbol.opacity}`,
  }
}

function readColor(element: Element, property: string, fallback: string): string {
  const value = window.getComputedStyle(element).getPropertyValue(property).trim()
  return value || fallback
}

function hexToRgb(value: string): string {
  const hex = value.replace('#', '').trim()
  if (/^[0-9a-f]{3}$/i.test(hex)) {
    return `${Number.parseInt(hex[0] + hex[0], 16)}, ${Number.parseInt(hex[1] + hex[1], 16)}, ${Number.parseInt(hex[2] + hex[2], 16)}`
  }
  if (/^[0-9a-f]{6}$/i.test(hex)) {
    return `${Number.parseInt(hex.slice(0, 2), 16)}, ${Number.parseInt(hex.slice(2, 4), 16)}, ${Number.parseInt(hex.slice(4, 6), 16)}`
  }
  return '225, 6, 0'
}

export function Background({ variant, reducedMotion = false, className }: BackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (variant !== 'particles') return
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const red = hexToRgb(readColor(canvas, '--welcome-red', '#e10600'))
    const pointer = { x: 0, y: 0, active: false }
    let width = 0
    let height = 0
    let particles: Particle[] = []
    let frame = 0
    let lastTime = performance.now()
    let disposed = false

    const createParticles = (): Particle[] => {
      const count = Math.max(26, Math.min(88, Math.round((width * height) / 22000)))
      return Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        radius: 0.7 + Math.random() * 1.5,
        alpha: 0.18 + Math.random() * 0.42,
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = createParticles()
    }

    const draw = (animate: boolean, delta: number) => {
      context.clearRect(0, 0, width, height)

      if (animate) {
        for (const particle of particles) {
          if (pointer.active) {
            const dx = pointer.x - particle.x
            const dy = pointer.y - particle.y
            const distanceSquared = dx * dx + dy * dy
            if (distanceSquared > 0.01 && distanceSquared < 180 * 180) {
              const distance = Math.sqrt(distanceSquared)
              const force = (1 - distance / 180) * 0.018
              particle.vx += (dx / distance) * force
              particle.vy += (dy / distance) * force
            }
          }

          const speed = Math.hypot(particle.vx, particle.vy)
          if (speed > 0.55) {
            particle.vx = (particle.vx / speed) * 0.55
            particle.vy = (particle.vy / speed) * 0.55
          }

          particle.vx *= 0.996
          particle.vy *= 0.996
          particle.x += particle.vx * delta
          particle.y += particle.vy * delta

          if (particle.x < -20) particle.x = width + 20
          if (particle.x > width + 20) particle.x = -20
          if (particle.y < -20) particle.y = height + 20
          if (particle.y > height + 20) particle.y = -20
        }
      }

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index]
        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distanceSquared = dx * dx + dy * dy
          if (distanceSquared < 132 * 132) {
            const distance = Math.sqrt(distanceSquared)
            const alpha = (1 - distance / 132) * 0.14
            context.beginPath()
            context.strokeStyle = `rgba(${red}, ${alpha})`
            context.lineWidth = 1
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.stroke()
          }
        }
      }

      for (const particle of particles) {
        context.beginPath()
        context.fillStyle = `rgba(${red}, ${particle.alpha})`
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      }
    }

    const loop = (time: number) => {
      if (disposed) return
      const delta = Math.min((time - lastTime) / 16.667, 2)
      lastTime = time
      draw(true, delta)
      frame = window.requestAnimationFrame(loop)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    }

    resize()

    const observer = new ResizeObserver(() => {
      resize()
      if (reducedMotion) draw(false, 0)
    })
    observer.observe(canvas)

    if (reducedMotion) {
      draw(false, 0)
    } else {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      frame = window.requestAnimationFrame(loop)
    }

    return () => {
      disposed = true
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      observer.disconnect()
    }
  }, [reducedMotion, variant])

  if (variant === 'none') return null

  if (variant === 'symbols') {
    return (
      <div
        className={`welcome-background welcome-background--symbols${className ? ` ${className}` : ''}`}
        aria-hidden="true"
      >
        {SYMBOLS.map((symbol, index) => (
          <span
            key={`${symbol.char}-${index}`}
            className="welcome-background__symbol"
            style={symbolStyle(symbol)}
          >
            {symbol.char}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div
      className={`welcome-background welcome-background--particles${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="welcome-background__canvas" />
    </div>
  )
}
