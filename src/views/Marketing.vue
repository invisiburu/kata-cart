<template>
  <div class="marketing">
    <div class="marketing__row">
      <span class="marketing__row-lbl">SALE -30%:</span>
      <label class="marketing__cb-wrp">
        <input
          type="checkbox"
          :checked="isSaleEnabled"
          @change="toggleSale()"
        />
        <span class="marketing__cb-lbl">Enabled</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import useCart from '@/composables/useCart'
import { CartDiscountStatic } from '@/helpers/cart-discount/CartDiscountStatic'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const { addCartDiscount, removeCartDiscount, findCartDiscount } = useCart()

    const saleStrategy = new CartDiscountStatic('SALE', 30)
    const isSaleEnabled = ref(findCartDiscount(saleStrategy.label) !== null)
    const toggleSale = () => {
      if (isSaleEnabled.value === true) {
        removeCartDiscount(saleStrategy)
      } else {
        addCartDiscount(saleStrategy)
      }
      isSaleEnabled.value = !isSaleEnabled.value
    }

    return { isSaleEnabled, toggleSale }
  },
})
</script>

<style scoped>
.marketing__row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 20rem;
}
</style>
