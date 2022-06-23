import { mount } from '@vue/test-utils'

import Keyboard from '@/components/WordleRipoff/Keyboard.vue'

describe('Keyboard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Keyboard, {
      props: {
        letterStates: { a: 0, b: 0, c: 0 }
      }
    })
  })

  it('renders the keyboard', async () => {
    const keyboard = wrapper.find('#keyboard')

    expect(keyboard.exists()).toBe(true)
  })
})
