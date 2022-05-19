import { mount } from '@vue/test-utils'

import { mocks } from '../../test-utils'

import { flushPromises } from 'flush-promises'

import AudioPlayer from '@/components/AuctionEar/AudioPlayer.vue'

jest.useFakeTimers()

describe('AudioPlayer', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AudioPlayer, {
      props: {
        src: '/sounds/fanfare.mp3',
        chunks: 5
      }
    })
  })

  it('plays audio when play button is clicked', async () => {
    await wrapper.trigger('loadedmetadata')
    const button = await wrapper.find('button')

    button.trigger('click')

    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(wrapper.vm.chunkPercentages[0]).toBeLessThan(0.05)
  })

  it('returns a duration limit in seconds', async () => {
    expect(wrapper.vm.durationLimit).toBe(0)
  })

  it('returns the currentTime from the playing audio file', async () => {
    await wrapper.vm.checkCurrentTime()
    expect(wrapper.vm.currentTime).toBe(0)
  })

  it('togglePlay pauses if current state is playing', async () => {
    await wrapper.setData({ playing: true })
    const button = await wrapper.find('button')

    button.trigger('click')

    await flushPromises

    expect(mocks.Audio.pause).toHaveBeenCalled()
    expect(wrapper.vm.chunkPercentages[0]).toBeLessThan(0.05)
  })
})

describe('AudioPlayer', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AudioPlayer, {
      props: {
        src: '/sounds/fanfare.mp3',
        chunks: 5,
        chunkEvenly: true,
        chunkIndex: 6
      }
    })
  })

  it('plays audio when play button is clicked', async () => {
    const button = wrapper.find('button')

    button.trigger('click')

    expect(mocks.Audio.play).toHaveBeenCalled()
    expect(wrapper.vm.chunkPercentages[0]).toBeGreaterThan(0.05)
  })

  it('displays round progress as 100% when chunkIndex exceeds chunks', async () => {
    expect(wrapper.vm.roundProgress).toBe('width: 100%;')
  })
})
