import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElTableBlock from '../packages/index'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-gist.css'
// import ElTableBlock from '@pdeng/element-table'
Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small'
})
Vue.use(hljs.vuePlugin)
Vue.use(ElTableBlock)
new Vue({
  render: (h) => h(App)
}).$mount('#app')
