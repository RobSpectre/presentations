import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import RandomTriviaRound from '@/components/RandomTrivia/RandomTriviaRound.vue'

describe('RandomTriviaRound Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(RandomTriviaRound, {
      props: {
        wrongAnswers: [
          { name: 'Merc' },
          { name: 'Ferrari' }
        ],
        rightAnswers: [
          { name: 'Red Bull' }
        ],
        question: 'Which is the fastest car?'
      },
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })

  it('renders with no players', async () => {
    expect(wrapper.vm.rounds.length).toBe(1)
  })
})
