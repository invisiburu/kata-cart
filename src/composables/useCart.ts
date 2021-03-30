import { Product, ProductCarted } from '@/types/types'
import { computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'

export default function useCart(): {
  items: ComputedRef<ProductCarted[]>
  addItem: (id: Product) => void
  incrementItem: (product: Product | ProductCarted) => void
  decrementItem: (product: Product | ProductCarted) => void
  removeItem: (product: Product | ProductCarted) => void
} {
  const store = useStore()

  return {
    items: computed(() => store.getters['cart/items']),

    addItem: (product: Product) => {
      store.commit('cart/addItem', product)
    },

    incrementItem: (product: Product | ProductCarted) => {
      const { id, step = 1 } = product
      store.commit('cart/incrementItemQuantity', { id, increment: step })
    },

    decrementItem: (product: Product | ProductCarted) => {
      const { id, step = 1 } = product
      store.commit('cart/incrementItemQuantity', { id, increment: -step })
    },

    removeItem: (product: Product | ProductCarted) => {
      store.commit('cart/removeItem', product.id)
    },
  }
}
