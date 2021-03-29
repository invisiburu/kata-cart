interface DiscountStrategyBase {
  type: string
  var: string | number | (string | number)[]
}

export interface DiscountStrategyStatic extends DiscountStrategy {
  type: 'static'
  var: number
}

export type DiscountStrategy = DiscountStrategyStatic | DiscountStrategyBase
