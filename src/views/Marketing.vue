<template>
  <div class="marketing">
    <h3 class="marketing__heading mb-16">Cart extra discounts:</h3>

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

    <h4 class="marketing__heading mtb-16">Promo codes:</h4>
    <div class="marketing__row">
      <span class="marketing__row-lbl">STATIC_10</span>
      <span class="marketing__row-val"> -10%</span>
    </div>
    <div class="marketing__row">
      <span class="marketing__row-lbl">THRESHOLD_400_20</span>
      <span class="marketing__row-val"> -20% (cart > 400 gold) </span>
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

<style scoped lang="scss">
.marketing {
  display: block;
  max-width: 40rem;
  margin: 2.4rem auto 0;
}

.marketing__row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0.8rem;
  margin: 0 -0.8rem;

  &:hover {
    background-color: var(--clr__green02);
  }
}
</style>
