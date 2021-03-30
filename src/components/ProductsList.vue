<template>
  <div class="products-list">
    <div v-for="item in products" :key="item.id" class="products-list__row">
      <p>
        {{ item.name }} - {{ item.price }} gold / {{ item.unit }}
        <template v-if="item.discountLabel">
          <span class="cr-g">({{ item.discountLabel }})</span>
        </template>
      </p>
      <button class="btn-underlined" type="button" @click="addItem(item)">
        Add
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import useCart from '@/composables/useCart'
import useProducts from '@/composables/useProducts'

export default defineComponent({
  setup() {
    const { products, loadProducts } = useProducts()
    const { addItem } = useCart()

    onMounted(loadProducts)

    return {
      products,
      addItem,
    }
  },
})
</script>

<style scoped lang="scss">
.products-list {
  display: grid;
  gap: 0.8rem;
  width: 100%;
}

.products-list__row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
