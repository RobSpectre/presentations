import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import { mocks } from '../../test-utils'

import { useGameStore } from '@/store'

import ItemMultiSelect from '@/components/WhichIsWhich/ItemMultiSelect.vue'

describe('ItemMultiSelect Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ItemMultiSelect, {
      props: {
        items: ['Merc', 'Red Bull', 'Ferrari'],
        winnerIndice: [1, 2],
        question: 'Which are the fastest cars?'
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

describe('ItemMultiSelect', () => {
  let wrapper
  let store

  beforeEach(() => {
    wrapper = mount(ItemMultiSelect, {
      props: {
        items: ['Merc', 'Red Bull', 'Ferrari'],
        winnerIndice: [1, 2],
        question: 'Which are the fastest cars?'
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

  it('renders with players', async () => {
    const currentPlayer = await wrapper.vm.currentPlayer
    expect(currentPlayer).toBe('Morty')
  })

  it('stores a guess for the player', async () => {
    const button = await wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.vm.players.length).toBe(1)
  })

  it('presents the button to reveal answer after all players guess', async () => {
    let buttons = await wrapper.findAll('button')

    buttons.forEach((button) => {
      expect(button.text()).not.toBe('Which is Which?')
    })

    await buttons[0].trigger('click')
    await buttons[1].trigger('click')
    await buttons[2].trigger('click')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')
    await buttons[2].trigger('click')

    buttons = await wrapper.findAll('button')

    expect(buttons.length).toBe(1)
    expect(buttons[0].text()).toBe('Find Winners')
  })

  it('presents WinnerCard after reveal button is clicked', async () => {
    const spy = jest.spyOn(wrapper.vm, 'findWinners')

    let buttons = await wrapper.findAll('button')

    buttons.forEach((button) => {
      expect(button.text()).not.toBe('Find Winner')
    })

    await buttons[1].trigger('click')
    await buttons[2].trigger('click')
    await buttons[1].trigger('click')
    await buttons[2].trigger('click')
    await buttons[0].trigger('click')
    await buttons[0].trigger('click')

    buttons = await wrapper.findAll('button')

    expect(buttons.length).toBe(1)
    expect(buttons[0].text()).toBe('Find Winners')

    await buttons[0].trigger('click')

    debugger

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(spy).toHaveBeenCalled()
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(winnerCard.exists()).toBe(true)
  })

  it('presents LoserCard if no correct answer is guessed', async () => {
    const spy = jest.spyOn(wrapper.vm, 'findWinners')

    let buttons = await wrapper.findAll('button')

    buttons.forEach((button) => {
      expect(button.text()).not.toBe('Find Winners')
    })

    await buttons[0].trigger('click')
    await buttons[0].trigger('click')
    await buttons[0].trigger('click')
    await buttons[0].trigger('click')
    await buttons[0].trigger('click')
    await buttons[0].trigger('click')

    buttons = await wrapper.findAll('button')

    expect(buttons.length).toBe(1)
    expect(buttons[0].text()).toBe('Find Winners')

    await buttons[0].trigger('click')

    const loserCard = await wrapper.findComponent({ name: 'LoserCard' })

    expect(spy).toHaveBeenCalled()
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(loserCard.exists()).toBe(true)
  })

  it('presents WinnerCard and awards contrarian bonus if only one player guesses correctly', async () => {
    const spy = jest.spyOn(wrapper.vm, 'findWinners')

    let buttons = await wrapper.findAll('button')

    buttons.forEach((button) => {
      expect(button.text()).not.toBe('Which is Which?')
    })

    await buttons[1].trigger('click')
    await buttons[2].trigger('click')
    await buttons[2].trigger('click')
    await buttons[0].trigger('click')
    await buttons[2].trigger('click')
    await buttons[0].trigger('click')

    buttons = await wrapper.findAll('button')

    expect(buttons.length).toBe(1)
    expect(buttons[0].text()).toBe('Find Winners')

    await buttons[0].trigger('click')

    const winnerCard = await wrapper.findComponent({ name: 'WinnerCard' })

    expect(spy).toHaveBeenCalled()
    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(winnerCard.exists()).toBe(true)

    expect(store.increasePlayerScore).nthCalledWith(1, 'Morty', 1)
    expect(store.increasePlayerScore).nthCalledWith(2, 'Morty', 1)
  })
})
