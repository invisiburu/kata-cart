import { Product, ProductCarted } from '@/types/types'
import { computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'

export default function useCart(): {
  items: ComputedRef<ProductCarted[]>
  addItem: (id: Product) => void
  setItemQuantity: (id: string, quantity: number) => void
  incrementItemQuantity: (id: string, increment: number) => void
  removeItem: (id: string) => void
} {
  const store = useStore()

  return {
    items: computed(() => store.getters['cart/items']),

    addItem: (product: Product) => {
      store.commit('cart/addItem', product)
    },

    setItemQuantity: (id: string, quantity: number) => {
      store.commit('cart/setItemQuantity', { id, quantity })
    },

    incrementItemQuantity: (id: string, increment: number) => {
      store.commit('cart/incrementItemQuantity', { id, increment })
    },

    removeItem: (id: string) => {
      store.commit('cart/removeItem', id)
    },
  }
}
