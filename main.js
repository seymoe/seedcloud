import Vue from 'vue'
import sdc from './sdks/sdc'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$sdc = sdc
Vue.prototype.$sdcAxios = new sdc.SeedAxios()
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
