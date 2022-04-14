import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import { mocks } from '../../test-utils'

import { useGameStore } from '@/store'

import VideoWagerRound from '@/components/Wager/VideoWagerRound.vue'

describe('VideoWagerRound Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(VideoWagerRound, {
      props: {
        items: [
          {
            name: 'Win',
            emoji: 'W'
          },
          {
            name: 'Fail',
            emoji: 'F'
          }
        ],
        video: '/images/hackparty_logo.png',
        limit: 5,
        winnerIndex: 0
      },
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })

  it('renders with no players', async () => {
    expect(wrapper.vm.correctGuess.name).toBe('Win')
  })
})

describe('VideoWagerRound', () => {
  let wrapper
  let store

  beforeEach(() => {
    wrapper = mount(VideoWagerRound, {
      props: {
        items: [
          {
            name: 'Win',
            emoji: 'W'
          },
          {
            name: 'Fail',
            emoji: 'F'
          }
        ],
        video: '/images/hackparty_logo.png',
        limit: 5,
        winnerIndex: 0
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
                    score: 30,
                    team: undefined
                  },
                  {
                    index: 1,
                    name: 'noob noob',
                    score: 30,
                    team: undefined
                  },
                  {
                    index: 2,
                    name: 'Rick',
                    score: 30,
                    team: undefined
                  }
                ]
              }
            }
          }
        })]
      }
    })

    store = useGameStore()
  })

  it('renders with players', async () => {
    const correctGuess = await wrapper.vm.correctGuess
    expect(correctGuess.name).toBe('Win')
  })

  it('handles a bet from the Wager component', async () => {
    await wrapper.vm.handleBet({ name: 'Rick', wager: 30, guess: 0 })

    expect(wrapper.vm.bets.length).toBe(1)
    expect(wrapper.vm.bets[0].name).toBe('Rick')
  })

  it('pays out the wagers correctly', async () => {
    await wrapper.vm.handleBet({ name: 'Rick', wager: 30, guess: wrapper.vm.correctGuess })
    await wrapper.vm.handleBet({ name: 'Morty', wager: 30, guess: wrapper.vm.correctGuess })
    await wrapper.vm.handleBet({ name: 'noob noob', wager: 30, guess: 1 })
    await wrapper.vm.payOut()

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(winnerCard.exists()).toBe(true)
    expect(store.increasePlayerScore).nthCalledWith(1, 'Rick', 30)
    expect(store.increasePlayerScore).nthCalledWith(2, 'Morty', 30)
    expect(store.increasePlayerScore).nthCalledWith(3, 'noob noob', -30)
    expect(mocks.Audio.play).toHaveBeenCalled()
  })

  it('pays out the contrarian bonus correctly', async () => {
    await wrapper.vm.handleBet({ name: 'Rick', wager: 30, guess: wrapper.vm.correctGuess })
    await wrapper.vm.handleBet({ name: 'Morty', wager: 30, guess: 1 })
    await wrapper.vm.handleBet({ name: 'noob noob', wager: 30, guess: 1 })
    await wrapper.vm.payOut()

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(winnerCard.exists()).toBe(true)
    expect(store.increasePlayerScore).nthCalledWith(1, 'Rick', 30)
    expect(store.increasePlayerScore).nthCalledWith(2, 'Morty', -30)
    expect(store.increasePlayerScore).nthCalledWith(3, 'noob noob', -30)
    expect(store.increasePlayerScore).nthCalledWith(4, 'Rick', 30)
    expect(mocks.Audio.play).toHaveBeenCalled()
  })

  it('displays loser screen if no player wins', async () => {
    await wrapper.vm.handleBet({ name: 'Rick', wager: 30, guess: 1 })
    await wrapper.vm.handleBet({ name: 'Morty', wager: 30, guess: 1 })
    await wrapper.vm.handleBet({ name: 'noob noob', wager: 30, guess: 1 })
    await wrapper.vm.payOut()

    const loserCard = await wrapper.findComponent({ name: 'LoserCard' })

    expect(loserCard.exists()).toBe(true)
    expect(store.increasePlayerScore).nthCalledWith(1, 'Rick', -30)
    expect(store.increasePlayerScore).nthCalledWith(2, 'Morty', -30)
    expect(store.increasePlayerScore).nthCalledWith(3, 'noob noob', -30)
    expect(mocks.Audio.play).toHaveBeenCalled()
  })
})
