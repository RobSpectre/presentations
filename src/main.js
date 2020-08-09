import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'
import router from './router'
import store from '@/store'

Vue.config.productionTip = false

const requireComponent = require.context(
  './components/base',
  false,
  /[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1')

  Vue.component(componentName, componentConfig.default)
})

Vue.use(Vuex)

const vuexStore = new Vuex.Store(store)

new Vue({
  router,
  store: vuexStore,
  render: h => h(App)
}).$mount('#app')
