import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import { useGameStore } from '@/store'

import PointsController from '@/components/Players/PointsController.vue'

describe('PointsController UX', () => {
  let wrapper
  let store

  beforeEach(() => {
    wrapper = mount(PointsController, {
      props: {
        playerName: 'Rick'
      },
      global: {
        plugins: [createTestingPinia()]
      }
    })

    store = useGameStore()
  })

  it('Press up arrow and player score increments', async () => {
    const button = wrapper.find('.up-arrow')
    await button.trigger('click')

    expect(store.increasePlayerScore).toBeCalledWith('Rick')
  })

  it('Press down arrow and player score decrements', async () => {
    const button = wrapper.find('.down-arrow')
    await button.trigger('click')

    expect(store.increasePlayerScore).toBeCalledWith('Rick', -1)
  })
})
