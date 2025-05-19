import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
import './assets/style.css'
import { createPinia } from 'pinia'

import * as lucide from 'lucide-vue-next'

const app = createApp(App)
app.use(createPinia())
for (const [key, component] of Object.entries(lucide)) {
  app.component(key, component)
}
app.mount('#app')
