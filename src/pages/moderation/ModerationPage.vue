<template>
  <div class="moderation-page">
    <div class="moderation-page__header">
      <div>
        <h1 class="moderation-page__title">{{ t('MODERATION.TITLE') }}</h1>
        <p class="moderation-page__subtitle">{{ t('MODERATION.SUBTITLE') }}</p>
      </div>
      <button class="moderation-page__refresh" type="button" @click="fetchPending" :disabled="loading">
        {{ loading ? t('MODERATION.LOADING') : t('MODERATION.REFRESH') }}
      </button>
    </div>

    <div v-if="error" class="moderation-page__error">{{ error }}</div>

    <div v-if="loading && !items.length" class="moderation-page__empty">
      {{ t('MODERATION.LOADING') }}
    </div>

    <div v-else-if="!items.length" class="moderation-page__empty">
      {{ t('MODERATION.EMPTY') }}
    </div>

    <div v-else class="moderation-page__list">
      <div
        v-for="item in items"
        :key="item.id"
        class="moderation-page__card"
      >
        <div class="moderation-page__card-head">
          <div>
            <p class="moderation-page__category">{{ t(`MODERATION.CATEGORY_${item.category?.toUpperCase()}`) }}</p>
            <h3 class="moderation-page__name">{{ item.name }}</h3>
          </div>
          <button
            class="moderation-page__approve"
            type="button"
            :disabled="approvingId === item.id"
            @click="approve(item)"
          >
            {{ approvingId === item.id ? t('MODERATION.APPROVING') : t('MODERATION.APPROVE') }}
          </button>
        </div>
        <p class="moderation-page__date">
          {{ t('MODERATION.SUBMITTED') }} {{ new Date(item.createdAt).toLocaleString() }}
        </p>
        <pre class="moderation-page__payload">{{ formatPayload(item.payload) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  approveSubmission,
  listPendingModeration,
  type SavedItem,
  type SaveCategory
} from '@/shared/api/saves'

const { t } = useI18n()

const items = ref<SavedItem[]>([])
const loading = ref(false)
const approvingId = ref<string | null>(null)
const error = ref('')

function formatPayload(value: unknown) {
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return ''
  }
}

async function fetchPending() {
  loading.value = true
  error.value = ''
  try {
    items.value = await listPendingModeration()
  } catch (err: any) {
    error.value = err?.message || t('MODERATION.LOAD_ERROR')
  } finally {
    loading.value = false
  }
}

async function approve(item: SavedItem) {
  if (!item.category) return
  approvingId.value = item.id
  error.value = ''
  try {
    await approveSubmission(item.category as SaveCategory, item.id)
    items.value = items.value.filter((row) => row.id !== item.id)
  } catch (err: any) {
    error.value = err?.message || t('MODERATION.APPROVE_ERROR')
  } finally {
    approvingId.value = null
  }
}

onMounted(fetchPending)
</script>

<style scoped lang="scss">
@import '@/app/styles/variables';

.moderation-page {
  max-width: 960px;
  margin: 0 auto;
  padding: $space-2xl $space-lg;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $space-md;
    margin-bottom: $space-xl;
  }

  &__title {
    margin: 0;
    color: $color-text-primary;
    font-size: $font-size-3xl;
  }

  &__subtitle {
    margin: 0;
    color: $color-text-secondary;
  }

  &__refresh {
    padding: $space-sm $space-md;
    border-radius: $border-radius-md;
    border: 1px solid $color-primary;
    background: transparent;
    color: $color-text-primary;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: $color-primary;
      color: $color-text-primary;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__error {
    color: $color-error;
    margin-bottom: $space-md;
  }

  &__empty {
    color: $color-text-secondary;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $space-md;
  }

  &__card {
    padding: $space-lg;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: $border-radius-lg;
  }

  &__card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $space-md;
  }

  &__category {
    margin: 0;
    color: $color-text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: $font-size-sm;
  }

  &__name {
    margin: 0;
    color: $color-text-primary;
    font-size: $font-size-xl;
  }

  &__approve {
    padding: $space-sm $space-md;
    border-radius: $border-radius-md;
    border: none;
    background: $color-success;
    color: $color-text-primary;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__date {
    margin: $space-sm 0;
    color: $color-text-secondary;
  }

  &__payload {
    margin: 0;
    padding: $space-md;
    background: rgba(0, 0, 0, 0.2);
    border-radius: $border-radius-md;
    color: $color-text-primary;
    overflow: auto;
  }
}
</style>
