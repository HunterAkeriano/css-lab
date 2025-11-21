<template>
  <transition name="fade">
    <div v-if="visible" class="auth-prompt-modal" role="dialog" aria-modal="true">
      <div class="auth-prompt-modal__backdrop" @click="handleClose"></div>
      <div class="auth-prompt-modal__card">
        <h2 class="auth-prompt-modal__title">{{ title }}</h2>
        <p class="auth-prompt-modal__description">{{ description }}</p>
        <div class="auth-prompt-modal__actions">
          <Button variant="primary" size="md" @click="handleConfirm">
            {{ confirmLabel }}
          </Button>
          <Button variant="ghost" size="md" @click="handleClose">
            {{ cancelLabel }}
          </Button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, toRefs } from 'vue'
import { Button } from '@/shared/ui'

const props = defineProps({
  visible: { type: Boolean, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  confirmLabel: { type: String, required: true },
  cancelLabel: { type: String, required: true }
})

const { visible, title, description, confirmLabel, cancelLabel } = toRefs(props)

const emit = defineEmits<{ (e: 'confirm'): void; (e: 'close'): void }>()

function handleConfirm() {
  emit('confirm')
}

function handleClose() {
  emit('close')
}
</script>

<style scoped lang="scss">
.auth-prompt-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;

  &__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(5, 10, 25, 0.65);
  }

  &__card {
    position: relative;
    z-index: 1;
    max-width: 420px;
    width: 100%;
    padding: 2rem;
    border-radius: 1rem;
    background: rgba(16, 23, 48, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.45);
    color: #fff;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }

  &__description {
    margin: 0;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.4;
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }
}
</style>
