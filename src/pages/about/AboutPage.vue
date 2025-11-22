<template>
  <div class="about-page">
    <div class="about-page__container">
      <header class="about-page__hero">
        <p class="about-page__eyebrow">{{ t('ABOUT.PAGE_TAG') }}</p>
        <h1 class="about-page__title">
          <span class="about-page__title-base">{{ t('ABOUT.PAGE_TITLE') }}</span>
          <br/>
          <span class="about-page__title-highlight">{{ t('ABOUT.PAGE_TITLE_HIGHLIGHT') }}</span>
        </h1>
        <p class="about-page__subtitle">{{ t('ABOUT.PAGE_SUBTITLE') }}</p>
        <div class="about-page__hero-spot" aria-hidden="true"></div>
        <div class="about-page__hero-ribbon" aria-hidden="true"></div>
        <div class="about-page__hero-grid" aria-hidden="true"></div>
      </header>

      <section class="about-page__section about-page__section_pricing">
        <div class="about-page__section-head">
          <div>
            <p class="about-page__tag">{{ t('ABOUT.PLANS_TAG') }}</p>
            <h2 class="about-page__section-title">{{ t('ABOUT.PLANS_TITLE') }}</h2>
            <p class="about-page__section-subtitle">{{ t('ABOUT.PLANS_SUBTITLE') }}</p>
          </div>
        </div>

        <div class="about-page__plans">
          <div
            v-for="plan in plans"
            :key="plan.tier"
            :class="['pricing-card', { 'pricing-card_popular': plan.popular }]"
          >
            <div v-if="plan.popular" class="pricing-card__badge">
              {{ t('PRICING.POPULAR') }}
            </div>

            <div class="pricing-card__header">
              <h3 class="pricing-card__name">{{ plan.name }}</h3>
              <div class="pricing-card__price">
                <span class="pricing-card__amount">${{ plan.price }}</span>
                <span class="pricing-card__interval">/ {{ t('PRICING.MONTHLY') }}</span>
              </div>
            </div>

            <ul class="pricing-card__features">
              <li
                v-for="(feature, index) in plan.features"
                :key="index"
                class="pricing-card__feature"
              >
                <Icon name="icon-check" :size="16" />
                <span>{{ t(feature) }}</span>
              </li>
            </ul>

            <Button
              :variant="plan.popular ? 'primary' : 'secondary'"
              size="lg"
              class="pricing-card__button"
              @click="handlePlanSelect(plan.tier)"
            >
              {{ plan.price === 0 ? t('PRICING.GET_STARTED') : t('PRICING.UPGRADE') }}
            </Button>
          </div>
        </div>
      </section>

      <section class="about-page__section about-page__section_users">
        <div class="about-page__section-head">
          <div>
            <p class="about-page__tag">{{ t('ABOUT.COMMUNITY_TAG') }}</p>
            <h2 class="about-page__section-title">{{ t('ABOUT.COMMUNITY_TITLE') }}</h2>
            <p class="about-page__section-subtitle">{{ t('ABOUT.COMMUNITY_SUBTITLE') }}</p>
          </div>
        </div>

        <UsersTable />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Icon, Button } from '@/shared/ui'
import { PRICING_PLANS, SubscriptionTier } from '@/shared/config/pricing'
import UsersTable from '@/widgets/about/users-table/UsersTable.vue'

const { t, locale } = useI18n()
const router = useRouter()

const plans = computed(() => [
  PRICING_PLANS[SubscriptionTier.FREE],
  PRICING_PLANS[SubscriptionTier.PRO],
  PRICING_PLANS[SubscriptionTier.PREMIUM]
])

function handlePlanSelect(tier: SubscriptionTier) {
  if (tier === SubscriptionTier.FREE) {
    router.push(`/${locale.value}/register`)
  } else {
    // TODO: Implement payment flow
    console.log(`Selected plan: ${tier}`)
  }
}
</script>

<style lang="scss" scoped src="./about-page.scss"></style>
