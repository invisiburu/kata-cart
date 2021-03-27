<template>
  <div class="goods-list">
    <div v-for="item in goods" :key="item.id" class="goods-list__row">
      {{ item.name }} - {{ item.price }} gold / {{ item.unit || 'piece' }}
      <button type="button" @click="addItem(item)">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Product } from '@/types/types'
import goods from '@/assets/goods.json'

export default defineComponent({
  setup() {
    const addItem = (el: Product) => console.log(el)

    return {
      goods,
      addItem,
    }
  },
})
</script>

<style scoped>
.goods-list {
  display: grid;
  gap: 8px;
  width: 100%;
  max-width: 400px;
  text-align: start;
}

.goods-list__row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
