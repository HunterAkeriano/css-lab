export type TimingFunction = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'cubic-bezier'
export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
export type FillMode = 'none' | 'forwards' | 'backwards' | 'both'

export interface CubicBezier {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface Keyframe {
  id: string
  position: number
  properties: Record<string, string>
}

export interface AnimationConfig {
  name: string
  duration: number
  timingFunction: TimingFunction
  cubicBezier?: CubicBezier
  delay: number
  iterationCount: number | 'infinite'
  direction: AnimationDirection
  fillMode: FillMode
  keyframes: Keyframe[]
}

export interface SavedAnimation {
  id: string
  name: string
  config: AnimationConfig
  createdAt: string
  updatedAt: string
}
