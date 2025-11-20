<template>
  <div class="animation-examples">
    <div class="animation-page__gallery-header">
      <div>
        <p class="animation-page__gallery-tag">{{ t('ANIMATION.SNIPPETS_TAG') }}</p>
        <h2 class="animation-page__gallery-title">{{ t('ANIMATION.SNIPPETS_TITLE') }}</h2>
        <p class="animation-page__gallery-subtitle">
          {{ t('ANIMATION.SNIPPETS_SUBTITLE') }}
        </p>
      </div>
      <div class="animation-page__legend">
        <span class="animation-page__dot animation-page__dot_primary"></span>
        <span>{{ t('ANIMATION.HTML_CSS') }}</span>
      </div>
    </div>

    <div class="animation-page__controls">
      <div class="animation-page__search">
        <Input
          v-model="searchQuery"
          type="text"
          :placeholder="t('ANIMATION.SEARCH_PLACEHOLDER')"
          :label="t('ANIMATION.SEARCH_LABEL')"
        >
          <template #prefix>
            <Icon name="icon-search" :size="16" />
          </template>
        </Input>
      </div>

      <div class="animation-page__filter">
        <Select
          v-model="selectedCategory"
          :options="categoryOptions"
          :label="t('ANIMATION.FILTER_BY_TYPE')"
        />
      </div>

      <div class="animation-page__results">
        {{ t('ANIMATION.SHOWING_RESULTS', { count: filteredExamples.length, total: totalCount }) }}
      </div>
    </div>

    <div v-if="isSearching" class="animation-page__loading">
      <div class="animation-page__loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p class="animation-page__loading-text">{{ t('ANIMATION.SEARCHING') }}</p>
    </div>

    <div v-else-if="filteredExamples.length === 0" class="animation-page__empty">
      <Icon name="icon-search" :size="48" class="animation-page__empty-icon" />
      <h3 class="animation-page__empty-title">{{ t('ANIMATION.NO_RESULTS') }}</h3>
      <p class="animation-page__empty-text">{{ t('ANIMATION.NO_RESULTS_HINT') }}</p>
    </div>

    <div v-else class="animation-page__cards">
      <article
        v-for="example in paginatedExamples"
        :key="example.id"
        class="animation-card"
      >
        <div class="animation-card__head">
          <div>
            <p class="animation-card__tag">{{ t('ANIMATION.PREVIEW') }}</p>
            <h3 class="animation-card__title">{{ t(example.titleKey) }}</h3>
            <p class="animation-card__description">{{ t(example.descriptionKey) }}</p>
          </div>
        </div>

        <div class="animation-card__preview">
          <component :is="example.component" />
        </div>

        <NavLink
          className="animation-card__link"
          :to="`/animation/${example.id}`"
        >
          {{ t('ANIMATION.OPEN') }}
        </NavLink>
      </article>
    </div>

    <div v-if="totalPages > 1" class="animation-page__pagination">
      <button
        class="animation-page__pagination-button"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        {{ t('ANIMATION.PREVIOUS') }}
      </button>

      <div class="animation-page__pagination-numbers">
        <button
          v-for="page in visiblePages"
          :key="page"
          class="animation-page__pagination-number"
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>

      <button
        class="animation-page__pagination-button"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        {{ t('ANIMATION.NEXT') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { NavLink, Select, Input, Icon } from '@/shared/ui'
import type { SelectOption } from '@/shared/ui'
import type { AnimationCategory } from '@/entities/animation/model/examplesData'

interface ExampleItem {
  id: string
  titleKey: string
  descriptionKey: string
  category: AnimationCategory
  component: any
}

const props = defineProps<{
  examples: ExampleItem[] | ComputedRef<ExampleItem[]>
}>()

const { t } = useI18n()

const searchQuery = ref<string>('')
const debouncedSearchQuery = ref<string>('')
const isSearching = ref<boolean>(false)
const selectedCategory = ref<string>('all')
const currentPage = ref(1)
const itemsPerPage = 12
let debounceTimeout: number | null = null

const categoryOptions = computed<SelectOption[]>(() => [
  { label: t('ANIMATION.ALL_TYPES'), value: 'all' },
  { label: t('ANIMATION.CATEGORY.LOADERS'), value: 'loaders' },
  { label: t('ANIMATION.CATEGORY.MARQUEE'), value: 'marquee' },
  { label: t('ANIMATION.CATEGORY.EFFECTS'), value: 'effects' },
  { label: t('ANIMATION.CATEGORY.TRANSITIONS'), value: 'transitions' },
  { label: t('ANIMATION.CATEGORY.ORBITAL'), value: 'orbital' },
  { label: t('ANIMATION.CATEGORY.INTERACTIVE'), value: 'interactive' }
])

const normalizedExamples = computed<ExampleItem[]>(() =>
  Array.isArray((props.examples as any).value) ? (props.examples as any).value : (props.examples as ExampleItem[])
)

const totalCount = computed(() => normalizedExamples.value.length)

const filteredExamples = computed(() => {
  let filtered = normalizedExamples.value

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(example => example.category === selectedCategory.value)
  }

  // Filter by search query
  if (debouncedSearchQuery.value.trim()) {
    const query = debouncedSearchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(example => {
      const title = t(example.titleKey).toLowerCase()
      const description = t(example.descriptionKey).toLowerCase()
      return title.includes(query) || description.includes(query)
    })
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredExamples.value.length / itemsPerPage))

const paginatedExamples = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredExamples.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5

  let startPage = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  const endPage = Math.min(totalPages.value, startPage + maxVisible - 1)

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return pages
})

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Debounce search query
import { watch } from 'vue'
watch(searchQuery, (newQuery) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }

  if (newQuery.trim()) {
    isSearching.value = true
  }

  debounceTimeout = setTimeout(() => {
    debouncedSearchQuery.value = newQuery
    isSearching.value = false
    currentPage.value = 1
  }, 500)
})

// Reset to page 1 when category changes
watch(selectedCategory, () => {
  currentPage.value = 1
})
</script>

<style scoped lang="scss">
.animation-examples {
  display: flex;
  flex-direction: column;
  gap: $space-3xl;
  width: 100%;

  @media (max-width: $breakpoint-md) {
    gap: $space-2xl;
  }
}

.animation-page__gallery-header {
  display: flex;
  justify-content: space-between;
  gap: $space-2xl;
  align-items: flex-start;
  margin-bottom: $space-xl;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: $breakpoint-md) {
    gap: $space-lg;
    margin-bottom: $space-lg;
  }
}

.animation-page__gallery-tag {
  display: inline-flex;
  align-items: center;
  gap: $space-xs;
  padding: $space-xs $space-md;
  border-radius: $border-radius-full;
  background: linear-gradient(135deg, color-var-alpha('color-secondary', 0.12), color-var-alpha('color-accent', 0.08));
  color: $color-secondary;
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: $space-sm;
  border: 1px solid color-var-alpha('color-secondary', 0.2);
  box-shadow: 0 2px 12px color-var-alpha('color-secondary', 0.08);
}

.animation-page__gallery-title {
  font-size: $font-size-3xl;
  margin: 0 0 $space-md;
  font-weight: $font-weight-bold;
  letter-spacing: -0.015em;
  line-height: 1.2;

  @media (max-width: $breakpoint-md) {
    font-size: $font-size-2xl;
  }
}

.animation-page__gallery-subtitle {
  margin: 0;
  color: color-var-alpha('color-text-secondary', 0.85);
  max-width: 720px;
  line-height: 1.7;
  font-size: $font-size-base;
}

.animation-page__legend {
  display: inline-flex;
  align-items: center;
  gap: $space-sm;
  padding: $space-sm $space-lg;
  border-radius: $border-radius-full;
  background: color-var-alpha('color-bg-secondary', 0.5);
  color: color-var-alpha('color-text-secondary', 0.85);
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
  border: 1px solid color-var-alpha('panel-border', 0.2);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.animation-page__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;

  &_primary {
    background: linear-gradient(135deg, $color-primary, $color-accent);
    box-shadow:
      0 0 12px color-var-alpha('color-primary', 0.4),
      0 0 6px color-var-alpha('color-accent', 0.3);
  }
}

.animation-page__cards {
  display: grid;
  gap: $space-2xl;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  position: relative;
  z-index: 1;
  width: 100%;

  @media (max-width: $breakpoint-xl) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: $space-xl;
  }

  @media (max-width: $breakpoint-md) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
    gap: $space-lg;
  }
}

.animation-card {
  background: color-var-alpha('color-bg-secondary', 0.5);
  border: 1px solid color-var-alpha('panel-border', 0.25);
  border-radius: $border-radius-xl;
  padding: $space-xl;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: $space-lg;
  transition: all $transition-base;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      color-var-alpha('color-primary', 0.5),
      transparent
    );
    opacity: 0;
    transition: opacity $transition-base;
  }

  @media (max-width: $breakpoint-md) {
    padding: $space-lg;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: color-var-alpha('color-primary', 0.4);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.12),
      0 8px 20px color-var-alpha('color-primary', 0.08);

    &::before {
      opacity: 1;
    }
  }
}

.animation-card__head {
  display: flex;
  justify-content: space-between;
  gap: $space-md;
  align-items: flex-start;
  flex-wrap: wrap;
}

.animation-card__tag {
  display: inline-flex;
  align-items: center;
  gap: $space-xs;
  padding: $space-xs $space-sm;
  border-radius: $border-radius-full;
  background: linear-gradient(135deg, color-var-alpha('color-accent', 0.12), color-var-alpha('color-primary', 0.08));
  color: $color-accent;
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: $space-xs;
  border: 1px solid color-var-alpha('color-accent', 0.2);
  box-shadow: 0 2px 8px color-var-alpha('color-accent', 0.06);
}

.animation-card__title {
  margin: 0 0 $space-sm;
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.animation-card__description {
  margin: 0;
  color: color-var-alpha('color-text-secondary', 0.8);
  max-width: 540px;
  line-height: 1.6;
  font-size: $font-size-sm;
}

.animation-card__preview {
  border: 1px solid color-var-alpha('panel-border', 0.15);
  border-radius: $border-radius-lg;
  padding: $space-xl;
  background:
    radial-gradient(circle at 30% 30%, color-var-alpha('color-primary', 0.06), transparent 50%),
    color-var-alpha('color-bg-primary', 0.4);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  min-height: 200px;
  aspect-ratio: 4 / 3;
  display: grid;
  place-items: center;
  width: 100%;

  @media (max-width: $breakpoint-md) {
    padding: $space-lg;
    min-height: 160px;
  }
}

.animation-card__link {
  align-self: flex-start;
  margin-top: auto;
  transition: transform $transition-base;
  font-size: $font-size-sm;

  &:hover {
    transform: translateY(-2px);
  }
}

.animation-page__controls {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: end;
  gap: $space-xl;
  padding: $space-xl;
  background: color-var-alpha('color-bg-secondary', 0.5);
  border: 1px solid color-var-alpha('panel-border', 0.2);
  border-radius: $border-radius-xl;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr 1fr;

    .animation-page__results {
      grid-column: 1 / -1;
      text-align: center;
    }
  }

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
    gap: $space-lg;

    .animation-page__results {
      order: -1;
    }
  }
}

.animation-page__search {
  min-width: 280px;

  @media (max-width: $breakpoint-md) {
    width: 100%;
    min-width: unset;
  }
}

.animation-page__filter {
  min-width: 220px;

  @media (max-width: $breakpoint-md) {
    width: 100%;
    min-width: unset;
  }
}

.animation-page__results {
  font-size: $font-size-sm;
  color: color-var-alpha('color-text-secondary', 0.8);
  font-weight: $font-weight-medium;
}

.animation-page__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $space-lg;
  padding: $space-4xl $space-2xl;
  background: color-var-alpha('color-bg-secondary', 0.5);
  border: 1px solid color-var-alpha('panel-border', 0.2);
  border-radius: $border-radius-xl;
  text-align: center;
  min-height: 400px;
}

.animation-page__empty-icon {
  color: color-var-alpha('color-text-secondary', 0.4);
}

.animation-page__empty-title {
  margin: 0;
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: color-var-alpha('color-text-primary', 0.9);
}

.animation-page__empty-text {
  margin: 0;
  font-size: $font-size-base;
  color: color-var-alpha('color-text-secondary', 0.7);
  max-width: 400px;
}

.animation-page__pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $space-md;
  padding: $space-2xl 0;
  flex-wrap: wrap;
}

.animation-page__pagination-button {
  padding: $space-sm $space-lg;
  border-radius: $border-radius-lg;
  background: color-var-alpha('color-bg-secondary', 0.5);
  border: 1px solid color-var-alpha('panel-border', 0.3);
  color: color-var-alpha('color-text-primary', 1);
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  cursor: pointer;
  transition: all $transition-base;

  &:hover:not(:disabled) {
    background: color-var-alpha('color-primary', 0.1);
    border-color: $color-primary;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.animation-page__pagination-numbers {
  display: flex;
  gap: $space-xs;
}

.animation-page__pagination-number {
  min-width: 40px;
  padding: $space-sm $space-md;
  border-radius: $border-radius-lg;
  background: color-var-alpha('color-bg-secondary', 0.5);
  border: 1px solid color-var-alpha('panel-border', 0.3);
  color: color-var-alpha('color-text-primary', 1);
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  cursor: pointer;
  transition: all $transition-base;

  &:hover {
    background: color-var-alpha('color-primary', 0.1);
    border-color: $color-primary;
    transform: translateY(-2px);
  }

  &.active {
    background: $color-primary;
    border-color: $color-primary;
    color: white;
  }
}

.animation-page__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $space-lg;
  padding: $space-4xl $space-2xl;
  background: color-var-alpha('color-bg-secondary', 0.5);
  border: 1px solid color-var-alpha('panel-border', 0.2);
  border-radius: $border-radius-xl;
  min-height: 400px;
}

.animation-page__loader {
  display: flex;
  gap: $space-sm;
  align-items: center;

  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: $color-primary;
    animation: loaderBounce 1s ease-in-out infinite;

    &:nth-child(1) {
      animation-delay: 0s;
    }

    &:nth-child(2) {
      animation-delay: 0.1s;
    }

    &:nth-child(3) {
      animation-delay: 0.2s;
    }

    &:nth-child(4) {
      animation-delay: 0.3s;
    }
  }
}

.animation-page__loading-text {
  margin: 0;
  font-size: $font-size-base;
  color: color-var-alpha('color-text-secondary', 0.8);
  font-weight: $font-weight-medium;
}

@keyframes loaderBounce {
  0%, 80%, 100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  40% {
    transform: translateY(-16px) scale(1.1);
    opacity: 0.8;
  }
}
</style>
