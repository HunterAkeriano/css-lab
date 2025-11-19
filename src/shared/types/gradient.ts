export type GradientType = 'linear' | 'radial' | 'conic'

export interface GradientColor {
  id: string
  color: string
  position: number
}

export interface LinearGradientConfig {
  type: 'linear'
  angle: number
  colors: GradientColor[]
}

export interface RadialGradientConfig {
  type: 'radial'
  shape: 'circle' | 'ellipse'
  position: string
  colors: GradientColor[]
}

export interface ConicGradientConfig {
  type: 'conic'
  angle: number
  position: string
  colors: GradientColor[]
}

export type GradientConfig = LinearGradientConfig | RadialGradientConfig | ConicGradientConfig

export interface SavedGradient {
  id: string
  name: string
  config: GradientConfig
  createdAt: string
  updatedAt: string
}
