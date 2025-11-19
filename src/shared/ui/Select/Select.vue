<template>
  <div :class="['select', { 'select--error': error, 'select--disabled': disabled }]">
    <label v-if="label" :for="selectId" class="select__label">
      {{ label }}
      <span v-if="required" class="select__required">*</span>
    </label>

    <div class="select__wrapper">
      <select
        :id="selectId"
        v-model="selectValue"
        :disabled="disabled"
        :required="required"
        class="select__field"
        @change="handleChange"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <span class="select__icon">▼</span>
    </div>

    <span v-if="error" class="select__error">{{ error }}</span>
    <span v-else-if="hint" class="select__hint">{{ hint }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
}

interface Props {
  modelValue: string | number
  options: SelectOption[]
  label?: string
  placeholder?: string
  error?: string
  hint?: string
  disabled?: boolean
  required?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false
})

const emit = defineEmits<Emits>()

const selectId = ref(`select-${Math.random().toString(36).substr(2, 9)}`)

const selectValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('change', target.value)
}
</script>

<style lang="scss" scoped>
.select {
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
    position: relative;
    display: flex;
    align-items: center;
  }

  &__field {
    flex: 1;
    appearance: none;
    border: 1px solid $color-border;
    border-radius: $border-radius-md;
    padding: $space-sm $space-md;
    padding-right: $space-xl;
    font-size: $font-size-base;
    color: $color-text-primary;
    background: $color-bg-primary;
    cursor: pointer;
    transition: all $transition-base;

    &:focus {
      outline: none;
      border-color: $color-primary;
      box-shadow: 0 0 0 3px rgba($color-primary, 0.1);
    }
  }

  &--error &__field {
    border-color: $color-error;

    &:focus {
      box-shadow: 0 0 0 3px rgba($color-error, 0.1);
    }
  }

  &__icon {
    position: absolute;
    right: $space-md;
    pointer-events: none;
    font-size: $font-size-xs;
    color: $color-text-tertiary;
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
