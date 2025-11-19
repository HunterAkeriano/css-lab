<template>
  <div class="gradient-preview">
    <div class="gradient-preview__box" :style="gradientStore.gradientStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { useGradientStore } from '../model/gradient-store'

const gradientStore = useGradientStore()
</script>

<style lang="scss" scoped>
.gradient-preview {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: $border-radius-xl;
  overflow: hidden;
  box-shadow: $shadow-xl;
}

.gradient-preview__box {
  width: 100%;
  height: 100%;
}
</style>
