import { mount } from '@vue/test-utils'

import { flushPromises } from 'flush-promises'

import { createTestingPinia } from '@pinia/testing'

import Wager from '@/components/Wager/Wager.vue'

describe('Wager Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Wager, {
      props: {
        items: [
          {
            name: 'Win',
            emoji: 'W'
          },
          {
            name: 'Fail',
            emoji: 'F'
          }
        ]
      },
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })

  it('renders with no players', async () => {
    expect(wrapper.vm.currentPlayer).toBe('')
  })
})

describe('Wager', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Wager, {
      props: {
        items: [
          {
            name: 'Win',
            emoji: 'W'
          },
          {
            name: 'Fail',
            emoji: 'F'
          }
        ]
      },
      global: {
        plugins: [createTestingPinia({
          stubActions: false,
          initialState: {
            'hack.party game board': {
              game: {
                players: [
                  {
                    index: 0,
                    name: 'Morty',
                    score: 0,
                    team: undefined
                  },
                  {
                    index: 1,
                    name: 'noob noob',
                    score: 0,
                    team: undefined
                  },
                  {
                    index: 2,
                    name: 'Rick',
                    score: 0,
                    team: undefined
                  }
                ]
              }
            }
          }
        })]
      }
    })
  })

  it('renders with players', async () => {
    const currentPlayer = await wrapper.vm.currentPlayer
    expect(currentPlayer).toBe('Morty')
  })

  it('accepts a wager, assigns to player and emits it', async () => {
    const input = await wrapper.find('input')
    await input.setValue('5')
    await input.trigger('keydown.enter')

    await flushPromises

    expect(wrapper.vm.players.length).toBe(0)
    expect(wrapper.vm.wager).toBe(5)
    expect(wrapper.vm.wagerComplete).toBe(true)
  })

  it('accepts a guess, assigns to player and emits it', async () => {
    const input = await wrapper.find('input')
    await input.setValue('5')
    await input.trigger('keydown.enter')

    await flushPromises

    const buttons = await wrapper.findAll('button')
    await buttons[0].trigger('click')

    expect(wrapper.vm.players.length).toBe(1)
    expect(wrapper.vm.bets[0].wager).toBe(5)
    expect(wrapper.vm.bets[0].guess.name).toBe('Win')
    expect(wrapper.vm.wagerComplete).toBe(false)
    expect(wrapper.emitted()).toHaveProperty('bet')
  })

  it('dismisses menu when all players have bet', async () => {
    let input
    let buttons

    for (let i = 0; i < 3; i++) {
      input = await wrapper.find('input')
      await input.setValue('5')
      await input.trigger('keydown.enter')

      await flushPromises

      buttons = await wrapper.findAll('button')
      await buttons[0].trigger('click')
    }

    buttons = await wrapper.findAll('button')

    expect(buttons.length).toBe(0)
    expect(wrapper.vm.bets.length).toBe(3)
    expect(wrapper.vm.complete).toBe(true)
    expect(wrapper.emitted().bet.length).toBe(3)
  })
})
