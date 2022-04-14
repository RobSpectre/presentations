import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import GameVideo from '@/components/base/GameVideo.vue'

describe('GameVideo', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(GameVideo, {
      props: {
        title: 'Rick Sanchez',
        video: '/images/hackparty_logo.png'
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

describe('GameVideo with limit', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(GameVideo, {
      props: {
        title: 'Rick Sanchez',
        video: '/images/hackparty_logo.png',
        limit: 12
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

  it('places media fragment in video source corresponding to prop limit', async () => {
    expect(wrapper.vm.videoSource).toBe('/images/hackparty_logo.png#t=0,12')
  })
})
