<template>
  <div class="cart-widget">
    <template v-for="item in items" :key="item.id">
      <div class="cart-widget__item">
        <p class="cart-widget__item-txt">
          {{ item.name }}
          <template v-if="item.unit === 'piece'">
            x{{ item.quantity }}
          </template>
          <template v-else-if="item.unit === 'kg'">
            {{ item.quantity }} kg
          </template>
          - {{ item.priceAfterDiscount }} gold
          <template v-if="item.priceDiscount">
            <span class="cr-g">
              ({{ item.priceBeforeDiscount }} - {{ item.priceDiscount }})
            </span>
          </template>
        </p>
        <button
          class="cart-widget__item-btn btn-framed"
          type="button"
          @click="decrementItem(item, undefined, $event)"
        >
          -
        </button>
        <button
          class="cart-widget__item-btn btn-framed"
          type="button"
          @click="incrementItem(item, undefined, $event)"
        >
          +
        </button>
        <button
          class="cart-widget__item-btn btn-framed"
          type="button"
          @click="removeItem(item)"
        >
          Del
        </button>
      </div>
    </template>
    <template v-if="items && items.length > 0">
      <div class="cart-widget__total mt-8 mb-16">
        Total: {{ total.quantity }} items -
        <span>{{ total.priceAfterDiscount }}</span>
        <template v-if="total.priceDiscount > 0">
          <span class="cr-g">
            ({{ total.priceBeforeDiscount }} - {{ total.priceDiscount }})
          </span>
        </template>
      </div>

      <CartDiscountsWidget class="cart-widget__discounts mtb-24" />
      <PromoCodeWidget class="cart-widget__promo-code mtb-24" />

      <button
        class="cart-widget__checkout-btn btn-framed"
        type="button"
        @click="checkout()"
      >
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
import PromoCodeWidget from './PromoCodeWidget.vue'
import CartDiscountsWidget from './CartDiscountsWidget.vue'

export default defineComponent({
  components: { PromoCodeWidget, CartDiscountsWidget },

  setup() {
    const { items, total, incrementItem, decrementItem, removeItem } = useCart()

    const checkout = () => {
      alert('Please purchase the "Checkout" DLC to checkout your products!')
    }

    return { items, total, incrementItem, decrementItem, removeItem, checkout }
  },
})
</script>

<style scoped lang="scss">
.cart-widget__item {
  display: flex;
  flex-direction: row;
  align-items: center;

  & + & {
    margin-top: 0.8rem;
  }
}

.cart-widget__item-txt {
  flex: 1;
}

.cart-widget__item-btn {
  width: 100%;
  max-width: 3.6rem;
  line-height: 3.2rem;
  padding: 0;
  margin-left: 0.8rem;
}

.cart-widget__total {
  padding-top: 0.8rem;
  border-top: 1px solid var(--clr__lightGray);
}

.cart-widget__discounts,
.cart-widget__promo-code {
  max-width: 40rem;
}

.cart-widget__empty-txt {
  color: var(--clr__gray);
}

.cart-widget__checkout-btn {
  margin-top: 1.6rem;
}
</style>
