import { Product, ProductCarted } from '@/types/types'

interface CartState {
  items: ProductCarted[]
}

export default {
  namespaced: true,

  state: <CartState>{
    items: [],
  },

  getters: {
    items(state: CartState): ProductCarted[] {
      return state.items
    },
  },

  actions: {},

  mutations: {
    addItem(state: CartState, product: Product): void {
      const idx = state.items.findIndex((el) => el.id === product.id)
      if (idx !== -1) {
        const item = state.items[idx]
        item.quantity = incr(item.quantity, item.step)
        state.items[idx] = item
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
    },

    setItemQuantity(
      state: CartState,
      payload: { id: string; quantity: number }
    ): void {
      const item = state.items.find((el) => el.id === payload.id)
      if (!item) return

      item.quantity = payload.quantity
    },

    incrementItemQuantity(
      state: CartState,
      payload: { id: string; increment: number }
    ): void {
      const item = state.items.find((el) => el.id === payload.id)
      if (!item) return

      item.quantity = incr(item.quantity, payload.increment)
    },

    removeItem(state: CartState, id: string): void {
      state.items = state.items.filter((el) => el.id !== id)
    },
  },
}

function incr(base: number, amount = 1): number {
  return Number((base + amount).toFixed(2))
}
