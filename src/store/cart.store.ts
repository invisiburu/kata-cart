import { calcDiscount } from '@/helpers/calcDiscount'
import { floatFix } from '@/helpers/numbers'
import { Product, ProductCarted } from '@/types/types'

interface CartState {
  items: ProductCarted[]
  total: CartStateTotal
}

export interface CartStateTotal {
  quantity: number
  priceBeforeDiscount: number
  priceDiscount: number
  priceAfterDiscount: number
}

export default {
  namespaced: true,

  state: <CartState>{
    items: [],
    total: {
      quantity: 0,
      priceBeforeDiscount: 0,
      priceDiscount: 0,
      priceAfterDiscount: 0,
    },
  },

  getters: {
    items(state: CartState): ProductCarted[] {
      return state.items
    },
    total(state: CartState): CartStateTotal {
      return state.total
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
      state.total = calcProductTotal(state.items)
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
      state.total = calcProductTotal(state.items)
    },

    removeItem(state: CartState, id: string): void {
      state.items = state.items.filter((el) => el.id !== id)
      state.total = calcProductTotal(state.items)
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

function calcProductTotal(products: ProductCarted[]): CartStateTotal {
  const initial: CartStateTotal = {
    quantity: 0,
    priceBeforeDiscount: 0,
    priceDiscount: 0,
    priceAfterDiscount: 0,
  }
  return products.reduce((total, product) => {
    total.quantity += product.quantity
    total.priceBeforeDiscount += product.priceBeforeDiscount
    total.priceDiscount += product.priceDiscount
    total.priceAfterDiscount += product.priceAfterDiscount
    return total
  }, initial)
}
