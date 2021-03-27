export interface Product {
  id: string
  name: string
  price: number
  unit?: 'kg'
  step?: number
}

export interface ProductCarted {
  id: string
  quantity: string
}
