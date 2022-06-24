import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import { mocks } from '../../test-utils'

import { useGameStore } from '@/store'

import AudioChoiceRound from '@/components/AudioChoice/AudioChoiceRound.vue'

describe('AudioChoiceRound Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AudioChoiceRound, {
      props: {
        items: ['Merc', 'Red Bull', 'Ferrari'],
        winnerIndex: 1,
        prize: 1,
        question: 'Which is the fastest car?'
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

describe('AudioChoiceRound', () => {
  let wrapper
  let store

  beforeEach(() => {
    wrapper = mount(AudioChoiceRound, {
      props: {
        items: [
          {
            name: 'Merc',
            emoji: 'M'
          },
          {
            name: 'Red Bull',
            emoji: 'R'
          },
          {
            name: 'Ferrari',
            emoji: 'F'
          }
        ],
        winnerIndex: 1,
        prize: 1,
        question: 'Which is the fastest car?'
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
    const currentPlayer = await wrapper.vm.currentPlayer
    expect(currentPlayer).toBe('Morty')
  })

  it('stores a guess for the player', async () => {
    const buttons = await wrapper.findAll('button')
    await buttons[1].trigger('click')

    expect(wrapper.vm.players.length).toBe(1)
  })

  it('presents the button to reveal answer after all players guess', async () => {
    let buttons = await wrapper.findAll('button')

    buttons.forEach((button) => {
      expect(button.text()).not.toBe('Which is Which?')
    })

    await buttons[1].trigger('click')
    await buttons[2].trigger('click')
    await buttons[3].trigger('click')

    buttons = await wrapper.findAll('button')

    expect(buttons[1].text()).toBe('Which is which?')
  })

  it('presents WinnerCard after reveal button is clicked', async () => {
    const spy = jest.spyOn(wrapper.vm, 'findWinners')

    const buttons = await wrapper.findAll('button')

    buttons.forEach((button) => {
      expect(button.text()).not.toBe('Which is Which?')
    })

    await buttons[1].trigger('click')
    await buttons[2].trigger('click')
    await buttons[2].trigger('click')

    const finalButton = await wrapper.findComponent({ name: 'ActionButton' })

    expect(finalButton.exists()).toBe(true)

    await finalButton.trigger('click')

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(spy).toHaveBeenCalled()
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(winnerCard.exists()).toBe(true)
  })

  it('presents LoserCard if no correct answer is guessed', async () => {
    const spy = jest.spyOn(wrapper.vm, 'findWinners')

    const buttons = await wrapper.findAll('button')

    buttons.forEach((button) => {
      expect(button.text()).not.toBe('Which is Which?')
    })

    await buttons[1].trigger('click')
    await buttons[1].trigger('click')
    await buttons[1].trigger('click')

    const finalButton = await wrapper.findComponent({ name: 'ActionButton' })

    expect(finalButton.exists()).toBe(true)

    await finalButton.trigger('click')

    const loserCard = await wrapper.findComponent({ name: 'LoserCard' })

    expect(spy).toHaveBeenCalled()
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(loserCard.exists()).toBe(true)
  })

  it('presents WinnerCard and awards contrarian bonus if only one player guesses correctly', async () => {
    const spy = jest.spyOn(wrapper.vm, 'findWinners')

    const buttons = await wrapper.findAll('button')

    buttons.forEach((button) => {
      expect(button.text()).not.toBe('Which is Which?')
    })

    await buttons[1].trigger('click')
    await buttons[2].trigger('click')
    await buttons[3].trigger('click')

    const finalButton = await wrapper.findComponent({ name: 'ActionButton' })

    expect(finalButton.exists()).toBe(true)

    await finalButton.trigger('click')

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(spy).toHaveBeenCalled()
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(winnerCard.exists()).toBe(true)

    expect(store.increasePlayerScore).nthCalledWith(1, 'Morty', 1)
    expect(store.increasePlayerScore).nthCalledWith(2, 'Morty', 1)
  })
})
