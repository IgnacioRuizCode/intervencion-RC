import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import type { RefObject } from 'react'
import {
  FONT_READY_TIMEOUT_MS,
  LETTER_BOUNCE_DURATION_MS,
  LETTER_BOUNCE_HEIGHT,
  LETTER_DELAY_MS,
  LETTER_REVEAL_MS,
  LOGO_BOUNCE_DURATION_MS,
  LOGO_BOUNCE_HEIGHT,
  LOGO_BOUNCE_LIFT_MS,
  START_DELAY_MS,
} from './welcomeConfig'
import './TypedLogo.css'

interface TypedLogoProps {
  text: string
  reducedMotion: boolean
  logoRef: RefObject<HTMLDivElement | null>
  onComplete: () => void
}

export function TypedLogo({ text, reducedMotion, logoRef, onComplete }: TypedLogoProps) {
  useGSAP(() => {
    const root = logoRef.current
    if (!root) return

    const characters = Array.from(root.querySelectorAll<HTMLElement>('[data-welcome-char]'))

    if (reducedMotion) {
      gsap.set(characters, { clipPath: 'inset(0% 0% 0% 0%)', y: 0 })
      const completionTimer = window.setTimeout(onComplete, 0)
      return () => window.clearTimeout(completionTimer)
    }

    gsap.set(characters, { clipPath: 'inset(0% 100% 0% 0%)', y: 0 })
    gsap.set(root, { y: 0 })

    let cancelled = false
    let started = false
    const step = LETTER_DELAY_MS / 1000
    const reveal = LETTER_REVEAL_MS / 1000
    const letterBounce = LETTER_BOUNCE_DURATION_MS / 1000
    const logoLift = LOGO_BOUNCE_LIFT_MS / 1000
    const logoBounce = LOGO_BOUNCE_DURATION_MS / 1000
    const startAt = START_DELAY_MS / 1000

    const timeline = gsap.timeline({ paused: true })

    characters.forEach((character, index) => {
      const at = startAt + index * step
      timeline.to(character, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: reveal,
        ease: 'power1.out',
      }, at)

      if ((character.textContent ?? '').trim().length > 0) {
        timeline.fromTo(character, {
          y: -LETTER_BOUNCE_HEIGHT,
        }, {
          y: 0,
          duration: letterBounce,
          ease: 'bounce.out',
        }, at)
      }
    })

    const typingEnd = startAt + Math.max(0, characters.length - 1) * step + Math.max(reveal, letterBounce)
    timeline.to(root, {
      y: -LOGO_BOUNCE_HEIGHT,
      duration: logoLift,
      ease: 'power2.out',
    }, typingEnd)
    timeline.to(root, {
      y: 0,
      duration: logoBounce,
      ease: 'bounce.out',
    }, typingEnd + logoLift)
    timeline.call(onComplete, [], typingEnd + logoLift + logoBounce)

    const startTimeline = () => {
      if (cancelled || started) return
      started = true
      timeline.play(0)
    }

    const fontTimer = window.setTimeout(startTimeline, FONT_READY_TIMEOUT_MS)
    void document.fonts
      .load('800 1em "Bricolage Grotesque"')
      .catch(() => undefined)
      .finally(startTimeline)

    return () => {
      cancelled = true
      window.clearTimeout(fontTimer)
      timeline.kill()
    }
  }, { scope: logoRef, dependencies: [onComplete, reducedMotion, text] })

  const characters = Array.from(text)

  return (
    <div
      ref={logoRef}
      className={`welcome-logo${reducedMotion ? ' welcome-logo--reduced' : ''}`}
      role="img"
      aria-label={text}
    >
      {characters.map((character, index) => (
        <span
          key={`${character}-${index}`}
          className={`welcome-logo__char${character === '<' || character === '>' ? ' welcome-logo__char--sign' : ''}`}
          aria-hidden="true"
          data-welcome-char={index}
          data-welcome-sign={character === '<' ? 'left' : character === '>' ? 'right' : undefined}
        >
          {character}
        </span>
      ))}
    </div>
  )
}
