export type ShadowType = 'box' | 'text'

export interface BoxShadow {
  id: string
  x: number
  y: number
  blur: number
  spread: number
  color: string
  inset: boolean
}

export interface TextShadow {
  id: string
  x: number
  y: number
  blur: number
  color: string
}

export interface SavedBoxShadow {
  id: string
  name: string
  shadows: BoxShadow[]
  createdAt: string
  updatedAt: string
}

export interface SavedTextShadow {
  id: string
  name: string
  shadows: TextShadow[]
  createdAt: string
  updatedAt: string
}

export type SavedShadow = SavedBoxShadow | SavedTextShadow
