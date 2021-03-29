import { DiscountStrategy } from './discount'

export interface Product {
  id: string
  name: string
  price: number
  unit: 'kg' | 'piece' | string
  step?: number
  discount?: DiscountStrategy
}

export interface ProductCarted extends Product {
  quantity: number
  priceBeforeDiscount: number
  priceDiscount: number
  priceTotal: number
}
