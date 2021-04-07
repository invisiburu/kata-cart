import { ProductCarted } from '@/types/types'
import { floatFix } from '@/helpers/numbers'
import { CartDiscountStrategy } from './CartDiscountStrategy'

export class CartDiscountThreshold implements CartDiscountStrategy {
  label: string
  promoCode?: string
  private _percents: number
  private _applyAfter: number
  private _curCartPrice = 0

  constructor(
    sourceName: string,
    applyAfter: number,
    decimals: number,
    promoCode?: string
  ) {
    if (!sourceName || typeof sourceName !== 'string') {
      throw new TypeError(`sourceName should be a string! Got: ${sourceName}`)
    }
    if (!(applyAfter && applyAfter !== 0) || typeof applyAfter !== 'number') {
      throw new TypeError(`applyAfter should be a number! Got: ${applyAfter}`)
    }
    if (!(decimals && decimals !== 0) || typeof decimals !== 'number') {
      throw new TypeError(`percents should be a number! Got: ${decimals}`)
    }

    this.label = this._calcLabel(sourceName, decimals, applyAfter)
    this.promoCode = promoCode
    this._percents = floatFix(decimals * 0.01)
    this._applyAfter = applyAfter
  }

  calcDiscount(product: ProductCarted, idx = 0, cart: ProductCarted[]): number {
    if (idx === 0) this._curCartPrice = this._calcCartPrice(cart)
    if (this._curCartPrice < this._applyAfter) return 0
    return product.priceBeforeDiscount * this._percents
  }

  private _calcCartPrice(products: ProductCarted[]): number {
    return products.reduce((total, el) => total + el.priceBeforeDiscount, 0)
  }

  private _calcLabel(sourceName: string, decimals: number, applyAfter: number) {
    return `${sourceName}: -${decimals}% (cart > ${applyAfter} gold)`
  }
}
