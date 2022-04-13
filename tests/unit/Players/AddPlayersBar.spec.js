import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import { useGameStore } from '@/store'

import AddPlayersBar from '@/components/Players/AddPlayersBar'

describe('AddPlayersBar props', () => {
  test('If addPlayersAllowed prop is true, show button to add player.', () => {
    const wrapper = mount(AddPlayersBar, {
      props: {
        addPlayersAllowed: true
      }
    })
    const addPlayersButton = wrapper.find('button').element
    expect(addPlayersButton.textContent).toEqual('Add')
  }),
  test('If addPlayersAllowed prop is false, do not show button to add player.', () => {
    const wrapper = mount(AddPlayersBar, {
      props: {
        addPlayersAllowed: false
      }
    })
    const addPlayersButton = wrapper.find('button').element.textContent
    expect(addPlayersButton).not.toEqual('Add')

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toEqual(1)
  }),
  test('If addTeamsAllowed is true, show button to add team.', () => {
    const wrapper = mount(AddPlayersBar, {
      props: {
        addTeamsAllowed: true
      }
    })
    const addTeamsButton = wrapper.findAll('button').at(1)
    expect(addTeamsButton.element.textContent).toEqual('Add Team')
  }),
  test('If addTeamsAllowed is false, do not show button to add team.', () => {
    const wrapper = mount(AddPlayersBar, {
      props: {
        addTeamsAllowed: false
      }
    })
    const addTeamsButton = wrapper.findAll('button')
    expect(addTeamsButton.length).toEqual(1)

    const addPlayersButton = wrapper.find('button')
    expect(addPlayersButton.element.textContent).toEqual('Add')
    expect(addPlayersButton.classes()).toContain('rounded-r-md')
  })
})

describe('AddPlayersBar UX', () => {
  let wrapper
  let store

  beforeEach(() => {
    wrapper = mount(AddPlayersBar, {
      props: {
        addTeamsAllowed: true
      },
      global: {
        plugins: [createTestingPinia()]
      }
    })

    store = useGameStore()
  })

  test('If Add Player button is clicked with input, player is entered', async () => {
    const input = wrapper.find('input')
    input.element.value = 'Rick'
    await input.trigger('input')

    const addPlayersButton = wrapper.find('button')
    await addPlayersButton.trigger('click')

    expect(store.addPlayer).toHaveBeenCalledWith('Rick')
  }),
  test('If Add Player button is clicked with no input, no player is entered', async () => {
    const spy = jest.spyOn(store, 'addPlayer')

    const addPlayersButton = wrapper.find('button')
    await addPlayersButton.trigger('click')

    expect(spy).not.toHaveBeenCalled()
  }),
  test('If Add Team button is clicked with no input, no team is entered', async () => {
    const input = wrapper.find('input')
    input.element.value = ''
    await input.trigger('input')

    const addTeamButton = wrapper.findAll('button')[1]
    await addTeamButton.trigger('click')

    expect(store.addTeam).not.toHaveBeenCalled()
  }),
  test('If Add Team button is clicked with input, team is created', async () => {
    const input = wrapper.find('input')
    input.element.value = 'Team Superrad'
    await input.trigger('input')

    const addTeamButton = wrapper.findAll('button')[1]
    await addTeamButton.trigger('click')

    expect(store.addTeam).toHaveBeenCalledWith('Team Superrad')
  })
})
