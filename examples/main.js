import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElTableBlock from '../packages/index'
// import ElTableBlock from '@pdeng/element-table'
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(ElTableBlock)
new Vue({
  render: h => h(App)
}).$mount('#app')
