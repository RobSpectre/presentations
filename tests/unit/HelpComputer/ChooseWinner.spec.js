import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import ChooseWinner from '@/components/HelpComputer/ChooseWinner.vue'

import { createTestingPinia } from '@pinia/testing'

describe('ChooseWinner', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ChooseWinner, {
      props: {
        images: [
          { playerName: 'Rick', imagePath: '/images/hackparty-logo.png' },
          { playerName: 'Morty', imagePath: '/images/hackparty-logo2.png' }
        ],
        title: 'Max Verstappen wins the Dutch grand prix'
      },
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })

  it('it sends a message over web socket on input', async () => {
    const image = await wrapper.find('a')
    await image.trigger('click')

    await flushPromises()

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })
    expect(winnerCard.exists()).toBe(true)
  })
})
