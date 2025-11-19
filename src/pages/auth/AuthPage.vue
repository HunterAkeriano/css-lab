<template>
  <div class="auth-page">
    <div class="container">
      <h1 class="auth-page__title">Авторизация</h1>
      <p class="auth-page__text">В разработке...</p>
      <router-link to="/" class="auth-page__back-link">← Вернуться на главную</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.auth-page {
  padding: $space-2xl 0;
}

.auth-page__title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  margin-bottom: $space-md;
}

.auth-page__text {
  color: $color-text-secondary;
  margin-bottom: $space-lg;
}

.auth-page__back-link {
  color: $color-primary;
  font-weight: $font-weight-medium;

  &:hover {
    text-decoration: underline;
  }
}
</style>
