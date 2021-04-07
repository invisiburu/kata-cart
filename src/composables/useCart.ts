import { Product, ProductCarted } from '@/types/types'
import { computed, ComputedRef, DeepReadonly, readonly, Ref, ref } from 'vue'
import { calcProductDiscount } from '@/helpers/calcProductDiscount'
import { floatFix } from '@/helpers/numbers'
import { CartDiscountStrategy } from '@/helpers/cart-discount/CartDiscountStrategy'
import { promoCodeToCartDiscountStrategy } from '@/helpers/cart-discount/promoCodeToCartDiscountStrategy'

interface CartTotal {
  quantity: number
  priceBeforeDiscount: number
  priceDiscount: number
  priceAfterDiscount: number
}

const items = ref<ProductCarted[]>([])
const total = computed<CartTotal>(() => _calcCartTotal(items.value))
const promoCodes: string[] = []
const cartDiscounts = ref<CartDiscountStrategy[]>([])

function addItem(product: Product): ProductCarted {
  const incrementedItem = incrementItem(product, 1)
  if (incrementedItem) return incrementedItem

  const newItem = _getItemPriced(product, 1)
  const newItems = items.value.concat(newItem)
  items.value = _calcDiscounts(newItems, cartDiscounts.value)

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

  const newItems = Array.from(items.value)
  newItems[idx] = _getItemPriced(item, newQuantity)
  items.value = _calcDiscounts(newItems, cartDiscounts.value)

  return items.value[idx]
}

function decrementItem(
  product: Product,
  amount: number = product.step || 1
): ProductCarted | null {
  return incrementItem(product, -amount)
}

function removeItem(product: Product): void {
  const newItems = items.value.filter((el) => el.id !== product.id)
  items.value = _calcDiscounts(newItems, cartDiscounts.value)
}

function addPromoCode(promoCode: string): void {
  if (promoCodes.includes(promoCode)) {
    throw new RangeError('Such item already exists')
  }
  const newStrategy = promoCodeToCartDiscountStrategy(promoCode)

  promoCodes.push(promoCode)
  cartDiscounts.value.push(newStrategy)
  items.value = _calcDiscounts(items.value, cartDiscounts.value)
}

function removePromoCode(promoCode: string): void {
  const idx = promoCodes.indexOf(promoCode)
  if (idx === -1) return

  promoCodes.splice(idx, 1)
  cartDiscounts.value.splice(idx, 1)
  items.value = _calcDiscounts(items.value, cartDiscounts.value)
}

function _getItemPriced(product: Product, quantity: number): ProductCarted {
  const price = Math.round(quantity * product.price)

  return {
    ...product,
    quantity,
    priceBeforeDiscount: price,
    priceDiscount: 0,
    priceAfterDiscount: price,
  }
}

function _calcDiscounts(
  products: ProductCarted[],
  discounts: CartDiscountStrategy[]
): ProductCarted[] {
  return products.map((product, idx) => {
    const discProduct = calcProductDiscount(product.price, product)
    const discCart = discounts.reduce((discount, strategy) => {
      return discount + strategy.calcDiscount(product, idx, products)
    }, 0)

    const discount = Math.round(discProduct + discCart)
    const afterDiscount = Math.round(product.priceBeforeDiscount - discount)
    return {
      ...product,
      priceDiscount: discount,
      priceAfterDiscount: afterDiscount,
    }
  })
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
  addPromoCode: (promoCode: string) => void
  removePromoCode: (promoCode: string) => void
} {
  return {
    items: readonly(items),
    total,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    addPromoCode,
    removePromoCode,
  }
}
