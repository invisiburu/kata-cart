<template>
  <div class="cart-widget">
    <template v-for="item in items" :key="item.id">
      <div class="cart-widget__item mt-4">
        <p>
          {{ item.name }} x{{ item.quantity }}
          {{ item.unit === 'piece' ? '' : item.unit }} -
          {{ item.priceTotal }} gold
          <template v-if="item.priceDiscount">
            <span class="cr-g">
              ({{ item.priceBeforeDiscount }} - {{ item.priceDiscount }})
            </span>
          </template>
        </p>
      </div>
    </template>
    <template v-if="items && items.length > 0">
      <button class="btn-framed mt-8" type="button" @click="checkout()">
        Checkout
      </button>
    </template>
    <template v-else>
      <p class="cart-widget__empty-txt">Empty cart</p>
    </template>
  </div>
</template>

<script lang="ts">
import useCart from '@/composables/useCart'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const { items } = useCart()

    const checkout = () => console.log('CHECKOUT')

    return { items, checkout }
  },
})
</script>

<style scoped>
.cart-widget__empty-txt {
  color: var(--clr__gray);
}
</style>
