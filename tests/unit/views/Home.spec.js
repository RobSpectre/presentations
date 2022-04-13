import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import Home from '@/views/Home.vue'

describe('Home', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Home, {
      props: {
        addTeamsAllowed: true
      },
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })
  test('should render home page', async () => {
    const reveal = await wrapper.find('.reveal')

    expect(reveal.exists()).toBe(true)
  })
})
