
import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import { mocks } from '../../test-utils'

import { useGameStore } from '@/store'

import ChooseWinner from '@/components/Players/ChooseWinner.vue'

describe('ChooseWinner Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ChooseWinner, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })

  it('renders with no players', async () => {
    expect(wrapper.vm.heading).toBe('Pick the winner')
  })
})

describe('ChooseWinner', () => {
  let wrapper
  let store

  beforeEach(() => {
    wrapper = mount(ChooseWinner, {
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

    store = useGameStore()
  })

  it('renders with players', async () => {
    const players = await wrapper.vm.players
    expect(players).toStrictEqual([
      { name: 'Rick', value: 0, score: 0, index: 2, team: undefined },
      { name: 'noob noob', value: 0, score: 0, index: 1, team: undefined },
      { name: 'Morty', value: 0, score: 0, index: 0, team: undefined }
    ])
  })

  it('presents WinnerCard and awards player when player is selected', async () => {
    const button = await wrapper.find('button')

    await button.trigger('click')

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(store.increasePlayerScore).toHaveBeenCalledWith('Rick', 1)
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(winnerCard.exists()).toBe(true)
  })
})
