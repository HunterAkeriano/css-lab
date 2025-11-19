<template>
  <div :class="['card', `card--${variant}`, { 'card--hoverable': hoverable }]">
    <div v-if="$slots.header" class="card__header">
      <slot name="header" />
    </div>

    <div class="card__body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
type CardVariant = 'default' | 'bordered' | 'elevated'

interface Props {
  variant?: CardVariant
  hoverable?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  hoverable: false
})
</script>

<style lang="scss" scoped>
.card {
  border-radius: $border-radius-xl;
  overflow: hidden;
  transition: all $transition-base;

  &__header {
    padding: $space-lg;
    border-bottom: 1px solid $color-border;
    font-weight: $font-weight-semibold;
  }

  &__body {
    padding: $space-lg;
  }

  &__footer {
    padding: $space-lg;
    border-top: 1px solid $color-border;
  }

  // Variants
  &--default {
    background: $color-bg-secondary;
  }

  &--bordered {
    background: $color-bg-primary;
    border: 1px solid $color-border;
  }

  &--elevated {
    background: $color-bg-primary;
    box-shadow: $shadow-md;
  }

  // Hoverable
  &--hoverable {
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      box-shadow: $shadow-lg;
    }
  }
}
</style>
