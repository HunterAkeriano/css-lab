<template>
  <transition name="fade">
    <div v-if="visible" class="save-preset-modal" role="dialog" aria-modal="true">
      <div class="save-preset-modal__backdrop" @click="handleClose"></div>
      <div class="save-preset-modal__card">
        <h2 class="save-preset-modal__title">{{ title }}</h2>
        <p class="save-preset-modal__subtitle">{{ subtitle }}</p>
        <Input v-model="name" :label="inputLabel" />
        <div class="save-preset-modal__actions">
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
import { defineProps, defineEmits, ref, watch, toRefs } from 'vue'
import { Button, Input } from '@/shared/ui'

const props = defineProps({
  visible: { type: Boolean, required: true },
  title: { type: String, default: 'Save preset' },
  subtitle: { type: String, default: 'Give it a name you will remember.' },
  inputLabel: { type: String, default: 'Name' },
  confirmLabel: { type: String, default: 'Save' },
  cancelLabel: { type: String, default: 'Cancel' },
  defaultName: { type: String, default: '' },
  entityLabel: { type: String, default: '' }
})

const name = ref(props.defaultName)

watch(
  () => props.defaultName,
  (next) => {
    name.value = next || ''
  }
)

const { visible, title, subtitle, inputLabel, confirmLabel, cancelLabel } = toRefs(props)

const emit = defineEmits<{ (e: 'confirm', value: string): void; (e: 'close'): void }>()

function handleConfirm() {
  emit('confirm', name.value.trim() || props.defaultName || '')
}

function handleClose() {
  emit('close')
}
</script>

<style scoped lang="scss">
.save-preset-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;

  &__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(5, 10, 25, 0.75);
  }

  &__card {
    position: relative;
    z-index: 1;
    width: min(420px, 90vw);
    background: rgba(18, 24, 48, 0.95);
    border-radius: 1rem;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.45);
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }

  &__subtitle {
    margin: 0;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.4;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
}
</style>
