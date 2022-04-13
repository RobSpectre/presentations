import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import ItemIntro from '@/components/WhichIsWhich/ItemIntro.vue'

describe('ItemIntro Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ItemIntro, {
      props: {
        item: {
          name: 'Red Bull',
          emoji: 'R'
        }
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

  it('renders with players', async () => {
    const players = await wrapper.vm.players
    expect(players.length).toBe(3)
  })
})
