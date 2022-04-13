import Slide from '@/components/base/Slide.vue'
import { mount } from '@vue/test-utils'

describe('Slide', () => {
  test('If heading prop is passed, show on bottom of slide.', () => {
    const wrapper = mount(Slide, {
      propsData: {
        heading: 'Testing'
      }
    })
    const heading = wrapper.find('h1').element.textContent

    expect(heading).toBe('Testing')
  })

  test('If heading prop is not passed, do not show on bottom of slide.', () => {
    const wrapper = mount(Slide)
    const heading = wrapper.find('h1')

    expect(heading.exists()).toBe(false)
  })

  test('If class prop is passed, apply to section of slide.', () => {
    const wrapper = mount(Slide, {
      propsData: {
        classes: 'green'
      }
    })
    const classes = wrapper.find('section').classes()

    expect(classes).toEqual(['green'])
  })

  test('If class prop is not passed, class is not affected.', () => {
    const wrapper = mount(Slide)
    const classes = wrapper.find('section').classes()

    expect(classes).toEqual([])
  })
})
