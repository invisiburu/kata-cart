import { DiscountStrategy, DiscountStrategyStatic } from '@/types/discount'

export function calcDiscountLabel(strategy?: DiscountStrategy): string {
  if (!strategy || !strategy.type) return ''

  switch (strategy.type) {
    case 'static':
      return calcDiscountLabelStatic(strategy)

    default:
      return ''
  }
}

function calcDiscountLabelStatic(strategy: DiscountStrategyStatic): string {
  return `-${strategy.var * 100}%`
}
