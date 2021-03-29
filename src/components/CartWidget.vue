<template>
  <div class="cart-widget">
    <template v-for="item in items" :key="item.id">
      <div class="cart-widget__item">{{ item.name }} - {{ item.quantity }}</div>
    </template>
    <template v-if="items && items.length > 0">
      <button type="button" @click="checkout()">Checkout</button>
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
