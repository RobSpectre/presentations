import { mount } from '@vue/test-utils'

import AuctionEarBid from '@/components/AuctionEar/AuctionEarBid.vue'

describe('AuctionEarBid', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AuctionEarBid, {
      props: {
        currentPlayer: {
          name: 'Rick',
          score: 0
        }
      }
    })
  })

  it('emits a value when input for the player', async () => {
    const input = await wrapper.find('input')
    await input.setValue('5')
    await input.trigger('keydown.enter')

    expect(wrapper.emitted()).toHaveProperty('output')
    expect(wrapper.emitted('output')[0][0].value).toBe('5')
  })
})
