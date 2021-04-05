import { Product, ProductCarted } from '@/types/types'
import { computed, ComputedRef, DeepReadonly, readonly, Ref, ref } from 'vue'
import { calcProductDiscount } from '@/helpers/calcProductDiscount'
import { floatFix } from '@/helpers/numbers'

interface CartTotal {
  quantity: number
  priceBeforeDiscount: number
  priceDiscount: number
  priceAfterDiscount: number
}

const items = ref<ProductCarted[]>([])
const total = computed<CartTotal>(() => _calcCartTotal(items.value))

function addItem(product: Product): ProductCarted {
  const incrementedItem = incrementItem(product, 1)
  if (incrementedItem) return incrementedItem

  items.value.push(_calcProductCarted(product, 1))
  return items.value[items.value.length - 1]
}

function incrementItem(
  product: Product,
  amount: number = product.step || 1
): ProductCarted | null {
  const idx = items.value.findIndex((el) => el.id === product.id)
  if (idx === -1) return null

  const item = items.value[idx]
  const newQuantity = floatFix(item.quantity + amount)
  if (newQuantity <= 0) {
    removeItem(product)
    return null
  }

  items.value[idx] = _calcProductCarted(item, newQuantity)
  return items.value[idx]
}

function decrementItem(
  product: Product,
  amount: number = product.step || 1
): ProductCarted | null {
  return incrementItem(product, -amount)
}

function removeItem(product: Product): void {
  items.value = items.value.filter((el) => el.id !== product.id)
}

function _calcProductCarted(product: Product, quantity: number): ProductCarted {
  const price = Math.round(quantity * product.price)
  const discount = Math.round(calcProductDiscount(price, product, quantity))
  const discounted = Math.round(price - discount)

  return {
    ...product,
    quantity,
    priceBeforeDiscount: price,
    priceDiscount: discount,
    priceAfterDiscount: discounted,
  }
}

function _calcCartTotal(products: ProductCarted[]): CartTotal {
  const initial: CartTotal = {
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

export default function useCart(): {
  items: DeepReadonly<Ref<ProductCarted[]>>
  total: ComputedRef<CartTotal>
  addItem: (id: Product) => ProductCarted
  incrementItem: (product: Product, amount?: number) => ProductCarted | null
  decrementItem: (product: Product, amount?: number) => ProductCarted | null
  removeItem: (product: Product) => void
} {
  return {
    items: readonly(items),
    total,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
  }
}
