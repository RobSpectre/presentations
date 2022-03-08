import { createApp } from 'vue'
import Vuex from 'vuex'

import App from './App.vue'
import router from './router'
import store from '@/store'

import '@/assets/styles/reveal_theme.scss'

const vuexStore = new Vuex.Store(store)

const app = createApp(App).use(router).use(vuexStore)
app.mount('#app')
