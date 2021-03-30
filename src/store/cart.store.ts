import { calcDiscount } from '@/helpers/calcDiscount'
import { floatFix } from '@/helpers/numbers'
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
        state.items[idx] = calcProductCarted(item, item.quantity + 1)
      } else {
        state.items.push(calcProductCarted(product, 1))
      }
    },

    incrementItemQuantity(
      state: CartState,
      payload: { id: string; increment: number }
    ): void {
      const idx = state.items.findIndex((el) => el.id === payload.id)
      if (idx === -1) return

      const item = state.items[idx]
      const newQuantity = floatFix(item.quantity + payload.increment)

      if (newQuantity <= 0) {
        state.items = state.items.filter((el) => el.id !== payload.id)
      } else {
        state.items[idx] = calcProductCarted(item, newQuantity)
      }
    },

    removeItem(state: CartState, id: string): void {
      state.items = state.items.filter((el) => el.id !== id)
    },
  },
}

function calcProductCarted(product: Product, quantity: number): ProductCarted {
  const price = Math.round(quantity * product.price)
  const discount = Math.round(calcDiscount(price, product, quantity))
  const discounted = Math.round(price - discount)

  return {
    ...product,
    quantity,
    priceBeforeDiscount: price,
    priceDiscount: discount,
    priceAfterDiscount: discounted,
  }
}
