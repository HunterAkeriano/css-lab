<template>
  <div class="table-wrapper">
    <table class="table">
      <thead class="table__thead">
        <tr class="table__tr">
          <th
            v-for="column in columns"
            :key="column.key"
            :class="['table__th', { 'table__th_sortable': column.sortable }]"
            @click="column.sortable && $emit('sort', column.key)"
          >
            <slot :name="`header-${column.key}`" :column="column">
              {{ column.label }}
            </slot>
            <span v-if="sortBy === column.key" class="table__sort-icon">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="table__tbody">
        <tr
          v-for="(item, index) in data"
          :key="index"
          class="table__tr"
          @click="$emit('row-click', item)"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            class="table__td"
          >
            <slot :name="`cell-${column.key}`" :item="item">
              {{ item[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface Props {
  columns: Column[]
  data: any[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

defineProps<Props>()

defineEmits(['sort', 'row-click'])
</script>

<style lang="scss" scoped src="./table.scss"></style>
