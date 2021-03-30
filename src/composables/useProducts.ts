import { calcDiscountLabel } from '@/helpers/calcDiscountLabel'
import { Product } from '@/types/types'
import { Ref, ref } from 'vue'

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

async function getProducts(): Promise<Product[]> {
  const products = <Product[]>(await import('@/assets/products.json')).default
  return products.map((el) => {
    el.discountLabel = calcDiscountLabel(el.discount)
    return el
  })
}
