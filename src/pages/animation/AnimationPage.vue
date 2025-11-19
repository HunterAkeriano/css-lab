<template>
  <div class="animation-page">
    <div class="container">
      <h1 class="animation-page__title">Генератор анимаций</h1>
      <p class="animation-page__text">В разработке...</p>
      <router-link to="/" class="animation-page__back-link">← Вернуться на главную</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.animation-page {
  padding: $space-2xl 0;
}

.animation-page__title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  margin-bottom: $space-md;
}

.animation-page__text {
  color: $color-text-secondary;
  margin-bottom: $space-lg;
}

.animation-page__back-link {
  color: $color-primary;
  font-weight: $font-weight-medium;

  &:hover {
    text-decoration: underline;
  }
}
</style>
