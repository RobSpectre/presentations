import LoserCard from '@/components/base/LoserCard.vue'

import { mount } from '@vue/test-utils'

describe('LoserCard UX', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LoserCard, {
      props: {
        losers: ['Rick', 'Morty'],
        answerName: 'The meaning of life',
        answerValue: '42'
      }
    })
  })

  it('LoserCard renders correctly', async () => {
    const winner = await wrapper.find('span')

    expect(winner.text()).toBe('Rick')

    const answer = await wrapper.find('p')

    expect(answer.text()).toBe('The meaning of life is 42.')
  })
})
