import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import GenerateImage from '@/components/HelpComputer/GenerateImage.vue'

import { createTestingPinia } from '@pinia/testing'

describe('GenerateImage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(GenerateImage, {
      props: {
        comparisonImage: '/images/hackparty-logo.png',
        playerName: 'Rick'
      },
      global: {
        plugins: [createTestingPinia()]
      }
    })

    wrapper.vm.id = 1
  })

  it('it sends a message over web socket on input', async () => {
    wrapper.vm.connection.send = jest.fn()

    const input = await wrapper.find('input')
    await input.setValue('Max Verstappen wins the Dutch GP')
    await input.trigger('keydown.enter')

    await flushPromises()

    expect(wrapper.vm.connection.send).toHaveBeenCalledWith('{"name":"Image Request","prompt":"Max Verstappen wins the Dutch GP","playerName":"Rick","id":1}')
  })

  it('flips loading bit when loading message is received', async () => {
    const event = { data: '{ "id": 1, "name": "Loading" }' }

    wrapper.vm.handleMessage(event)

    expect(wrapper.vm.loading).toBe(true)
  })

  it('processes an image response', async () => {
    const event = { data: '{ "id": 1, "name": "Image Response", "prompt": "Hello", "imagePath": "hello.jpg" }' }

    wrapper.vm.handleMessage(event)

    expect(wrapper.vm.prompt).toBe('Hello')
    expect(wrapper.vm.image).toBe('/images/hello.jpg')
  })

  it('ignores an event it does not recognize', async () => {
    const event = { data: '{ "id": 1, "name": "blergh" }' }

    const log = jest.spyOn(console, 'log').mockImplementation(() => {})

    wrapper.vm.handleMessage(event)

    expect(log).toHaveBeenCalled()
  })

  it('sets the connection color to green when connected bit is flipped', async () => {
    wrapper.vm.connected = true

    expect(wrapper.vm.buttonColor).toBe('#00bc70')
  })
})
