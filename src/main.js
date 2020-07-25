import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
