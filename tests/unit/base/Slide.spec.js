import Slide from '@/components/base/Slide'
import { mount } from '@vue/test-utils'

describe('Slide', () => {
  test('If heading prop included, show on bottom of slide.', () => {
    const wrapper = mount(Slide, {
      propsData: {
        heading: 'Testing'
      }
    })
    const heading = wrapper.find('h1').element.textContent

    expect(heading).toBe('Testing')
  })

  test('If heading prop not included, do not show on bottom of slide.', () => {
    const wrapper = mount(Slide)
    const heading = wrapper.find('h1').element

    expect(heading).toBe(undefined)
  })
})
