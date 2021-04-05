import {
  DiscountStrategyStatic,
  DiscountStrategyProgressive,
  DiscountStrategyOneFree,
} from '@/types/discount'
import { Product } from '@/types/types'

export function calcProductDiscount(
  price: number,
  product: Product,
  quantity: number
): number {
  if (!product?.discount?.type) return 0

  switch (product.discount.type) {
    case 'static':
      return _calcDiscStatic(price, product)

    case 'progressive':
      return _calcDiscProgressive(price, product, quantity)

    case 'oneFree':
      return _calcDiscOneFree(product, quantity)

    default:
      return 0
  }
}

function _calcDiscStatic(price: number, product: Product): number {
  const stg = <DiscountStrategyStatic>product.discount
  const percents = stg.var
  return price * percents
}

function _calcDiscProgressive(
  price: number,
  product: Product,
  quantity: number
): number {
  const stg = <DiscountStrategyProgressive>product.discount

  let percents = 0
  for (const [qty, pct] of stg.var) {
    if (quantity < qty) break
    percents = pct
  }
  return price * percents
}

function _calcDiscOneFree(product: Product, quantity: number): number {
  const strategy = <DiscountStrategyOneFree>product.discount
  const vars = Array.isArray(strategy.var) ? strategy.var : [strategy.var]
  const [discountQty, occurrencesLimit = 0] = vars
  if (occurrencesLimit > 0) {
    quantity = Math.min(quantity, discountQty * occurrencesLimit)
  }
  return Math.floor(quantity / discountQty) * product.price
}
