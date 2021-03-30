interface DiscountStrategyBase {
  type: string
  var: string | number | (string | number)[]
}

export interface DiscountStrategyStatic extends DiscountStrategy {
  type: 'static'
  var: number
}

export interface DiscountStrategyProgressive extends DiscountStrategy {
  type: 'progressive'
  var: [number, number][]
}

export interface DiscountStrategyOneFree extends DiscountStrategy {
  type: 'oneFree'
  var: number | number[]
}

export type DiscountStrategy =
  | DiscountStrategyStatic
  | DiscountStrategyProgressive
  | DiscountStrategyOneFree
