import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import HelpComputerRound from '@/components/HelpComputer/HelpComputerRound.vue'

describe('HelpComputerRound Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(HelpComputerRound, {
      props: {
        image: '/images/hackparty-logo.png',
        title: 'Hack Party by Hack Party'
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

describe('HelpComputerRound', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(HelpComputerRound, {
      props: {
        image: '/images/hackparty-logo.png',
        title: 'Hack Party by Hack Party'
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
