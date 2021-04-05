import { calcProductDiscountLabel } from '@/helpers/calcProductDiscountLabel'
import { Product } from '@/types/types'
import { Ref, ref } from 'vue'

async function getProducts(): Promise<Product[]> {
  const products = <Product[]>(await import('@/assets/products.json')).default
  return products.map((el) => {
    el.discountLabel = calcProductDiscountLabel(el.discount)
    return el
  })
}

export default function useProducts(): {
  products: Ref<Product[]>
  loadProducts: () => Promise<void>
  getProducts: () => Promise<Product[]>
} {
  const products = ref<Product[]>([])

  const loadProducts = async () => {
    products.value = await getProducts()
    console.log(products.value)
  }

  return {
    products,
    loadProducts,
    getProducts,
  }
}
