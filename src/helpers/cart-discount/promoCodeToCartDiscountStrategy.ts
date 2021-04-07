import { CartDiscountStrategy } from './CartDiscountStrategy'
import { CartDiscountStatic } from './CartDiscountStatic'
import { CartDiscountThreshold } from './CartDiscountThreshold'
import { CartDiscountNth } from './CartDiscountNth'

export function promoCodeToCartDiscountStrategy(
  promoCode: string
): CartDiscountStrategy {
  if (!promoCode || typeof promoCode !== 'string') {
    throw new TypeError(`promoCode should be a string! Got: ${promoCode}`)
  }

  const [base, ...args] = promoCode.split('_')
  if (!base || typeof base !== 'string') {
    throw new RangeError(`Invalid promoCode format! Got: ${promoCode}`)
  }

  switch (base) {
    case 'STATIC':
      return new CartDiscountStatic('Promo', Number(args[0]), promoCode)

    case 'THRESHOLD':
      return new CartDiscountThreshold(
        'Promo',
        Number(args[0]),
        Number(args[1]),
        promoCode
      )

    case 'NTH':
      return new CartDiscountNth(
        'Promo',
        Number(args[0]),
        Number(args[1]),
        promoCode
      )

    default:
      throw new RangeError(`Unknown promoCode! Got: ${promoCode}`)
  }
}
