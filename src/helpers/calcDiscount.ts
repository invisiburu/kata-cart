import { DiscountStrategy, DiscountStrategyStatic } from '@/types/discount'

export function calcDiscount(
  price: number,
  strategy?: DiscountStrategy
): number {
  if (!strategy || !strategy.type) return 0

  switch (strategy.type) {
    case 'static':
      return calcDiscountStatic(price, strategy)

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
