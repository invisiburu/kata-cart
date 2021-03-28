import { ProductCarted } from '@/types/types'

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
    addItem(state: CartState, id: string): void {
      state.items.push({ id, quantity: 1 })
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

      item.quantity += payload.increment
    },

    removeItem(state: CartState, id: string): void {
      state.items = state.items.filter((el) => el.id !== id)
    },
  },
}
