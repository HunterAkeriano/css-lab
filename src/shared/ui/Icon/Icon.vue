<template>
  <svg :class="['icon', className]" :width="size" :height="size" aria-hidden="true" focusable="false">
    <use :href="`#${name}`" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  name: string
  size?: number | string
  className?: string
}

withDefaults(defineProps<Props>(), {
  size: 24,
  className: ''
})
</script>

<style lang="scss" scoped src="./Icon.scss"></style>
