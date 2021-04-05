import {
  DiscountStrategy,
  DiscountStrategyStatic,
  DiscountStrategyProgressive,
  DiscountStrategyOneFree,
} from '@/types/discount'

export function calcProductDiscountLabel(strategy?: DiscountStrategy): string {
  if (!strategy || !strategy.type) return ''

  switch (strategy.type) {
    case 'static':
      return _calcLblStatic(strategy)

    case 'progressive':
      return _calcLblProgressive(strategy)

    case 'oneFree':
      return _calcLblOneFree(strategy)

    default:
      return ''
  }
}

function _calcLblStatic(strategy: DiscountStrategyStatic): string {
  return `-${strategy.var * 100}%`
}

function _calcLblProgressive(strategy: DiscountStrategyProgressive): string {
  return strategy.var
    .map(([qty, amount]) => `${qty}+: -${amount * 100}%`)
    .join(', ')
}

function _calcLblOneFree(strategy: DiscountStrategyOneFree): string {
  const vars = Array.isArray(strategy.var) ? strategy.var : [strategy.var]
  const [discountQty, occurrencesLimit = 0] = vars
  const base = `${discountQty - 1} + 1 = ${discountQty - 1}`
  return occurrencesLimit <= 0
    ? base
    : `${base}, max ${occurrencesLimit} occur.`
}
