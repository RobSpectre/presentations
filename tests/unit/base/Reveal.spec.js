import Reveal from '@/components/base/Reveal.vue'

import { mount } from '@vue/test-utils'

describe('Reveal UX', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Reveal)
  })

  it('Reveal presentation mounts', () => {
    const reveal = wrapper.find('.reveal')

    expect(reveal.exists()).toBe(true)
  })
})
