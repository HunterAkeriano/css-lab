<template>
  <div class="not-found-page">
    <div class="container">
      <h1 class="not-found-page__title">404</h1>
      <p class="not-found-page__text">Страница не найдена</p>
      <router-link to="/" class="not-found-page__back-link">← Вернуться на главную</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    text-align: center;
  }
}

.not-found-page__title {
  font-size: 6rem;
  font-weight: $font-weight-bold;
  margin-bottom: $space-md;
  background: linear-gradient(135deg, $color-primary, $color-secondary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.not-found-page__text {
  font-size: $font-size-xl;
  color: $color-text-secondary;
  margin-bottom: $space-lg;
}

.not-found-page__back-link {
  color: $color-primary;
  font-weight: $font-weight-medium;
  font-size: $font-size-lg;

  &:hover {
    text-decoration: underline;
  }
}
</style>
