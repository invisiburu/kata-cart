import { CartDiscountStatic } from './CartDiscountStatic'
import { CartDiscountStrategy } from './CartDiscountStrategy'

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

    default:
      throw new RangeError(`Unknown promoCode! Got: ${promoCode}`)
  }
}
