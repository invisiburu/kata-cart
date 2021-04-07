import { ProductCarted } from '@/types/types'
import { floatFix } from '@/helpers/numbers'
import { CartDiscountStrategy } from './CartDiscountStrategy'

export class CartDiscountNthCheapest implements CartDiscountStrategy {
  label: string
  promoCode?: string
  private _percents: number
  private _everyNth: number
  private _cheapestIndexes: number[] = []

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

  calcDiscount(
    product: ProductCarted,
    idx: number,
    products: ProductCarted[]
  ): number {
    if (idx === 0) {
      this._cheapestIndexes = this._getCheapestIndexes(products)
    }
    if (!this._cheapestIndexes.includes(idx)) return 0
    return product.priceBeforeDiscount * this._percents
  }

  private _calcLabel(sourceName: string, decimals: number, everyNth: number) {
    const ordered = this._getOrdered(everyNth)
    return `${sourceName}: -${decimals}% (every ${ordered} cheapest)`
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

  private _getCheapestIndexes(products: ProductCarted[]): number[] {
    let occurrences = Math.floor(products.length / this._everyNth)
    if (occurrences <= 0) return []

    const cheapestIndexes: number[] = []

    // let prevMinPrice = 0
    while (occurrences--) {
      let minPrice = products[0].priceBeforeDiscount
      let minIdx = 0
      for (let idx = 0; idx < products.length; idx++) {
        const price = products[idx].priceBeforeDiscount
        console.log('CURRENT:', price, minPrice)
        // if (price < prevMinPrice) continue
        if (cheapestIndexes.includes(idx)) continue
        if (price < minPrice) {
          console.log('LESSER:', price)
          minPrice = price
          minIdx = idx
        }
      }
      // prevMinPrice = minPrice
      cheapestIndexes.push(minIdx)
    }

    return cheapestIndexes
  }
}
