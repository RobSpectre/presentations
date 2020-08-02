import AddPlayersBar from '@/components/Players/AddPlayersBar'
import { mount } from '@vue/test-utils'

describe('AddPlayersBar', () => {
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
