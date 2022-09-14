import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import DiffsquisiteCorpseRound from '@/components/DiffsquisiteCorpse/DiffsquisiteCorpseRound.vue'

describe('DiffsquisiteCorpseRound Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(DiffsquisiteCorpseRound, {
      props: {
        hints: []
      },
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })

  it('renders with no players', async () => {
    expect(wrapper.vm.images.length).toBe(0)
  })
})

describe('DiffsquisiteCorpseRound', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(DiffsquisiteCorpseRound, {
      props: {
        hints: []
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

  it('it handles a image generation event correctly', async () => {
    wrapper.vm.handleImageGenerated({ id: '1', imagePath: '/images/hackparty-logo.png' })

    expect(wrapper.vm.images.length).toBe(1)
  })
})
