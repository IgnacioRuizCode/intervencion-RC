import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import {
  HOLD_BEFORE_OPEN_MS,
  OPEN_DELAY_MS,
  OPEN_DURATION_MS,
  OPEN_EASING,
  REST_FADE_MS,
} from './welcomeConfig'
import { measureCharacterInk } from './welcomeGeometry'
import type { WelcomePhase } from './welcomeTypes'

interface UseOpenPortalOptions {
  homeRef: RefObject<HTMLElement | null>
  logoRef: RefObject<HTMLDivElement | null>
  welcomeRef: RefObject<HTMLDivElement | null>
  overlayRef: RefObject<HTMLDivElement | null>
  text: string
  reducedMotion: boolean
  onDone: () => void
}

interface UseOpenPortalResult {
  phase: WelcomePhase
  finishTyping: () => void
  skip: () => void
}

function getHomeContent(home: HTMLElement | null): HTMLElement | null {
  return home?.querySelector<HTMLElement>('.app-home__content') ?? null
}

function setHomeVisible(home: HTMLElement | null, visible: boolean): void {
  if (!home) return
  home.style.clipPath = visible ? 'inset(0px 0px 0px 0px)' : ''
  const content = getHomeContent(home)
  if (!content) return
  content.style.transform = visible ? '' : 'scale(1.12)'
  content.style.opacity = visible ? '' : '0'
}

export function useOpenPortal({
  homeRef,
  logoRef,
  welcomeRef,
  overlayRef,
  text,
  reducedMotion,
  onDone,
}: UseOpenPortalOptions): UseOpenPortalResult {
  const [phase, setPhase] = useState<WelcomePhase>('typing')
  const timersRef = useRef<Set<number>>(new Set())
  const animationsRef = useRef<Animation[]>([])
  const clonesRef = useRef<HTMLElement[]>([])
  const disposedRef = useRef(false)
  const finishedRef = useRef(false)
  const startedRef = useRef(false)

  const clearTimers = useCallback(() => {
    for (const timer of timersRef.current) window.clearTimeout(timer)
    timersRef.current.clear()
  }, [])

  const cleanupDom = useCallback(() => {
    for (const animation of animationsRef.current) animation.cancel()
    animationsRef.current = []

    for (const clone of clonesRef.current) clone.remove()
    clonesRef.current = []

    setHomeVisible(homeRef.current, true)
  }, [homeRef])

  const complete = useCallback(() => {
    if (finishedRef.current || disposedRef.current) return
    finishedRef.current = true
    clearTimers()
    cleanupDom()
    setPhase('done')
    onDone()
  }, [cleanupDom, clearTimers, onDone])

  const fallbackFade = useCallback(() => {
    if (finishedRef.current || disposedRef.current) return
    setPhase('opening')

    const home = homeRef.current
    const content = getHomeContent(home)
    setHomeVisible(home, true)

    const root = welcomeRef.current
    if (!root) {
      complete()
      return
    }

    const fade = root.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: REST_FADE_MS, easing: OPEN_EASING, fill: 'both' },
    )
    animationsRef.current.push(fade)

    if (content) {
      const contentFade = content.animate(
        [{ opacity: 0, transform: 'scale(1.05)' }, { opacity: 1, transform: 'scale(1)' }],
        { duration: OPEN_DURATION_MS, easing: OPEN_EASING, fill: 'both' },
      )
      animationsRef.current.push(contentFade)
    }

    const pending = [...animationsRef.current]
    void Promise.all(
      pending.map((animation) => animation.finished.catch(() => undefined)),
    ).then(() => complete())
  }, [complete, homeRef, welcomeRef])

  const openPortal = useCallback(() => {
    if (finishedRef.current || disposedRef.current) return
    if (reducedMotion) {
      complete()
      return
    }

    const logo = logoRef.current
    const home = homeRef.current
    const root = welcomeRef.current
    const overlay = overlayRef.current

    if (!logo || !home || !root || !overlay || !text.trim().endsWith('<>')) {
      fallbackFade()
      return
    }

    const leftCharacter = logo.querySelector<HTMLElement>('[data-welcome-sign="left"]')
    const rightCharacter = logo.querySelector<HTMLElement>('[data-welcome-sign="right"]')
    if (!leftCharacter || !rightCharacter) {
      fallbackFade()
      return
    }

    const leftInk = measureCharacterInk(leftCharacter)
    const rightInk = measureCharacterInk(rightCharacter)
    if (!leftInk || !rightInk) {
      fallbackFade()
      return
    }

    const portalLeft = leftInk.right
    const portalRight = rightInk.left
    if (portalRight <= portalLeft) {
      fallbackFade()
      return
    }

    const inkTop = Math.min(leftInk.top, rightInk.top)
    const inkBottom = Math.max(leftInk.bottom, rightInk.bottom)
    const inkHeight = Math.max(1, inkBottom - inkTop)
    const centerY = (inkTop + inkBottom) / 2
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const scale = viewportHeight / inkHeight
    const dy = viewportHeight / 2 - centerY
    const leftRect = leftCharacter.getBoundingClientRect()
    const rightRect = rightCharacter.getBoundingClientRect()

    leftCharacter.style.visibility = 'hidden'
    rightCharacter.style.visibility = 'hidden'

    const createSignClone = (
      character: HTMLElement,
      rect: DOMRect,
      originX: number,
      originY: number,
    ): HTMLSpanElement => {
      const clone = character.cloneNode(true) as HTMLSpanElement
      const style = window.getComputedStyle(character)
      clone.className = 'welcome-logo__char welcome-logo__char--sign welcome-logo__sign-copy'
      clone.style.position = 'fixed'
      clone.style.left = `${rect.left}px`
      clone.style.top = `${rect.top}px`
      clone.style.margin = '0'
      clone.style.fontFamily = style.fontFamily
      clone.style.fontSize = style.fontSize
      clone.style.fontWeight = style.fontWeight
      clone.style.fontStyle = style.fontStyle
      clone.style.lineHeight = style.lineHeight
      clone.style.letterSpacing = style.letterSpacing
      clone.style.clipPath = 'none'
      clone.style.visibility = 'visible'
      clone.style.opacity = '1'
      clone.style.animation = 'none'
      clone.style.transform = 'none'
      clone.style.transformOrigin = `${originX - rect.left}px ${originY - rect.top}px`
      clone.style.pointerEvents = 'none'
      clone.style.willChange = 'transform'
      clone.setAttribute('aria-hidden', 'true')
      overlay.appendChild(clone)
      clonesRef.current.push(clone)
      return clone
    }

    const leftClone = createSignClone(
      leftCharacter,
      leftRect,
      leftInk.right,
      centerY,
    )
    const rightClone = createSignClone(
      rightCharacter,
      rightRect,
      rightInk.left,
      centerY,
    )

    const startClip = `inset(${inkTop}px ${Math.max(0, viewportWidth - portalRight)}px ${Math.max(0, viewportHeight - inkBottom)}px ${Math.max(0, portalLeft)}px)`
    home.style.clipPath = startClip
    const content = getHomeContent(home)
    if (content) {
      content.style.transform = 'scale(1.12)'
      content.style.opacity = '0'
    }

    root.classList.add('welcome--opening')
    logo.classList.add('welcome-logo--opening')
    setPhase('opening')

    const timing: KeyframeAnimationOptions = {
      duration: OPEN_DURATION_MS,
      delay: OPEN_DELAY_MS,
      easing: OPEN_EASING,
      fill: 'both',
    }

    const portalAnimations: Animation[] = [
      home.animate(
        [
          { clipPath: startClip },
          { clipPath: 'inset(0px 0px 0px 0px)' },
        ],
        timing,
      ),
      leftClone.animate(
        [
          { transform: 'translate(0px, 0px) scale(1)' },
          { transform: `translate(${-portalLeft}px, ${dy}px) scale(${scale})` },
        ],
        timing,
      ),
      rightClone.animate(
        [
          { transform: 'translate(0px, 0px) scale(1)' },
          { transform: `translate(${viewportWidth - portalRight}px, ${dy}px) scale(${scale})` },
        ],
        timing,
      ),
    ]

    if (content) {
      portalAnimations.push(content.animate(
        [
          { transform: 'scale(1.12)', opacity: 0 },
          { transform: 'scale(1)', opacity: 1 },
        ],
        timing,
      ))
    }

    animationsRef.current.push(...portalAnimations)
    void Promise.all(
      portalAnimations.map((animation) => animation.finished.catch(() => undefined)),
    ).then(() => complete())
  }, [
    complete,
    fallbackFade,
    homeRef,
    logoRef,
    overlayRef,
    reducedMotion,
    text,
    welcomeRef,
  ])

  const finishTyping = useCallback(() => {
    if (startedRef.current || finishedRef.current || disposedRef.current) return
    startedRef.current = true
    const timer = window.setTimeout(() => {
      timersRef.current.delete(timer)
      openPortal()
    }, HOLD_BEFORE_OPEN_MS)
    timersRef.current.add(timer)
  }, [openPortal])

  const skip = useCallback(() => {
    if (finishedRef.current) return
    clearTimers()
    complete()
  }, [clearTimers, complete])

  useEffect(() => {
    disposedRef.current = false
    finishedRef.current = false
    startedRef.current = false

    return () => {
      disposedRef.current = true
      clearTimers()
      cleanupDom()
    }
  }, [cleanupDom, clearTimers])

  return { phase, finishTyping, skip }
}
