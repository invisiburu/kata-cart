import { Product /*, ProductCarted */ } from '@/types/types'
import { Ref, ref } from 'vue'

export default function useProducts(): {
  products: Ref<Product[]>
  loadProducts: () => Promise<void>
  getProducts: () => Promise<Product[]>
  // getProductsCarted: (items: ProductCarted[]) => Promise<ProductCarted[]>
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
    // getProductsCarted,
  }
}

async function getProducts(): Promise<Product[]> {
  return (await import('@/assets/products.json')).default
}

// async function getProductsCarted(items: ProductCarted[]): Promise<ProductCarted[]> {
//   const allProducts: Product[] = await getProducts()
//   return items.map((cartItem) => {
//     const product = allProducts.find((product) => product.id === cartItem.id)
//     return {
//       ...product,
//       ...cartItem,
//     }
//   })
// }
