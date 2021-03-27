import { Product } from './types/types'

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/assets/goods.json' {
  const value: Product[]
  export default value
}
