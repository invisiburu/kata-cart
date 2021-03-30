import { DiscountStrategy, DiscountStrategyStatic } from '@/types/discount'
import { Product, ProductCarted } from '@/types/types'
import { floatFix } from './numbers'

export function calcProductCarted(
  product: Product,
  quantity: number
): ProductCarted {
  const beforeDiscount = floatFix(quantity * product.price)
  const discount = calcDiscount(beforeDiscount, product.discount)
  const total = floatFix(beforeDiscount - discount)

  return {
    ...product,
    quantity,
    priceBeforeDiscount: beforeDiscount,
    priceDiscount: discount,
    priceTotal: total,
  }
}

function calcDiscount(
  priceBeforeDiscount: number,
  strategy?: DiscountStrategy
): number {
  if (!strategy || !strategy.type) return 0

  switch (strategy.type) {
    case 'static':
      return calcDiscountStatic(priceBeforeDiscount, strategy)

    default:
      return 0
  }
}

function calcDiscountStatic(
  priceBeforeDiscount: number,
  strategy: DiscountStrategyStatic
) {
  return Math.round(priceBeforeDiscount * strategy.var)
}
