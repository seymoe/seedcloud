import type { App } from 'vue'
import Drawer from './common/drawer.vue'


const components = [
  Drawer
]

const install = (app: App): void => {
  components.forEach(component => {
    console.log(component)
    app.component(`sd-${ component.name }`, component)
  })
}

export default {
  install
}

