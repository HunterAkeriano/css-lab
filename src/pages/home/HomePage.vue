<template>
  <div class="home-page">
    <div class="container">
      <header class="home-page__hero">
        <div class="home-page__title-row">
          <Logo class="home-page__logo" />
          <h1 class="home-page__hero-title">{{ t('HOME.TITLE') }}</h1>
        </div>

        <p class="home-page__hero-subtitle">
          {{ t('HOME.SUBTITLE') }}
        </p>

        <div class="home-page__hero-actions">
          <NavLink to="/gradient" className="button button--primary">
            {{ t('HOME.GRADIENT_BUTTON') }}
          </NavLink>

          <NavLink to="/shadow" className="button button--secondary">
            {{ t('HOME.SHADOW_BUTTON') }}
          </NavLink>

          <NavLink to="/animation" className="button button--secondary">
            {{ t('HOME.ANIMATION_BUTTON') }}
          </NavLink>
        </div>
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Logo from '@/shared/ui/logo/Logo.vue'
import { NavLink } from '@/shared/ui'

const { t } = useI18n()
</script>

<style lang="scss" scoped src="./HomePage.scss"></style>
