import { mount } from '@vue/test-utils'

import Ladder from '@/components/AuctionEar/Ladder.vue'

describe('Ladder', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Ladder, {
      props: {
        items: [
          { name: 'Right', value: 0 },
          { name: 'Wrong', value: 1 }
        ]
      }
    })
  })

  it('loads items in descending order by default', async () => {
    const items = wrapper.findAll('.text-4xl')

    expect(items.length).toBe(2)
    expect(items[0].text()).toContain('Wrong')
  })
})

describe('Ladder', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Ladder, {
      props: {
        items: [
          { name: 'Right', value: 0 },
          { name: 'Wrong', value: 1 }
        ],
        ascending: true
      }
    })
  })

  it('loads items in ascending order with prop', async () => {
    const items = wrapper.findAll('.text-4xl')

    expect(items.length).toBe(2)
    expect(items[0].text()).toContain('Right')
  })
})
