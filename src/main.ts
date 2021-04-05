import '@/styles/reset.scss'
import '@/styles/base.scss'
import '@/styles/icons.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
