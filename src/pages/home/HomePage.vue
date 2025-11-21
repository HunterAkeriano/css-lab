<template>
  <div class="home-page">
    <div class="container">
      <section class="home-page__hero">
        <div class="home-page__title-row">
          <Logo class="home-page__logo" />
          <h1 class="home-page__hero-title">{{ t('HOME.TITLE') }}</h1>
        </div>

        <p class="home-page__hero-subtitle">
          {{ t('HOME.SUBTITLE') }}
        </p>

        <div class="home-page__hero-actions">
          <NavLink to="/gradient" className="button button_primary">
            {{ t('HOME.GRADIENT_BUTTON') }}
          </NavLink>

          <NavLink to="/shadow" className="button button_secondary">
            {{ t('HOME.SHADOW_BUTTON') }}
          </NavLink>

          <NavLink to="/animation" className="button button_secondary">
            {{ t('HOME.ANIMATION_BUTTON') }}
          </NavLink>
        </div>
      </section>
    </div>

    <div class="container">
      <section class="home-page__about">
        <div class="home-page__about-text">
          <p class="home-page__eyebrow">{{ t('HOME.ABOUT_TAG') }}</p>
          <h2 class="home-page__about-title">{{ t('HOME.ABOUT_TITLE') }}</h2>
          <p class="home-page__about-description">
            {{ t('HOME.ABOUT_TEXT') }}
          </p>
          <ul class="home-page__about-points">
            <li>{{ t('HOME.ABOUT_POINT_1') }}</li>
            <li>{{ t('HOME.ABOUT_POINT_2') }}</li>
            <li>{{ t('HOME.ABOUT_POINT_3') }}</li>
          </ul>
        </div>

        <div class="home-page__about-visual" aria-hidden="true">
          <div class="home-page__visual-card">
            <div class="home-page__visual-grid"></div>
            <div class="home-page__visual-planet"></div>
            <div class="home-page__visual-orbit"></div>
            <div class="home-page__visual-core"></div>
          </div>
        </div>
      </section>
    </div>

    <div class="container">
      <section class="home-page__features">
        <p class="home-page__eyebrow">{{ t('HOME.FEATURES_TAG') }}</p>
        <h2 class="home-page__features-title">{{ t('HOME.FEATURES_TITLE') }}</h2>

        <div class="home-page__features-grid">
          <div class="home-page__feature-card">
            <h3 class="home-page__feature-title">{{ t('HOME.FEATURES_GRADIENT_TITLE') }}</h3>
            <p class="home-page__feature-description">{{ t('HOME.FEATURES_GRADIENT_DESCRIPTION') }}</p>
            <NavLink to="/gradient" className="home-page__feature-link">
              {{ t('HOME.GRADIENT_BUTTON') }} →
            </NavLink>
          </div>

          <div class="home-page__feature-card">
            <h3 class="home-page__feature-title">{{ t('HOME.FEATURES_SHADOW_TITLE') }}</h3>
            <p class="home-page__feature-description">{{ t('HOME.FEATURES_SHADOW_DESCRIPTION') }}</p>
            <NavLink to="/shadow" className="home-page__feature-link">
              {{ t('HOME.SHADOW_BUTTON') }} →
            </NavLink>
          </div>

          <div class="home-page__feature-card">
            <h3 class="home-page__feature-title">{{ t('HOME.FEATURES_ANIMATION_TITLE') }}</h3>
            <p class="home-page__feature-description">{{ t('HOME.FEATURES_ANIMATION_DESCRIPTION') }}</p>
            <NavLink to="/animation" className="home-page__feature-link">
              {{ t('HOME.ANIMATION_BUTTON') }} →
            </NavLink>
          </div>
        </div>
      </section>
    </div>

    <div class="container">
      <section class="home-page__showcase">
        <p class="home-page__eyebrow">{{ t('HOME.SHOWCASE_TAG') }}</p>
        <h2 class="home-page__showcase-title">{{ t('HOME.SHOWCASE_TITLE') }}</h2>

        <div class="home-page__showcase-grid">
          <!-- Holographic Animation Example -->
          <div class="home-page__showcase-card">
            <div class="home-page__showcase-preview home-page__showcase-preview_animation">
              <div class="holographic-dream">
                <div class="holographic-dream__backdrop"></div>
                <div class="holographic-dream__glow"></div>
                <div class="holographic-dream__core"></div>
                <div class="holographic-dream__ring holographic-dream__ring_1"></div>
                <div class="holographic-dream__ring holographic-dream__ring_2"></div>
                <div class="holographic-dream__ring holographic-dream__ring_3"></div>
                <div class="holographic-dream__particles">
                  <div class="holographic-dream__particle" v-for="n in 20" :key="n" :style="{ '--particle-index': n }"></div>
                </div>
                <div class="holographic-dream__orbs">
                  <div class="holographic-dream__orb holographic-dream__orb_1"></div>
                  <div class="holographic-dream__orb holographic-dream__orb_2"></div>
                  <div class="holographic-dream__orb holographic-dream__orb_3"></div>
                </div>
                <div class="holographic-dream__shimmer"></div>
              </div>
            </div>
            <div class="home-page__showcase-info">
              <h3 class="home-page__showcase-label">{{ t('HOME.SHOWCASE_ANIMATION_LABEL') }}</h3>
              <p class="home-page__showcase-description">{{ t('HOME.SHOWCASE_ANIMATION_DESCRIPTION') }}</p>
              <NavLink to="/animation" className="home-page__showcase-link">
                {{ t('HOME.SHOWCASE_TRY') }} →
              </NavLink>
            </div>
          </div>

          <!-- Aurora Gradient Example -->
          <div class="home-page__showcase-card">
            <div class="home-page__showcase-preview home-page__showcase-preview_gradient">
              <div class="aurora-sunset">
                <div class="aurora-sunset__base"></div>
                <div class="aurora-sunset__layer aurora-sunset__layer_1"></div>
                <div class="aurora-sunset__layer aurora-sunset__layer_2"></div>
                <div class="aurora-sunset__layer aurora-sunset__layer_3"></div>
                <div class="aurora-sunset__rays"></div>
                <div class="aurora-sunset__shimmer"></div>
              </div>
            </div>
            <div class="home-page__showcase-info">
              <h3 class="home-page__showcase-label">{{ t('HOME.SHOWCASE_GRADIENT_LABEL') }}</h3>
              <p class="home-page__showcase-description">{{ t('HOME.SHOWCASE_GRADIENT_DESCRIPTION') }}</p>
              <NavLink to="/gradient" className="home-page__showcase-link">
                {{ t('HOME.SHOWCASE_TRY') }} →
              </NavLink>
            </div>
          </div>
        </div>
      </section>
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
