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
        const quantity = floatFix(item.quantity + (item.step || 1))
        console.log(quantity)
        state.items[idx] = calcProductCarted(item, quantity)
      } else {
        state.items.push(calcProductCarted(product, 1))
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

      item.quantity = floatFix(item.quantity + payload.increment)
    },

    removeItem(state: CartState, id: string): void {
      state.items = state.items.filter((el) => el.id !== id)
    },
  },
}

function calcProductCarted(product: Product, quantity: number): ProductCarted {
  const beforeDiscount = Math.round(quantity * product.price)
  const discount = Math.round(calcDiscount(beforeDiscount, product.discount))
  const total = Math.round(beforeDiscount - discount)

  return {
    ...product,
    quantity,
    priceBeforeDiscount: beforeDiscount,
    priceDiscount: discount,
    priceTotal: total,
  }
}
