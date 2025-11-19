<template>
  <div class="profile-page">
    <div class="container">
      <h1 class="profile-page__title">Личный кабинет</h1>
      <p class="profile-page__text">В разработке...</p>
      <router-link to="/" class="profile-page__back-link">← Вернуться на главную</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.profile-page {
  padding: $space-2xl 0;
}

.profile-page__title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  margin-bottom: $space-md;
}

.profile-page__text {
  color: $color-text-secondary;
  margin-bottom: $space-lg;
}

.profile-page__back-link {
  color: $color-primary;
  font-weight: $font-weight-medium;

  &:hover {
    text-decoration: underline;
  }
}
</style>
