import { mount } from '@vue/test-utils'

import CounterBox from '@/components/base/CounterBox.vue'

describe('CounterBox', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CounterBox, {
      props: {
        label: 'Test',
        counter: 0
      }
    })
  })

  it('emits a clicked event when clicked', async () => {
    expect(wrapper.vm.label).toEqual('Test')
  })
})
