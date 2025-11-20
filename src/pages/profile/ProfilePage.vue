<template>
  <div class="profile-page">
    <div class="container">
      <h1 class="profile-page__title">Личный кабинет</h1>
      <p class="profile-page__text">В разработке...</p>
      <NavLink to="/" className="profile-page__back-link">← Вернуться на главную</NavLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NavLink } from '@/shared/ui'
</script>

<style lang="scss" scoped src="./ProfilePage.scss"></style>
