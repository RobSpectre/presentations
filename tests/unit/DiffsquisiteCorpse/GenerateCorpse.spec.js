import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import GenerateCorpse from '@/components/DiffsquisiteCorpse/GenerateCorpse.vue'

describe('GenerateCorpse Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(GenerateCorpse, {
      props: {
        hints: [{ name: 'Noun', emoji: '🪴', values: ['Scotty'] }]
      },
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })

  it('renders with no players', async () => {
    expect(wrapper.vm.hints.length).toBe(1)
  })
})

describe('GenerateCorpse', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(GenerateCorpse, {
      props: {
        hints: [{ name: 'Noun', emoji: '🪴', values: ['Scotty'] }]
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

  it('produces a random hint when the guess event is emitted', async () => {
    wrapper.vm.onGuess({ value: 0 })

    expect(wrapper.vm.hint).toBe('Scotty')
  })
})
