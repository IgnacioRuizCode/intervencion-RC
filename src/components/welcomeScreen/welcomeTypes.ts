export type WelcomePhase = 'typing' | 'opening' | 'done'

export type BackgroundVariant = 'symbols' | 'particles' | 'none'

export interface InkBox {
  left: number
  right: number
  top: number
  bottom: number
  height: number
  centerY: number
  baseline: number
}
