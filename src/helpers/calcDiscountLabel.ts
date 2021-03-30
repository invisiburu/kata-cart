import {
  DiscountStrategy,
  DiscountStrategyStatic,
  DiscountStrategyProgressive,
  DiscountStrategyOneFree,
} from '@/types/discount'

export function calcDiscountLabel(strategy?: DiscountStrategy): string {
  if (!strategy || !strategy.type) return ''

  switch (strategy.type) {
    case 'static':
      return calcDiscountLabelStatic(strategy)

    case 'progressive':
      return calcDiscountLabelProgressive(strategy)

    case 'oneFree':
      return calcDiscountLabelOneFree(strategy)

    default:
      return ''
  }
}

function calcDiscountLabelStatic(strategy: DiscountStrategyStatic): string {
  return `-${strategy.var * 100}%`
}

function calcDiscountLabelProgressive(
  strategy: DiscountStrategyProgressive
): string {
  return strategy.var
    .map(([qty, amount]) => `${qty}+: -${amount * 100}%`)
    .join(', ')
}

function calcDiscountLabelOneFree(strategy: DiscountStrategyOneFree): string {
  const vars = Array.isArray(strategy.var) ? strategy.var : [strategy.var]
  const [discountQty, occurrencesLimit = 0] = vars
  const base = `${discountQty - 1} + 1 = ${discountQty - 1}`
  return occurrencesLimit <= 0
    ? base
    : `${base}, max ${occurrencesLimit} occur.`
}
