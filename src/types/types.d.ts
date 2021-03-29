export interface Product {
  id: string
  name: string
  price: number
  unit: 'kg' | 'piece' | string
  step?: number
}

export interface ProductCarted extends Product {
  quantity: number
}
