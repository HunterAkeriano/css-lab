import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GradientConfig, GradientColor, GradientType } from '@/shared/types'
import { formatGradient, type CSSFormat } from '@/shared/lib'

export const useGradientStore = defineStore('gradient', () => {
  const type = ref<GradientType>('linear')
  const angle = ref(90)
  const colors = ref<GradientColor[]>([
    { id: '1', color: '#667eea', position: 0 },
    { id: '2', color: '#764ba2', position: 100 }
  ])

  const cssValue = computed(() => {
    return formatGradient(type.value, angle.value, colors.value, 'css')
  })

  const gradientStyle = computed(() => {
    let gradient = ''

    switch (type.value) {
      case 'linear':
        gradient = `linear-gradient(${angle.value}deg, ${colors.value
          .map(c => `${c.color} ${c.position}%`)
          .join(', ')})`
        break
      case 'radial':
        gradient = `radial-gradient(circle, ${colors.value
          .map(c => `${c.color} ${c.position}%`)
          .join(', ')})`
        break
      case 'conic':
        gradient = `conic-gradient(from ${angle.value}deg, ${colors.value
          .map(c => `${c.color} ${c.position}%`)
          .join(', ')})`
        break
    }

    return { background: gradient }
  })

  const config = computed<GradientConfig>(() => {
    if (type.value === 'linear') {
      return {
        type: 'linear',
        angle: angle.value,
        colors: colors.value
      }
    } else if (type.value === 'radial') {
      return {
        type: 'radial',
        shape: 'circle',
        position: 'center',
        colors: colors.value
      }
    } else {
      return {
        type: 'conic',
        angle: angle.value,
        position: 'center',
        colors: colors.value
      }
    }
  })

  function setType(newType: GradientType) {
    type.value = newType
  }

  function setAngle(newAngle: number) {
    angle.value = newAngle
  }

  function addColor() {
    const newId = (Math.max(...colors.value.map(c => parseInt(c.id))) + 1).toString()
    const newPosition = colors.value.length > 0
      ? Math.round((colors.value[colors.value.length - 1].position + 100) / 2)
      : 50

    colors.value.push({
      id: newId,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
      position: newPosition
    })
  }

  function removeColor(id: string) {
    if (colors.value.length > 2) {
      colors.value = colors.value.filter(c => c.id !== id)
    }
  }

  function updateColor(id: string, color: string) {
    const colorItem = colors.value.find(c => c.id === id)
    if (colorItem) {
      colorItem.color = color
    }
  }

  function updateColorPosition(id: string, position: number) {
    const colorItem = colors.value.find(c => c.id === id)
    if (colorItem) {
      colorItem.position = Math.max(0, Math.min(100, position))
    }
  }

  function getCode(format: CSSFormat): string {
    return formatGradient(type.value, angle.value, colors.value, format)
  }

  function reset() {
    type.value = 'linear'
    angle.value = 90
    colors.value = [
      { id: '1', color: '#667eea', position: 0 },
      { id: '2', color: '#764ba2', position: 100 }
    ]
  }

  function loadConfig(newConfig: GradientConfig) {
    type.value = newConfig.type
    colors.value = [...newConfig.colors]

    if (newConfig.type === 'linear' || newConfig.type === 'conic') {
      angle.value = newConfig.angle
    }
  }

  return {
    type,
    angle,
    colors,
    cssValue,
    gradientStyle,
    config,
    setType,
    setAngle,
    addColor,
    removeColor,
    updateColor,
    updateColorPosition,
    getCode,
    reset,
    loadConfig
  }
})
