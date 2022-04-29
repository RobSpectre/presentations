import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import GameChatMessages from '@/components/base/GameChatMessages.vue'

describe('GameChatMessages', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(GameChatMessages, {
      props: {
        currentUser: 'Rick Sanchez',
        messages: [
          { username: 'Rick Sanchez', content: 'I am Pickle Rick!' },
          { username: 'Morty', content: 'Oh jeez.' }
        ]
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
