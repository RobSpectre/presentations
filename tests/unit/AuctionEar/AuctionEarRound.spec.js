import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import { mocks } from '../../test-utils'

import AuctionEarRound from '@/components/AuctionEar/AuctionEarRound.vue'

describe('AuctionEarRound Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AuctionEarRound, {
      props: {
        src: '/sounds/fanfare.mp3',
        chunks: 5
      },
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })

  it('renders with no players', async () => {
    expect(wrapper.vm.items[0].name).toBe('Right')
  })
})

describe('AuctionEarRound', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AuctionEarRound, {
      props: {
        src: '/sounds/fanfare.mp3',
        chunks: 5
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
  })

  it('renders with players', async () => {
    expect(wrapper.vm.items[0].name).toBe('Right')
  })

  it('handles a bid from the first player', async () => {
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[0], value: 30 })

    expect(wrapper.vm.bids.length).toBe(1)
    expect(wrapper.vm.bids[0].name).toBe('Morty')
  })

  it('handles a guess after bids are complete', async () => {
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[0], value: 30 })
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[1], value: 30 })
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[2], value: 30 })

    expect(wrapper.vm.phase).toBe('guess')

    await wrapper.vm.handleGuess({ player: wrapper.vm.game.players[0], value: 1 })

    expect(wrapper.vm.guessIndex).toBe(1)
    expect(wrapper.vm.bids[0].value).toBe(30)
    expect(wrapper.vm.prizeValue).toBe(30)
  })

  it('game moves on to next chunk if no player guesses correctly', async () => {
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[0], value: 30 })
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[1], value: 30 })
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[2], value: 30 })

    await wrapper.vm.handleGuess({ player: wrapper.vm.game.players[0], value: 1 })
    await wrapper.vm.handleGuess({ player: wrapper.vm.game.players[1], value: 1 })
    await wrapper.vm.handleGuess({ player: wrapper.vm.game.players[2], value: 1 })

    expect(wrapper.vm.guessIndex).toBe(0)
    expect(wrapper.vm.bids.length).toBe(0)
    expect(wrapper.vm.prizeValue).toBe(90)
  })

  it('game awards no one if they get to the final chunk and fail to answer correctly', async () => {
    for (let i = 0; i < 6; i++) {
      await wrapper.vm.handleBid({ player: wrapper.vm.game.players[0], value: 30 })
      await wrapper.vm.handleBid({ player: wrapper.vm.game.players[1], value: 30 })
      await wrapper.vm.handleBid({ player: wrapper.vm.game.players[2], value: 30 })

      await wrapper.vm.handleGuess({ player: wrapper.vm.game.players[0], value: 1 })
      await wrapper.vm.handleGuess({ player: wrapper.vm.game.players[1], value: 1 })
      await wrapper.vm.handleGuess({ player: wrapper.vm.game.players[2], value: 1 })
    }

    const loserCard = await wrapper.findComponent({ name: 'LoserCard' })

    expect(loserCard.exists()).toBe(true)
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(wrapper.vm.game.playerButton).toBe(2)
  })

  it('game awards player for correct guess', async () => {
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[0], value: 30 })
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[1], value: 30 })
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[2], value: 30 })

    await wrapper.vm.handleGuess({ player: wrapper.vm.game.players[0], value: 0 })

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(winnerCard.exists()).toBe(true)
    expect(wrapper.vm.game.players[0].score).toBe(60)
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(wrapper.vm.game.playerButton).toBe(1)
  })
})

describe('AuctionEarRound Test Total Pot Award', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AuctionEarRound, {
      props: {
        src: '/sounds/fanfare.mp3',
        chunks: 5,
        awardTotalPot: true,
        ascending: false
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
  })

  it('game awards player for correct guess', async () => {
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[0], value: 30 })
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[1], value: 30 })
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[2], value: 30 })

    await wrapper.vm.handleGuess({ player: wrapper.vm.game.players[0], value: 0 })

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(winnerCard.exists()).toBe(true)
    expect(wrapper.vm.game.players[0].score).toBe(120)
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(wrapper.vm.game.playerButton).toBe(1)
  })
})

describe('AuctionEarRound Bid For Chunk Mode', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AuctionEarRound, {
      props: {
        src: '/sounds/fanfare.mp3',
        ascending: false,
        gameType: 'bidForChunk',
        chunks: 3
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
  })

  it('players bid then answer each chunk', async () => {
    const spy = jest.spyOn(wrapper.vm, 'nextChunk')

    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[0], value: 30 })
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[1], value: 30 })
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[2], value: 30 })

    await wrapper.vm.handleGuess({ player: wrapper.vm.game.players[0], value: 1 })

    expect(wrapper.vm.chunkIndex).toBe(1)
    expect(wrapper.vm.game.playerButton).toBe(0)
    expect(wrapper.vm.bids.length).toBe(3)
    expect(wrapper.vm.bids[0].value).toBe(30)
    expect(spy).toHaveBeenCalled()
  })

  it('players lose if all chunks are played with no right answer', async () => {
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[0], value: 30 })
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[1], value: 30 })
    await wrapper.vm.handleBid({ player: wrapper.vm.game.players[2], value: 30 })

    await wrapper.vm.handleGuess({ player: wrapper.vm.game.players[0], value: 1 })
    await wrapper.vm.handleGuess({ player: wrapper.vm.game.players[1], value: 1 })
    await wrapper.vm.handleGuess({ player: wrapper.vm.game.players[2], value: 1 })

    const loserCard = await wrapper.findComponent({ name: 'LoserCard' })

    expect(wrapper.vm.game.players[2].score).toBe(0)
    expect(wrapper.vm.prizeValue).toBe(90)
    expect(wrapper.vm.game.playerButton).toBe(1)
    expect(wrapper.vm.complete).toBe(true)
    expect(loserCard.exists()).toBe(true)
  })
})
