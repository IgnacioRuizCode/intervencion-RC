import type { InkBox } from './welcomeTypes'

function fontShorthand(style: CSSStyleDeclaration): string {
  return `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
}

function numericMetric(value: number | undefined, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

export function measureCharacterInk(element: HTMLElement): InkBox | null {
  const text = element.textContent ?? ''
  if (text.length === 0) return null

  const range = document.createRange()
  range.selectNodeContents(element)
  const rect = range.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) return null

  const style = window.getComputedStyle(element)
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return null

  context.font = fontShorthand(style)
  const metrics = context.measureText(text)
  const fontSize = Number.parseFloat(style.fontSize)
  const fallbackAscent = Number.isFinite(fontSize) ? fontSize * 0.8 : 0
  const fallbackDescent = Number.isFinite(fontSize) ? fontSize * 0.2 : 0
  const fontAscent = numericMetric(metrics.fontBoundingBoxAscent, fallbackAscent)
  const fontDescent = numericMetric(metrics.fontBoundingBoxDescent, fallbackDescent)
  const ascent = numericMetric(metrics.actualBoundingBoxAscent, fontAscent)
  const descent = numericMetric(metrics.actualBoundingBoxDescent, fontDescent)
  const inkLeft = numericMetric(metrics.actualBoundingBoxLeft, 0)
  const inkRight = numericMetric(metrics.actualBoundingBoxRight, metrics.width)
  const lineHeight = Number.parseFloat(style.lineHeight)
  const lineBoxHeight = rect.height > 0
    ? rect.height
    : Number.isFinite(lineHeight)
      ? lineHeight
      : fallbackAscent + fallbackDescent
  const baseline = rect.top + (lineBoxHeight - (fontAscent + fontDescent)) / 2 + fontAscent
  const left = rect.left - inkLeft
  const right = rect.left + inkRight
  const top = baseline - ascent
  const bottom = baseline + descent

  return {
    left,
    right,
    top,
    bottom,
    height: bottom - top,
    centerY: (top + bottom) / 2,
    baseline,
  }
}
