import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import { mocks } from '../../test-utils'

import { useGameStore } from '@/store'

import SnackTrackRound from '@/components/SnackTrack/SnackTrackRound.vue'

describe('SnackTrackRound Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SnackTrackRound, {
      props: {
        tracks: ['/sounds/1.mp3', '/sounds/2.mp3', 'sounds/3.mp3'],
        items: ['Right', 'Wrong'],
        winnerIndex: 0,
        answer: 'Super Max by the Pit Stop Boys'
      },
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })

  it('renders with no players', async () => {
    expect(wrapper.vm.currentPlayer).toBe('')
  })
})

describe('SnackTrackRound', () => {
  let wrapper
  let store

  beforeEach(() => {
    wrapper = mount(SnackTrackRound, {
      props: {
        tracks: ['/sounds/1.mp3', '/sounds/2.mp3', 'sounds/3.mp3'],
        items: ['Right', 'Wrong'],
        winnerIndex: 0,
        answer: 'Super Max by the Pit Stop Boys'
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
                    score: 1,
                    team: undefined
                  },
                  {
                    index: 1,
                    name: 'noob noob',
                    score: 2,
                    team: undefined
                  },
                  {
                    index: 2,
                    name: 'Rick',
                    score: 3,
                    team: undefined
                  }
                ]
              }
            }
          },
          stubActions: false
        })]
      }
    })

    store = useGameStore()
  })

  it('renders with players', async () => {
    const currentPlayer = await wrapper.vm.currentPlayer
    expect(currentPlayer).toBe('Rick')
  })

  it('evaluates an incorrect guess for the player', async () => {
    const buttons = await wrapper.findAll('button')
    await buttons[2].trigger('click')

    expect(wrapper.vm.currentPlayer).toBe('noob noob')
  })

  it('presents WinnerCard after correct guess', async () => {
    const buttons = await wrapper.findAll('button')

    await buttons[1].trigger('click')

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(winnerCard.exists()).toBe(true)
  })

  it('presents WinnerCard after correct guess with bonus for first try', async () => {
    const buttons = await wrapper.findAll('button')

    await buttons[1].trigger('click')

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(winnerCard.exists()).toBe(true)
    expect(store.getPlayersByScore[0].score).toBe(5)
  })

  it('presents Winner Card after correct guess and awards normal points', async () => {
    const buttons = await wrapper.findAll('button')

    await buttons[2].trigger('click')
    await buttons[1].trigger('click')

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(winnerCard.exists()).toBe(true)
    expect(store.getPlayersByScore[0].score).toBe(3)
  })

  it('plays fanfare instead of the track when correct answer is reached on final track', async () => {
    const buttons = await wrapper.findAll('button')

    await buttons[2].trigger('click')
    await buttons[2].trigger('click')
    await buttons[1].trigger('click')

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(winnerCard.exists()).toBe(true)
    expect(store.getPlayersByScore[0].score).toBe(3)
  })

  it('presents LoserCard if no correct answer is guessed', async () => {
    const buttons = await wrapper.findAll('button')

    await buttons[2].trigger('click')
    await buttons[2].trigger('click')
    await buttons[2].trigger('click')

    const loserCard = await wrapper.findComponent({ name: 'LoserCard' })

    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(loserCard.exists()).toBe(true)
  })
})

describe('SnackTrackRoundLowScore', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SnackTrackRound, {
      props: {
        tracks: ['/sounds/1.mp3', '/sounds/2.mp3', 'sounds/3.mp3'],
        items: ['Right', 'Wrong'],
        winnerIndex: 0,
        answer: 'Super Max by the Pit Stop Boys',
        playerOrder: 'lowestScoreFirst'
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
                    score: 1,
                    team: undefined
                  },
                  {
                    index: 1,
                    name: 'noob noob',
                    score: 2,
                    team: undefined
                  },
                  {
                    index: 2,
                    name: 'Rick',
                    score: 3,
                    team: undefined
                  }
                ]
              }
            }
          },
          stubActions: false
        })]
      }
    })
  })
  it('renders with players in reverse order by score', async () => {
    const currentPlayer = await wrapper.vm.currentPlayer
    expect(currentPlayer).toBe('Morty')
  })
})

describe('SnackTrackRoundLowScore', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SnackTrackRound, {
      props: {
        tracks: ['/sounds/1.mp3', '/sounds/2.mp3', 'sounds/3.mp3'],
        items: ['Right', 'Wrong'],
        winnerIndex: 0,
        answer: 'Super Max by the Pit Stop Boys',
        playerOrder: 'button'
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
                    score: 1,
                    team: undefined
                  },
                  {
                    index: 1,
                    name: 'noob noob',
                    score: 2,
                    team: undefined
                  },
                  {
                    index: 2,
                    name: 'Rick',
                    score: 3,
                    team: undefined
                  }
                ]
              }
            }
          },
          stubActions: false
        })]
      }
    })
  })
  it('renders with players in button order', async () => {
    const currentPlayer = await wrapper.vm.currentPlayer
    expect(currentPlayer).toBe('Morty')
  })
})
