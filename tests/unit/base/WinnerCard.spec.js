import WinnerCard from '@/components/base/WinnerCard.vue'

import { mount } from '@vue/test-utils'

describe('WinnerCard UX', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(WinnerCard, {
      props: {
        winners: ['Rick', 'Morty'],
        answerName: 'The meaning of life',
        answerValue: '42'
      }
    })
  })

  it('WinnerCard renders correctly', async () => {
    const winner = await wrapper.find('span')

    expect(winner.text()).toBe('Rick')

    const answer = await wrapper.find('p')

    expect(answer.text()).toBe('The meaning of life is 42.')
  })
})
