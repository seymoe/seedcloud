import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Layout from './layouts/default.vue'
import sdc from './sdks/sdc'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$sdc = sdc
Vue.prototype.$sdcAxios = new sdc.SeedAxios()
App.mpType = 'app'

Vue.use(ElementUI)
Vue.component('layout', Layout)

const app = new Vue({
	...App
})
app.$mount()
