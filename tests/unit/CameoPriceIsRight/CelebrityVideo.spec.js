import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import CelebrityVideo from '@/components/CameoPriceIsRight/CelebrityVideo.vue'

describe('CelebrityVideo Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CelebrityVideo, {
      props: {
        celebrity: 'Rick Sanchez',
        hint1: 'Smartest man in the world',
        hint2: 'Er something',
        hint3: 'Other thing',
        image: '/images/hackparty_logo.png'
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
