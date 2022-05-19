import { mount } from '@vue/test-utils'

import AuctionEarGuess from '@/components/AuctionEar/AuctionEarGuess.vue'

describe('AuctionEarGuess', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AuctionEarGuess, {
      props: {
        currentPlayer: {
          name: 'Rick',
          score: 0
        },
        items: [
          { name: 'Right', emoji: '' },
          { name: 'Wrong', emoji: '' }
        ]
      }
    })
  })

  it('emits a value when input for the player', async () => {
    const button = await wrapper.find('button')

    button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('guess')
    expect(wrapper.emitted('guess')[0][0].value).toBe(0)
  })
})
