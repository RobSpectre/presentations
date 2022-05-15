import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import GameIframe from '@/components/base/GameIframe.vue'

describe('GameIframe Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(GameIframe, {
      props: {
        iframe: 'http://localhost'
      },
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })

  it('renders with no players', async () => {
    const iframe = wrapper.find('iframe')

    expect(iframe).toBeDefined()
  })
})

describe('GameIframe', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(GameIframe, {
      props: {
        iframe: 'http://localhost'
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
    expect(players).toStrictEqual([
      { name: 'Rick', value: 0, score: 0, index: 2, team: undefined },
      { name: 'noob noob', value: 0, score: 0, index: 1, team: undefined },
      { name: 'Morty', value: 0, score: 0, index: 0, team: undefined }
    ])
  })
})
