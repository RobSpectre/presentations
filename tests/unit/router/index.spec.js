import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import { createRouter, createWebHistory } from 'vue-router'

import App from '@/App.vue'

import { routes } from '@/router'

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

describe('Router', () => {
  test('routing', async () => {
    router.push('/')

    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router, createTestingPinia()]
      }
    })

    const reveal = wrapper.find('.reveal')

    expect(reveal.exists()).toBe(true)
  })
})
