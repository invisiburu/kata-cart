<template>
  <section v-if="cartDiscounts.length" class="cart-discounts-widget">
    <h4>Discounts:</h4>

    <div class="cart-discounts-widget__table">
      <div
        v-for="discount in cartDiscounts"
        :key="discount.label"
        class="cart-discounts-widget__row"
      >
        <span class="cart-discounts-widget__row-lbl">
          {{ discount.label }}
        </span>

        <button
          v-if="discount.promoCode"
          class="btn-underlined"
          @click="removePromoCode(discount.promoCode)"
        >
          Revoke
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import useCart from '@/composables/useCart'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const { cartDiscounts, removePromoCode } = useCart()

    return { cartDiscounts, removePromoCode }
  },
})
</script>

<style scoped>
.cart-discounts-widget__table {
  display: grid;
  grid: auto-flow auto / auto;
  gap: 0.8rem;
}

.cart-discounts-widget__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 2.6rem;
}
</style>
