import { ProductCarted } from '@/types/types'
import { floatFix } from '@/helpers/numbers'
import { CartDiscountStrategy } from './CartDiscountStrategy'

export class CartDiscountStatic implements CartDiscountStrategy {
  label: string
  private _percents: number

  constructor(sourceName: string, decimals: number) {
    if (!sourceName || typeof sourceName !== 'string') {
      throw new TypeError(`sourceName should be a string! Got: ${sourceName}`)
    }
    if (!(decimals && decimals !== 0) || typeof decimals !== 'number') {
      throw new TypeError(`percents should be a number! Got: ${decimals}`)
    }

    this.label = this._calcLabel(sourceName, decimals)
    this._percents = floatFix(decimals * 0.01)
  }

  calcDiscount(product: ProductCarted): ProductCarted {
    const discount = Math.round(product.priceBeforeDiscount * this._percents)

    const item = {
      ...product,
      priceDiscount: Math.round(product.priceDiscount + discount),
      priceAfterDiscount: Math.round(product.priceAfterDiscount - discount),
    }

    // TODO: if the discount applies do not apply it again

    return item
  }

  private _calcLabel(sourceName: string, decimals: number) {
    return `${sourceName}: -${decimals}%`
  }
}
