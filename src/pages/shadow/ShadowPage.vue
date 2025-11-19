<template>
  <div class="shadow-page">
    <div class="container">
      <h1 class="shadow-page__title">Генератор теней</h1>
      <p class="shadow-page__text">В разработке...</p>
      <router-link to="/" class="shadow-page__back-link">← Вернуться на главную</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.shadow-page {
  padding: $space-2xl 0;
}

.shadow-page__title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  margin-bottom: $space-md;
}

.shadow-page__text {
  color: $color-text-secondary;
  margin-bottom: $space-lg;
}

.shadow-page__back-link {
  color: $color-primary;
  font-weight: $font-weight-medium;

  &:hover {
    text-decoration: underline;
  }
}
</style>
