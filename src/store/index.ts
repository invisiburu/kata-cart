import { createLogger, createStore } from 'vuex'
import cart from './cart'

const isDebug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    cart,
  },
  strict: true,
  plugins: isDebug ? [createLogger()] : [],
})
