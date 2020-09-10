import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'

import AddPlayersBar from '@/components/Players/AddPlayersBar'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store()

describe('AddPlayersBar props', () => {
  test('If addPlayersAllowed prop is true, show button to add player.', () => {
    const wrapper = mount(AddPlayersBar, {
      propsData: {
        addPlayersAllowed: true
      }
    })
    const addPlayersButton = wrapper.find('button').element
    expect(addPlayersButton.textContent).toEqual('Add')
  }),
  test('If addPlayersAllowed prop is false, do not show button to add player.', () => {
    const wrapper = mount(AddPlayersBar, {
      propsData: {
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
      propsData: {
        addTeamsAllowed: true
      }
    })
    const addTeamsButton = wrapper.findAll('button').at(1)
    expect(addTeamsButton.element.textContent).toEqual('Add Team')
  }),
  test('If addTeamsAllowed is false, do not show button to add team.', () => {
    const wrapper = mount(AddPlayersBar, {
      propsData: {
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
  beforeEach(() => {
    store.commit = jest.fn()
  }),
  test('If Add Player button is clicked with input, player is entered', async () => {
    const wrapper = mount(AddPlayersBar, {
      localVue: localVue,
      store
    })

    const input = wrapper.find('input')
    input.element.value = 'Rick'
    await input.trigger('input')

    const addPlayersButton = wrapper.find('button')
    await addPlayersButton.trigger('click')

    expect(wrapper.vm.$store.commit).toHaveBeenCalledWith('addPlayer', { name: 'Rick' })
  }),
  test('If Add Player button is clicked with no input, no player is entered', async () => {
    const wrapper = mount(AddPlayersBar, {
      localVue: localVue,
      store
    })

    debugger

    const addPlayersButton = wrapper.find('button')
    await addPlayersButton.trigger('click')

    expect(wrapper.vm.$store.commit).not.toHaveBeenCalled()
  }),
  test('If Add Team button is clicked with no input, no team is entered', async () => {
    const wrapper = mount(AddPlayersBar, {
      localVue: localVue,
      store
    })

    const input = wrapper.find('input')
    input.element.value = ''
    await input.trigger('input')

    const addTeamButton = wrapper.findAll('button').wrappers[1]
    await addTeamButton.trigger('click')

    expect(wrapper.vm.$store.commit).not.toHaveBeenCalled()
  }),
  test('If Add Team button is clicked with input, team is created', async () => {
    const wrapper = mount(AddPlayersBar, {
      localVue: localVue,
      store
    })

    const input = wrapper.find('input')
    input.element.value = 'Team Superrad'
    await input.trigger('input')

    const addTeamButton = wrapper.findAll('button').wrappers[1]
    await addTeamButton.trigger('click')

    expect(wrapper.vm.$store.commit).toHaveBeenCalledWith('addTeam', { name: 'Team Superrad' })
  })
})
