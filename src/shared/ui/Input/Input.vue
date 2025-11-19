<template>
  <div :class="['input', { 'input--error': error, 'input--disabled': disabled }]">
    <label v-if="label" :for="inputId" class="input__label">
      {{ label }}
      <span v-if="required" class="input__required">*</span>
    </label>

    <div class="input__wrapper">
      <span v-if="$slots.prefix" class="input__prefix">
        <slot name="prefix" />
      </span>

      <input
        :id="inputId"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :readonly="readonly"
        class="input__field"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <span v-if="$slots.suffix" class="input__suffix">
        <slot name="suffix" />
      </span>
    </div>

    <span v-if="error" class="input__error">{{ error }}</span>
    <span v-else-if="hint" class="input__hint">{{ hint }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  modelValue: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  error?: string
  hint?: string
  disabled?: boolean
  required?: boolean
  readonly?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
  readonly: false
})

const emit = defineEmits<Emits>()

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: $space-xs;

  &--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  &__label {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
  }

  &__required {
    color: $color-error;
    margin-left: 2px;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    gap: $space-sm;
    border: 1px solid $color-border;
    border-radius: $border-radius-md;
    padding: $space-sm $space-md;
    background: $color-bg-primary;
    transition: all $transition-base;

    &:focus-within {
      border-color: $color-primary;
      box-shadow: 0 0 0 3px rgba($color-primary, 0.1);
    }
  }

  &--error &__wrapper {
    border-color: $color-error;

    &:focus-within {
      box-shadow: 0 0 0 3px rgba($color-error, 0.1);
    }
  }

  &__prefix,
  &__suffix {
    display: flex;
    align-items: center;
    color: $color-text-tertiary;
  }

  &__field {
    flex: 1;
    border: none;
    outline: none;
    font-size: $font-size-base;
    color: $color-text-primary;
    background: transparent;

    &::placeholder {
      color: $color-text-tertiary;
    }
  }

  &__error {
    font-size: $font-size-sm;
    color: $color-error;
  }

  &__hint {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }
}
</style>
