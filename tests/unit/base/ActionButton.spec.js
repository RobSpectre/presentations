import { mount } from '@vue/test-utils'

import ActionButton from '@/components/base/ActionButton.vue'

describe('ActionButton', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ActionButton)
  })
  it('emits a clicked event when clicked', async () => {
    const button = await wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('clicked')
  })
})
