import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { Background } from './Background'
import { TypedLogo } from './TypedLogo'
import { useOpenPortal } from './useOpenPortal'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import { BACKGROUND_VARIANT, WELCOME_TEXT } from './welcomeConfig'
import './WelcomeScreem.css'

interface WelcomeProps {
  homeRef: RefObject<HTMLElement | null>
  onFinish: () => void
}

export function Welcome({ homeRef, onFinish }: WelcomeProps) {
  const welcomeRef = useRef<HTMLDivElement | null>(null)
  const logoRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const reducedMotion = usePrefersReducedMotion()

  const { phase, finishTyping, skip } = useOpenPortal({
    homeRef,
    logoRef,
    welcomeRef,
    overlayRef,
    text: WELCOME_TEXT,
    reducedMotion,
    onDone: onFinish,
  })

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') skip()
    }

    window.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [skip])

  return (
    <div
      ref={welcomeRef}
      className={`welcome welcome--${phase}`}
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenida de Rolling Code School"
      onClick={skip}
    >
      <div className="welcome__backdrop" aria-hidden="true">
        <Background variant={BACKGROUND_VARIANT} reducedMotion={reducedMotion} />
        <div className="welcome__glow" />
      </div>

      <div className="welcome__stage">
        <TypedLogo
          text={WELCOME_TEXT}
          reducedMotion={reducedMotion}
          logoRef={logoRef}
          onComplete={finishTyping}
        />
      </div>

      <div ref={overlayRef} className="welcome__signs" aria-hidden="true" />
    </div>
  )
}

export default Welcome
