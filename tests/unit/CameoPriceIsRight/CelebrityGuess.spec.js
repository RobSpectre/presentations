import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import { createTestingPinia } from '@pinia/testing'

import { mocks } from '../../test-utils'

import { useGameStore } from '@/store'

import CelebrityGuess from '@/components/CameoPriceIsRight/CelebrityGuess.vue'

describe('CelebrityGuess Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CelebrityGuess, {
      props: {
        celebrity: 'Rick Sanchez',
        image: '/images/hackparty_logo.png',
        price: 6,
        prize: 1
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

describe('CelebrityGuess', () => {
  let wrapper
  let store

  beforeEach(() => {
    wrapper = mount(CelebrityGuess, {
      props: {
        celebrity: 'Rick Sanchez',
        image: '/images/hackparty_logo.png',
        price: 6,
        prize: 1
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

    store = useGameStore()
  })

  it('renders with players', async () => {
    const player = await wrapper.vm.currentPlayer
    expect(player).toBe('Morty')
  })

  it('accepts a guess and assigns it to a player', async () => {
    const input = await wrapper.find('input')
    await input.setValue('5')
    await input.trigger('keydown.enter')

    await flushPromises()

    const guesses = await wrapper.vm.guessesByPrice

    expect(guesses.length).toBe(1)
    expect(guesses[0].guess).toBe(5)
  })

  it('presents the button to reveal answer after all players guess', async () => {
    const input = await wrapper.find('input')
    await input.setValue('5')
    await input.trigger('keydown.enter')
    await input.setValue('3')
    await input.trigger('keydown.enter')
    await input.setValue('2')
    await input.trigger('keydown.enter')

    await flushPromises()

    const buttons = await wrapper.findAll('button')

    expect(buttons.length).toBe(1)
    expect(buttons[0].text()).toBe('Is The Price Right?')
  })

  it('presents WinnerCard after reveal button is clicked', async () => {
    const spy = jest.spyOn(wrapper.vm, 'findWinner')

    const input = await wrapper.find('input')
    await input.setValue('5')
    await input.trigger('keydown.enter')
    await input.setValue('3')
    await input.trigger('keydown.enter')
    await input.setValue('2')
    await input.trigger('keydown.enter')

    await flushPromises()

    const button = await wrapper.find('button')

    await button.trigger('click')

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(spy).toHaveBeenCalled()
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(winnerCard.exists()).toBe(true)
    expect(store.increasePlayerScore).toBeCalledWith('Morty', 1)
  })

  it('presents WinnerCard and adds bonus if player gets the price exactly right', async () => {
    const spy = jest.spyOn(wrapper.vm, 'findWinner')

    const input = await wrapper.find('input')
    await input.setValue('6')
    await input.trigger('keydown.enter')
    await input.setValue('3')
    await input.trigger('keydown.enter')
    await input.setValue('2')
    await input.trigger('keydown.enter')

    await flushPromises()

    const button = await wrapper.find('button')

    await button.trigger('click')

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(spy).toHaveBeenCalled()
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(winnerCard.exists()).toBe(true)
    expect(store.increasePlayerScore).toBeCalledWith('Morty', 2)
  })

  it('presents LoserCard if all players are over the correct price', async () => {
    const spy = jest.spyOn(wrapper.vm, 'findWinner')

    const input = await wrapper.find('input')
    await input.setValue('10')
    await input.trigger('keydown.enter')
    await input.setValue('7')
    await input.trigger('keydown.enter')
    await input.setValue('8')
    await input.trigger('keydown.enter')

    await flushPromises()

    const button = await wrapper.find('button')

    await button.trigger('click')

    const loserCard = await wrapper.findComponent({ name: 'LoserCard' })

    expect(spy).toHaveBeenCalled()
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(loserCard.exists()).toBe(true)
  })
})

describe('CelebrityGuess', () => {
  let wrapper
  let store

  beforeEach(() => {
    wrapper = mount(CelebrityGuess, {
      props: {
        celebrity: 'Rick Sanchez',
        image: '/images/hackparty_logo.png',
        price: -6,
        prize: 1
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

    store = useGameStore()
  })

  it('awards the correct winner with negative values', async () => {
    const spy = jest.spyOn(wrapper.vm, 'findWinner')

    const input = await wrapper.find('input')
    await input.setValue('-5')
    await input.trigger('keydown.enter')
    await input.setValue('-7')
    await input.trigger('keydown.enter')
    await input.setValue('-2')
    await input.trigger('keydown.enter')

    await flushPromises()

    const button = await wrapper.find('button')

    await button.trigger('click')

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(spy).toHaveBeenCalled()
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(winnerCard.exists()).toBe(true)
    expect(store.increasePlayerScore).toBeCalledWith('Morty', 1)
  })

  it('awards the correct winner with negative values when positive numbers are close', async () => {
    const spy = jest.spyOn(wrapper.vm, 'findWinner')

    const input = await wrapper.find('input')
    await input.setValue('-4')
    await input.trigger('keydown.enter')
    await input.setValue('-7')
    await input.trigger('keydown.enter')
    await input.setValue('5')
    await input.trigger('keydown.enter')

    await flushPromises()

    const button = await wrapper.find('button')

    await button.trigger('click')

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(spy).toHaveBeenCalled()
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(winnerCard.exists()).toBe(true)
    expect(store.increasePlayerScore).toBeCalledWith('Morty', 1)
  })

  it('presents LoserCard if all players are all under a negative price', async () => {
    const spy = jest.spyOn(wrapper.vm, 'findWinner')

    const input = await wrapper.find('input')
    await input.setValue('-10')
    await input.trigger('keydown.enter')
    await input.setValue('-11')
    await input.trigger('keydown.enter')
    await input.setValue('-12')
    await input.trigger('keydown.enter')

    await flushPromises()

    const button = await wrapper.find('button')

    await button.trigger('click')

    const loserCard = await wrapper.findComponent({ name: 'LoserCard' })

    expect(spy).toHaveBeenCalled()
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(loserCard.exists()).toBe(true)
  })

  it('awards winner with positive guess when negative guesses are too low', async () => {
    const spy = jest.spyOn(wrapper.vm, 'findWinner')

    const input = await wrapper.find('input')
    await input.setValue('10')
    await input.trigger('keydown.enter')
    await input.setValue('-41')
    await input.trigger('keydown.enter')
    await input.setValue('-51')
    await input.trigger('keydown.enter')

    await flushPromises()

    const button = await wrapper.find('button')

    await button.trigger('click')

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(spy).toHaveBeenCalled()
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(winnerCard.exists()).toBe(true)
    expect(store.increasePlayerScore).toBeCalledWith('Morty', 1)
  })
})
