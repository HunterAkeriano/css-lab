<template>
  <div class="users-table">
    <header class="users-table__header">
      <h2 class="users-table__title">{{ t('ABOUT.OUR_COMMUNITY') }}</h2>
      <p class="users-table__subtitle">{{ t('ABOUT.COMMUNITY_DESCRIPTION') }}</p>

      <div class="users-table__filters">
        <Select
          v-model="filters.tier"
          :options="tierOptions"
          class="users-table__filter"
          @update:modelValue="handleFilterChange"
        />
        <span class="users-table__count">{{ t('ABOUT.TOTAL_USERS', { count: totalUsers }) }}</span>
      </div>
    </header>

    <div v-if="loading && !users.length" class="users-table__loading">
      {{ t('ABOUT.LOADING_USERS') }}
    </div>

    <div v-else-if="error" class="users-table__error">
      {{ error }}
    </div>

    <div v-else-if="!users.length" class="users-table__empty">
      {{ t('ABOUT.NO_USERS') }}
    </div>

    <div v-else class="users-table__wrapper">
      <table class="users-table__table">
        <thead class="users-table__thead">
          <tr>
            <th class="users-table__th users-table__th_avatar">{{ t('ABOUT.TABLE.AVATAR') }}</th>
            <th
              class="users-table__th users-table__th_sortable"
              @click="handleSort('name')"
            >
              {{ t('ABOUT.TABLE.NAME') }}
              <span v-if="sortBy === 'name'" class="users-table__sort-icon">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th
              class="users-table__th users-table__th_sortable users-table__th_hide-mobile"
              @click="handleSort('email')"
            >
              {{ t('ABOUT.TABLE.EMAIL') }}
              <span v-if="sortBy === 'email'" class="users-table__sort-icon">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th
              class="users-table__th users-table__th_sortable users-table__th_hide-mobile"
              @click="handleSort('createdAt')"
            >
              {{ t('ABOUT.TABLE.JOINED') }}
              <span v-if="sortBy === 'createdAt'" class="users-table__sort-icon">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th
              class="users-table__th users-table__th_sortable"
              @click="handleSort('subscriptionTier')"
            >
              {{ t('ABOUT.TABLE.STATUS') }}
              <span v-if="sortBy === 'subscriptionTier'" class="users-table__sort-icon">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="users-table__tbody">
          <tr
            v-for="user in users"
            :key="user.id"
            class="users-table__tr"
          >
            <td class="users-table__td users-table__td_avatar">
              <div class="user-avatar">
                <img
                  v-if="user.avatarUrl"
                  :src="user.avatarUrl"
                  :alt="user.name || user.email"
                  class="user-avatar__img"
                />
                <span v-else class="user-avatar__initials">{{ getUserInitials(user) }}</span>
              </div>
            </td>
            <td class="users-table__td users-table__td_name">
              {{ user.name || user.email.split('@')[0] }}
            </td>
            <td class="users-table__td users-table__td_hide-mobile">
              {{ user.email }}
            </td>
            <td class="users-table__td users-table__td_hide-mobile">
              {{ formatDate(user.createdAt) }}
            </td>
            <td class="users-table__td users-table__td_status">
              <div class="user-status">
                <Icon
                  v-if="user.subscriptionTier !== 'free'"
                  :size="14"
                  :class="['user-status__crown', { 'user-status__crown_premium': user.subscriptionTier === 'premium' }]"
                  name="icon-crown"
                />
                <span
                  :class="['user-status__badge', `user-status__badge_${user.subscriptionTier}`]"
                >
                  {{ t(`ABOUT.TIER.${user.subscriptionTier.toUpperCase()}`) }}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div ref="loadMoreTrigger" class="users-table__sentinel" aria-hidden="true"></div>

    <div v-if="hasMore && !loading" class="users-table__load-more">
      <Button
        variant="secondary"
        size="md"
        @click="loadMore"
      >
        {{ t('ABOUT.LOAD_MORE') }}
      </Button>
    </div>

    <div v-if="loading && users.length" class="users-table__loading-more">
      {{ t('ABOUT.LOADING_MORE') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeUnmount, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { Button, Select, Icon } from '@/shared/ui'
import type { SelectOption } from '@/shared/ui'
import { getUsers, type PublicUser } from '@/shared/api/users'

type TierFilter = 'all' | 'free' | 'pro' | 'premium'
type SortField = 'name' | 'email' | 'createdAt' | 'subscriptionTier'

const allowedSorts: Record<string, SortField> = {
  name: 'name',
  email: 'email',
  createdat: 'createdAt',
  subscriptiontier: 'subscriptionTier'
}

const normalizeTier = (value?: string): TierFilter => {
  const tier = (value || '').toLowerCase()
  if (tier === 'free' || tier === 'pro' || tier === 'premium') {
    return tier
  }
  return 'all'
}

const normalizeSortBy = (value?: string): SortField => {
  if (!value) return 'createdAt'
  const normalized = value.toLowerCase()
  return allowedSorts[normalized] ?? 'createdAt'
}

const normalizeSortOrder = (value?: string): 'asc' | 'desc' => {
  if (!value) return 'desc'
  return value.toLowerCase() === 'asc' ? 'asc' : 'desc'
}

type QueryState = {
  tier: TierFilter
  sortBy: SortField
  sortOrder: 'asc' | 'desc'
}

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

const users = ref<PublicUser[]>([])
const loading = ref(false)
const error = ref('')
const currentPage = ref(1)
const totalUsers = ref(0)
const hasMore = ref(false)
const loadMoreTrigger = ref<HTMLElement | null>(null)
const pageSize = 20
let observer: IntersectionObserver | null = null

const buildQueryStateFromRoute = (): QueryState => ({
  tier: normalizeTier(route.query.tier as string | undefined),
  sortBy: normalizeSortBy(route.query.sortBy as string | undefined),
  sortOrder: normalizeSortOrder(route.query.sortOrder as string | undefined)
})

const filters = ref({
  tier: 'all' as TierFilter
})

const sortBy = ref<SortField>('createdAt')
const sortOrder = ref<'asc' | 'desc'>('desc')

const lastSyncedQuery = ref<QueryState>(buildQueryStateFromRoute())

filters.value.tier = lastSyncedQuery.value.tier
sortBy.value = lastSyncedQuery.value.sortBy
sortOrder.value = lastSyncedQuery.value.sortOrder

const tierOptions = computed<SelectOption[]>(() => [
  { value: 'all', label: t('ABOUT.FILTER.ALL') },
  { value: 'free', label: t('ABOUT.FILTER.FREE') },
  { value: 'pro', label: t('ABOUT.FILTER.PRO') },
  { value: 'premium', label: t('ABOUT.FILTER.PREMIUM') }
])

function updateRouteQueryState() {
  const nextState: QueryState = {
    tier: filters.value.tier,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value
  }

  const sameState =
    lastSyncedQuery.value.tier === nextState.tier &&
    lastSyncedQuery.value.sortBy === nextState.sortBy &&
    lastSyncedQuery.value.sortOrder === nextState.sortOrder

  if (sameState) {
    return
  }

  lastSyncedQuery.value = nextState

  const nextQuery = {
    ...route.query,
    tier: nextState.tier,
    sortBy: nextState.sortBy,
    sortOrder: nextState.sortOrder
  }

  router.replace({ query: nextQuery }).catch(() => {})
}

function getUserInitials(user: PublicUser): string {
  const name = user.name || user.email
  return name.substring(0, 2).toUpperCase()
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

async function loadUsers(options: { reset?: boolean; page?: number } = {}) {
  if (loading.value) return

  const { reset = false, page = currentPage.value } = options

  if (reset) {
    users.value = []
    currentPage.value = 1
    hasMore.value = false
  }

  loading.value = true
  error.value = ''

  try {
    const response = await getUsers({
      page,
      limit: pageSize,
      tier: filters.value.tier,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value
    })

    if (reset) {
      users.value = response.users
      currentPage.value = 1
    } else {
      users.value.push(...response.users)
      currentPage.value = page
    }

    totalUsers.value = response.pagination.total
    hasMore.value = response.pagination.hasMore
  } catch (err: any) {
    error.value = err?.message || t('ABOUT.ERROR_LOADING')
    hasMore.value = false
  } finally {
    loading.value = false
  }
}

function handleFilterChange() {
  updateRouteQueryState()
  loadUsers({ reset: true, page: 1 })
}

function handleSort(field: SortField) {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'desc'
  }
  updateRouteQueryState()
  loadUsers({ reset: true, page: 1 })
}

function loadMore() {
  if (!hasMore.value || loading.value) return
  const nextPage = currentPage.value + 1
  loadUsers({ page: nextPage })
}

function isTriggerVisible() {
  if (!loadMoreTrigger.value) return false
  const rect = loadMoreTrigger.value.getBoundingClientRect()
  return rect.top <= window.innerHeight
}

function setupObserver() {
  if (observer) {
    observer.disconnect()
  }

  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadMore()
        }
      })
    },
    { rootMargin: '160px 0px' }
  )

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
}

watch(
  () => [route.query.tier, route.query.sortBy, route.query.sortOrder],
  ([tier, sortField, order]) => {
    const queryState: QueryState = {
      tier: normalizeTier(tier as string | undefined),
      sortBy: normalizeSortBy(sortField as string | undefined),
      sortOrder: normalizeSortOrder(order as string | undefined)
    }

    const matchesCurrent =
      queryState.tier === lastSyncedQuery.value.tier &&
      queryState.sortBy === lastSyncedQuery.value.sortBy &&
      queryState.sortOrder === lastSyncedQuery.value.sortOrder

    if (matchesCurrent) {
      return
    }

    filters.value.tier = queryState.tier
    sortBy.value = queryState.sortBy
    sortOrder.value = queryState.sortOrder
    lastSyncedQuery.value = queryState
    loadUsers({ reset: true, page: 1 })
  }
)

onMounted(() => {
  setupObserver()
  loadUsers({ reset: true, page: 1 })
})

watch(loadMoreTrigger, (newNode, oldNode) => {
  if (oldNode && observer) {
    observer.unobserve(oldNode)
  }
  if (newNode && observer) {
    observer.observe(newNode)
  }
})

watch(hasMore, () => {
  if (hasMore.value && isTriggerVisible()) {
    loadMore()
  }
})

watch(loading, (isLoading, wasLoading) => {
  if (wasLoading && !isLoading && hasMore.value && isTriggerVisible()) {
    loadMore()
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style lang="scss" scoped src="./users-table.scss"></style>
