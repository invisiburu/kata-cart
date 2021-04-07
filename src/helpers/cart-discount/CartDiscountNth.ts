import { ProductCarted } from '@/types/types'
import { floatFix } from '@/helpers/numbers'
import { CartDiscountStrategy } from './CartDiscountStrategy'

export class CartDiscountNth implements CartDiscountStrategy {
  label: string
  promoCode?: string
  private _percents: number
  private _everyNth: number

  constructor(
    sourceName: string,
    everyNth: number,
    decimals: number,
    promoCode?: string
  ) {
    if (!sourceName || typeof sourceName !== 'string') {
      throw new TypeError(`sourceName should be a string! Got: ${sourceName}`)
    }
    if (everyNth < 1 || typeof everyNth !== 'number') {
      throw new TypeError(`everyNth should be greater than 1! Got: ${everyNth}`)
    }
    if (!(decimals && decimals !== 0) || typeof decimals !== 'number') {
      throw new TypeError(`percents should be a number! Got: ${decimals}`)
    }

    this.label = this._calcLabel(sourceName, decimals, everyNth)
    this.promoCode = promoCode
    this._percents = floatFix(decimals * 0.01)
    this._everyNth = everyNth
  }

  calcDiscount(product: ProductCarted, idx = 0): number {
    if ((idx + 1) % this._everyNth !== 0) return 0
    return product.priceBeforeDiscount * this._percents
  }

  private _calcLabel(sourceName: string, decimals: number, everyNth: number) {
    const ordered = this._getOrdered(everyNth)
    return `${sourceName}: -${decimals}% (every ${ordered})`
  }

  private _getOrdered(nth: number): string {
    const lastDigit = Number(String(nth).split('')[0])
    switch (lastDigit) {
      case 1:
        return `${nth}st`
      case 2:
        return `${nth}nd`
      case 3:
        return `${nth}rd`
      default:
        return `${nth}th`
    }
  }
}
