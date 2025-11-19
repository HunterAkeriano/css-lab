<template>
  <button
    :class="['button', `button--${variant}`, `button--${size}`, { 'button--disabled': disabled }]"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <span v-if="$slots.icon" class="button__icon">
      <slot name="icon" />
    </span>
    <span class="button__text">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonType = 'button' | 'submit' | 'reset'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
}

interface Emits {
  (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false
})

const emit = defineEmits<Emits>()

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $space-sm;
  font-weight: $font-weight-semibold;
  border-radius: $border-radius-lg;
  transition: all $transition-base;
  cursor: pointer;
  border: 1px solid transparent;

  &:active {
    transform: translateY(1px);
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  // Sizes
  &--sm {
    padding: $space-sm $space-md;
    font-size: $font-size-sm;
  }

  &--md {
    padding: $space-md $space-lg;
    font-size: $font-size-base;
  }

  &--lg {
    padding: $space-lg $space-xl;
    font-size: $font-size-lg;
  }

  // Variants
  &--primary {
    background: $color-primary;
    color: white;

    &:hover:not(.button--disabled) {
      background: $color-primary-hover;
      box-shadow: $shadow-md;
    }
  }

  &--secondary {
    background: $color-secondary;
    color: white;

    &:hover:not(.button--disabled) {
      background: darken($color-secondary, 10%);
      box-shadow: $shadow-md;
    }
  }

  &--outline {
    background: transparent;
    border-color: $color-border;
    color: $color-text-primary;

    &:hover:not(.button--disabled) {
      border-color: $color-primary;
      color: $color-primary;
      background: rgba($color-primary, 0.05);
    }
  }

  &--ghost {
    background: transparent;
    color: $color-text-primary;

    &:hover:not(.button--disabled) {
      background: $color-bg-tertiary;
    }
  }

  &--danger {
    background: $color-error;
    color: white;

    &:hover:not(.button--disabled) {
      background: darken($color-error, 10%);
      box-shadow: $shadow-md;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__text {
    white-space: nowrap;
  }
}
</style>
