import useFloatFix from '@/composables/useFloatFix'
import { useProductPricesCalculator } from '@/composables/useProductPricesCalculator'
import { Product, ProductCarted } from '@/types/types'

const { floatFix } = useFloatFix()
const { calcPrices } = useProductPricesCalculator()

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
        state.items[idx] = calcPrices(item, quantity)
      } else {
        state.items.push(calcPrices(product, 1))
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
