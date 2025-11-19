<template>
  <div id="app" class="app">
    <Header />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Header } from '@/widgets'
</script>

<style lang="scss">
.app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
