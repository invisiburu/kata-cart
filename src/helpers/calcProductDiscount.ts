import {
  DiscountStrategyStatic,
  DiscountStrategyProgressive,
  DiscountStrategyOneFree,
} from '@/types/discount'
import { ProductCarted } from '@/types/types'

export function calcProductDiscount(
  priceBeforeDiscount: number,
  product: ProductCarted
): number {
  if (!product?.discount?.type) return 0

  switch (product.discount.type) {
    case 'static':
      return _calcDiscStatic(priceBeforeDiscount, product)

    case 'progressive':
      return _calcDiscProgressive(priceBeforeDiscount, product)

    case 'oneFree':
      return _calcDiscOneFree(product)

    default:
      return 0
  }
}

function _calcDiscStatic(price: number, product: ProductCarted): number {
  const stg = <DiscountStrategyStatic>product.discount
  const percents = stg.var
  return price * percents
}

function _calcDiscProgressive(price: number, product: ProductCarted): number {
  const stg = <DiscountStrategyProgressive>product.discount

  let percents = 0
  for (const [qty, pct] of stg.var) {
    if (product.quantity < qty) break
    percents = pct
  }
  return price * percents
}

function _calcDiscOneFree(product: ProductCarted): number {
  const strategy = <DiscountStrategyOneFree>product.discount
  const vars = Array.isArray(strategy.var) ? strategy.var : [strategy.var]
  const [discountQty, occurrencesLimit = 0] = vars
  let occurrences = Math.floor(product.quantity / discountQty)
  if (occurrencesLimit > 0) {
    occurrences = Math.min(occurrences, occurrencesLimit)
  }
  return occurrences * product.price
}
