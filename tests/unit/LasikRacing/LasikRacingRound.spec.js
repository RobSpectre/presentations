
import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import { mocks } from '../../test-utils'

import LasikRacingRound from '@/components/LasikRacing/LasikRacingRound.vue'

describe('LasikRacingRound Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LasikRacingRound, {
      props: {
        src: '/images/hackparty-logo.png'
      },
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })

  it('renders with no players', async () => {
    expect(wrapper.vm.game.players.length).toBe(0)
  })
})

describe('LasikRacingRound', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LasikRacingRound, {
      props: {
        src: '/images/hackparty-logo.png',
        answer: { name: 'Max Verstappen', value: 'the world champion' }
      },
      global: {
        plugins: [createTestingPinia({
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

  it('it awards the player when correct', async () => {
    const button = await wrapper.find('button')
    await button.trigger('click')

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(winnerCard.exists()).toBe(true)
  })

  it('presents LoserCard if no correct answer is guessed', async () => {
    const buttons = await wrapper.findAll('button')

    await buttons[1].trigger('click')
    await buttons[1].trigger('click')
    await buttons[1].trigger('click')

    const loserCard = await wrapper.findComponent({ name: 'LoserCard' })

    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(loserCard.exists()).toBe(true)
  })
})
