import { ProductCarted } from '@/types/types'

export interface CartDiscountStrategy {
  label: string
  promoCode?: string
  calcDiscount: (
    product: ProductCarted,
    idx: number,
    products: ProductCarted[]
  ) => number
}
