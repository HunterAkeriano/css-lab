<template>
  <section class="profile-saved-list">
    <header class="profile-saved-list__header">
      <div>
        <p class="profile-saved-list__tag">{{ t(titleKey) }}</p>
        <h2 class="profile-saved-list__title">{{ t(titleKey) }}</h2>
        <p class="profile-saved-list__subtitle">{{ t(subtitleKey) }}</p>
      </div>
    </header>

    <div v-if="error" class="profile-saved-list__empty">{{ error }}</div>
    <div v-else-if="loading" class="profile-saved-list__empty">
      {{ t('PROFILE.SAVES_LOADING') }}
    </div>
    <div v-else-if="!items.length" class="profile-saved-list__empty">
      {{ t('PROFILE.SAVES_EMPTY') }}
    </div>

    <div v-else class="profile-saved-list__grid">
      <article
        v-for="item in items"
        :key="item.id"
        class="profile-saved-list__card"
      >
        <div class="profile-saved-list__preview" :class="`profile-saved-list__preview_${category}`">
          <div v-if="category === 'gradient'" class="profile-saved-list__preview-swatch" :style="getPreviewStyle(item)" />
          <div v-else-if="category === 'shadow'" class="profile-saved-list__preview-shadow" :style="getPreviewStyle(item)" />
          <pre v-else class="profile-saved-list__preview-animation">{{ animationPreview(item) }}</pre>
        </div>
        <div class="profile-saved-list__body">
          <header class="profile-saved-list__body-head">
            <h3>{{ item.name }}</h3>
            <span
              class="profile-saved-list__status"
              :class="`profile-saved-list__status_${item.status ?? 'private'}`"
            >
              {{ t(`PROFILE.STATUS_${(item.status ?? 'private').toUpperCase()}`) }}
            </span>
          </header>
          <p class="profile-saved-list__meta">
            {{ t('PROFILE.SAVED_AT') }} {{ toLocaleDate(item.createdAt) }}
          </p>
          <div class="profile-saved-list__actions">
            <Button
              v-if="item.status === 'private'"
              variant="ghost"
              size="sm"
              :disabled="publishingId === item.id"
              @click="publish(item)"
            >
              {{ publishingId === item.id ? t('PROFILE.PUBLISHING') : t('PROFILE.PUBLISH') }}
            </Button>
            <span v-else-if="item.status === 'pending'" class="profile-saved-list__hint">
              {{ t('PROFILE.PENDING_REVIEW') }}
            </span>
            <span v-else class="profile-saved-list__hint">
              {{ t('PROFILE.APPROVED') }}
            </span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { Button } from '@/shared/ui'
import { listSaves, requestPublish, type SavedItem, type SaveCategory } from '@/shared/api/saves'

const props = defineProps<{
  category: SaveCategory
  titleKey: string
  subtitleKey: string
}>()

const items = ref<SavedItem[]>([])
const loading = ref(true)
const error = ref('')
const publishingId = ref<string | null>(null)
const toast = useToast()
const { t } = useI18n()

async function loadItems() {
  loading.value = true
  error.value = ''
  try {
    items.value = await listSaves(props.category)
  } catch (err: any) {
    error.value = err?.message || t('PROFILE.LOAD_SAVES_ERROR')
  } finally {
    loading.value = false
  }
}

async function publish(item: SavedItem) {
  publishingId.value = item.id
  try {
    await requestPublish(props.category, item.id)
    toast.success(t('PROFILE.PUBLISH_SUCCESS'))
    await loadItems()
  } catch (err: any) {
    toast.error(err?.message || t('PROFILE.PUBLISH_ERROR'))
  } finally {
    publishingId.value = null
  }
}

function toLocaleDate(value: string) {
  return new Date(value).toLocaleDateString()
}

function getPreviewStyle(item: SavedItem) {
  const payload = item.payload as Record<string, any>
  if (props.category === 'gradient') {
    const colors = Array.isArray(payload.colors)
      ? payload.colors
      : []
    const stops = colors
      .map((c: any) => `${c.color ?? '#000'} ${c.position ?? 0}%`)
      .join(', ')
    const angle = typeof payload.angle === 'number' ? payload.angle : 90
    switch (payload.type) {
      case 'radial':
        return { background: `radial-gradient(circle, ${stops})` }
      case 'conic':
        return { background: `conic-gradient(from ${angle}deg, ${stops})` }
      default:
        return { background: `linear-gradient(${angle}deg, ${stops})` }
    }
  }
  if (props.category === 'shadow') {
    const layers = Array.isArray(payload.layers) ? payload.layers : []
    const boxShadow = layers
      .map((layer: any) => {
        const color = layer.color ?? '#000'
        return `${layer.inset ? 'inset ' : ''}${layer.x ?? 0}px ${layer.y ?? 0}px 0 ${layer.spread ?? 0}px ${color}`
      })
      .join(', ')
    return {
      boxShadow
    }
  }
  return {}
}

function animationPreview(item: SavedItem) {
  const payload = item.payload as { css?: string; html?: string }
  return payload.css ? payload.css : payload.html ?? ''
}

onMounted(loadItems)
</script>

<style scoped lang="scss">
.profile-saved-list {
  padding: $space-xl 0;

  &__header {
    margin-bottom: $space-lg;
  }

  &__tag {
    margin: 0;
    color: $color-text-secondary;
    text-transform: uppercase;
    font-size: $font-size-sm;
    letter-spacing: 0.08em;
  }

  &__title {
    margin: $space-xs 0;
    font-size: $font-size-2xl;
    color: $color-text-primary;
  }

  &__subtitle {
    margin: 0;
    color: $color-text-secondary;
  }

  &__empty {
    padding: $space-lg;
    color: $color-text-secondary;
    text-align: center;
  }

  &__grid {
    display: grid;
    gap: $space-lg;
  }

  &__card {
    display: flex;
    gap: $space-lg;
    padding: $space-lg;
    border-radius: $border-radius-lg;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  &__preview {
    width: 120px;
    height: 120px;
    border-radius: $border-radius-lg;
    background: rgba(255, 255, 255, 0.05);
  }

  &__preview-swatch {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  &__preview-shadow {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: $color-bg-primary;
  }

  &__preview-animation {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: $space-sm;
    font-size: $font-size-xs;
    color: $color-text-secondary;
    overflow: auto;
    white-space: pre-wrap;
    background: rgba(0, 0, 0, 0.2);
    border-radius: inherit;
  }

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: $space-sm;
  }

  &__body-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $space-sm;
  }

  &__status {
    padding: 3px 10px;
    border-radius: $border-radius-full;
    font-size: $font-size-xs;
    text-transform: capitalize;

    &_private {
      background: color-var-alpha('color-text-secondary', 0.15);
      color: $color-text-secondary;
    }

    &_pending {
      background: color-var-alpha('color-warning', 0.15);
      color: $color-warning;
    }

    &_approved {
      background: color-var-alpha('color-success', 0.15);
      color: $color-success;
    }
  }

  &__meta {
    margin: 0;
    color: $color-text-secondary;
    font-size: $font-size-sm;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-sm;
  }

  &__hint {
    color: $color-text-secondary;
    font-size: $font-size-sm;
  }
}
</style>
