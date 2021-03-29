import { DiscountStrategy, DiscountStrategyStatic } from '@/types/discount'
import { Product, ProductCarted } from '@/types/types'
import useFloatFix from './useFloatFix'

const { floatFix } = useFloatFix()

export function useProductPricesCalculator(): {
  calcPrices: (src: Product, quantity: number) => ProductCarted
} {
  return {
    calcPrices,
  }
}

function calcPrices(src: Product, quantity: number): ProductCarted {
  const beforeDiscount = calcPriceBeforeDiscount(quantity, src.price)
  const discount = calcPriceDiscount(beforeDiscount, src.discount)
  const total = calcPriceTotal(beforeDiscount, discount)

  return {
    ...src,
    quantity,
    priceBeforeDiscount: beforeDiscount,
    priceDiscount: discount,
    priceTotal: total,
  }
}

function calcPriceBeforeDiscount(
  quantity: number,
  pricePerItem: number
): number {
  return floatFix(quantity * pricePerItem)
}

function calcPriceDiscount(
  priceBeforeDiscount: number,
  strategy?: DiscountStrategy
): number {
  if (!strategy || !strategy.type) return 0

  switch (strategy.type) {
    case 'static':
      return calcPriceDiscountStatic(
        priceBeforeDiscount,
        <DiscountStrategyStatic>strategy
      )

    default:
      return 0
  }
}

function calcPriceDiscountStatic(
  priceBeforeDiscount: number,
  strategy: DiscountStrategyStatic
) {
  return floatFix(priceBeforeDiscount * strategy.var)
}

function calcPriceTotal(priceBeforeDiscount: number, priceDiscount: number) {
  return floatFix(priceBeforeDiscount - priceDiscount)
}
