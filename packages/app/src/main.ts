import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import globalComponents from './components'
import App from './App.vue'

createApp(App)
  .use(store)
  .use(ElementPlus, { size: 'small' })
  .use(router)
  .use(globalComponents)
  .mount('#app')
