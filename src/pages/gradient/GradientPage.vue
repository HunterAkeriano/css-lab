<template>
  <div class="gradient-page">
    <div class="container">
      <header class="gradient-page__header">
        <div>
          <h1 class="gradient-page__title">Генератор градиентов</h1>
          <p class="gradient-page__subtitle">Создавайте красивые CSS градиенты с живым превью</p>
        </div>
        <router-link to="/" class="gradient-page__back-link">← На главную</router-link>
      </header>

      <div class="gradient-page__content">
        <div class="gradient-page__preview">
          <GradientPreview />
        </div>

        <div class="gradient-page__controls">
          <GradientControls />
          <GradientCodeExport />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GradientPreview, GradientControls, GradientCodeExport } from '@/features/gradient-generator/ui'
</script>

<style lang="scss" scoped>
.gradient-page {
  padding: $space-2xl 0;
  min-height: 100vh;
}

.gradient-page__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: $space-2xl;
  gap: $space-lg;
  flex-wrap: wrap;
}

.gradient-page__title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  margin-bottom: $space-xs;
  color: $color-text-primary;

  @media (min-width: $breakpoint-md) {
    font-size: $font-size-4xl;
  }
}

.gradient-page__subtitle {
  font-size: $font-size-base;
  color: $color-text-secondary;

  @media (min-width: $breakpoint-md) {
    font-size: $font-size-lg;
  }
}

.gradient-page__back-link {
  color: $color-primary;
  font-weight: $font-weight-medium;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
}

.gradient-page__content {
  display: grid;
  gap: $space-2xl;

  @media (min-width: $breakpoint-lg) {
    grid-template-columns: 1fr 400px;
  }
}

.gradient-page__preview {
  display: flex;
  flex-direction: column;
  gap: $space-lg;
}

.gradient-page__controls {
  display: flex;
  flex-direction: column;
  gap: $space-xl;
}
</style>
