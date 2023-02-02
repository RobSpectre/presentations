import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import Scoreboard from '@/components/Scoreboard/Scoreboard.vue'

describe('Scoreboard Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Scoreboard, {
      props: {
        question: 'Which player answered correctly?'
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

describe('Scoreboard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Scoreboard, {
      props: {
        question: 'Which player answered correctly?'
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
    expect(wrapper.vm.game.players.length).toBe(3)
  })

  it('awards a point to the first player', async () => {
    const button = await wrapper.find('button')
    await button.trigger('click')

    debugger

    expect(wrapper.vm.game.players[0].score).toBe(1)
  })

  it('awards a point to the third player', async () => {
    const buttons = await wrapper.findAll('button')
    await buttons[2].trigger('click')

    expect(wrapper.vm.game.players[2].score).toBe(1)
  })
})
