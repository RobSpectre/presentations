import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import WordleRipoffRound from '@/components/WordleRipoff/WordleRipoffRound.vue'

function enterWord (word, wrapper) {
  for (let i = 0; i < word.length; i++) {
    wrapper.vm.onKey(word[i])
  }

  wrapper.vm.onKey('Enter')
}

describe('WordleRipoffRound Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(WordleRipoffRound, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })

  it('renders with no players', async () => {
    expect(wrapper.exists()).toBe(true)
  })
})

describe('WordleRipoffRound', () => {
  let wrapper

  beforeEach(() => {
    jest.useFakeTimers()

    wrapper = mount(WordleRipoffRound, {
      props: {
        answer: 'racer'
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
    expect(wrapper.exists()).toBe(true)
  })

  it('completes a row with a valid 5 letter word', async () => {
    enterWord('trunk', wrapper)

    expect(wrapper.vm.board[0][0].letter).toBe('t')
    expect(wrapper.vm.board[0][0].state).toBe('absent')
  })

  it('does not accept keyboard input when allowInput is false', async () => {
    wrapper.vm.allowInput = false
    await wrapper.vm.onKey('t')

    expect(wrapper.vm.board[0][0].letter).toBe('')
  })

  it('deletes a tile when backspace is pressed', async () => {
    await wrapper.vm.onKey('t')
    await wrapper.vm.onKey('Backspace')

    expect(wrapper.vm.board[0][0].letter).toBe('')
  })

  it('awards 1 point for 1 present letter', async () => {
    enterWord('trunk', wrapper)

    jest.advanceTimersByTime(3000)

    expect(wrapper.vm.game.players[0].score).toBe(1)
  })

  it('awards 2 points for 1 correct letter', async () => {
    enterWord('rinds', wrapper)

    jest.advanceTimersByTime(3000)

    expect(wrapper.vm.game.players[0].score).toBe(2)
  })

  it('awards max points for correct answer', async () => {
    enterWord('racer', wrapper)

    jest.advanceTimersByTime(3000)

    expect(wrapper.vm.game.players[0].score).toBe(14)
  })

  it('does not allow entry that is not a word', async () => {
    enterWord('asdfe', wrapper)

    jest.advanceTimersByTime(3000)

    expect(wrapper.vm.board[0][0].state).toBe(0)
  })

  it('does not allow entry that is less than 5 letters', async () => {
    enterWord('asdf', wrapper)

    jest.advanceTimersByTime(3000)

    expect(wrapper.vm.board[0][0].state).toBe(0)
  })

  it('does not award points for no letters', async () => {
    enterWord('zygon', wrapper)

    jest.advanceTimersByTime(3000)

    expect(wrapper.vm.game.players[0].score).toBe(0)
  })

  it('displays LoserCard if correct guess is not submitted after six times', async () => {
    enterWord('zygon', wrapper)
    jest.advanceTimersByTime(3000)
    enterWord('zygon', wrapper)
    jest.advanceTimersByTime(3000)
    enterWord('zygon', wrapper)
    jest.advanceTimersByTime(3000)
    enterWord('zygon', wrapper)
    jest.advanceTimersByTime(3000)
    enterWord('zygon', wrapper)
    jest.advanceTimersByTime(3000)
    enterWord('zygon', wrapper)
    jest.advanceTimersByTime(3000)

    expect(wrapper.vm.game.players[0].score).toBe(0)
    expect(wrapper.vm.losers.length).toBe(3)
  })
})
