<template>
  <div class="user-menu" v-click-outside="closeMenu">
    <button class="user-menu__trigger" @click="toggleMenu">
      <div class="user-menu__avatar">
        <img v-if="user.avatar" :src="user.avatar" :alt="user.name" class="user-menu__avatar-img" />
        <span v-else class="user-menu__avatar-initials">{{ initials }}</span>
      </div>
      <span class="user-menu__name">{{ user.name }}</span>
      <svg class="user-menu__arrow" :class="{ 'user-menu__arrow--open': isOpen }" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <transition name="dropdown">
      <div v-if="isOpen" class="user-menu__dropdown">
        <router-link to="/profile" class="user-menu__item" @click="closeMenu">
          <svg class="user-menu__item-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM4 14a6 6 0 0112 0v2H4v-2z"/>
          </svg>
          <span>Личный кабинет</span>
        </router-link>

        <div class="user-menu__divider"></div>

        <button class="user-menu__item user-menu__item--danger" @click="handleLogout">
          <svg class="user-menu__item-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 3a2 2 0 012-2h6a2 2 0 012 2v4h2V3a4 4 0 00-4-4H5a4 4 0 00-4 4v14a4 4 0 004 4h6a4 4 0 004-4v-4h-2v4a2 2 0 01-2 2H5a2 2 0 01-2-2V3zm11.293 4.707L17.586 11H7v2h10.586l-3.293 3.293 1.414 1.414L21.414 12l-5.707-5.707-1.414 1.414z"/>
          </svg>
          <span>Выйти</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/entities'
import type { User } from '@/entities'

interface Props {
  user: User
}

const props = defineProps<Props>()
const router = useRouter()
const authStore = useAuthStore()

const isOpen = ref(false)

const initials = computed(() => {
  const names = props.user.name.split(' ')
  return names.map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}

function handleLogout() {
  authStore.logout()
  closeMenu()
  router.push('/')
}

const vClickOutside = {
  mounted(el: HTMLElement, binding: { value: () => void }) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

<style lang="scss" scoped>
.user-menu {
  position: relative;

  &__trigger {
    display: flex;
    align-items: center;
    gap: $space-sm;
    padding: $space-xs $space-sm;
    border: none;
    background: transparent;
    border-radius: $border-radius-lg;
    cursor: pointer;
    transition: all $transition-base;

    &:hover {
      background: $color-bg-tertiary;
    }
  }

  &__avatar {
    width: 32px;
    height: 32px;
    border-radius: $border-radius-full;
    overflow: hidden;
    background: linear-gradient(135deg, $color-primary, $color-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__avatar-initials {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: white;
  }

  &__name {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-primary;

    @media (max-width: $breakpoint-sm) {
      display: none;
    }
  }

  &__arrow {
    transition: transform $transition-base;
    color: $color-text-secondary;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + $space-xs);
    right: 0;
    min-width: 200px;
    background: $color-bg-primary;
    border: 1px solid $color-border;
    border-radius: $border-radius-lg;
    box-shadow: $shadow-xl;
    padding: $space-xs;
    z-index: $z-dropdown;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: $space-sm;
    width: 100%;
    padding: $space-sm $space-md;
    border: none;
    background: transparent;
    border-radius: $border-radius-md;
    color: $color-text-primary;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    text-decoration: none;
    cursor: pointer;
    transition: all $transition-base;

    &:hover {
      background: $color-bg-tertiary;
    }

    &--danger {
      color: $color-error;

      &:hover {
        background: rgba($color-error, 0.1);
      }
    }
  }

  &__item-icon {
    flex-shrink: 0;
  }

  &__divider {
    height: 1px;
    background: $color-border;
    margin: $space-xs 0;
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all $transition-fast;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
