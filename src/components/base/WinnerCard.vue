<template lang='pug'>
.fixed.bottom-0.inset-x-0.px-4.pb-6(class='sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center')
  .fixed.inset-0
    .absolute.inset-0.bg-gray-500.opacity-75
  transition(appear @before-enter='beforeEnter' @enter='enter' :css='false')
    .bg-green.rounded-lg.px-4.pt-5.pb-4.overflow-hidden.shadow-xl.transform.transition-all(class='sm:max-w-sm sm:w-full sm:p-6' role='dialog' aria-modal='true' aria-labelledby='modal-headline')
      img.h-48.w-96.object-cover(
        :src='headerImage'
        alt=''
        v-if='constrainHeaderImage'
      )
      img.object-cover(
        :src='headerImage'
        alt=''
        v-else
      )
      .mt-3.text-white.flex.flex-col(class='sm:mt-5').justify-evenly
        span.block.my-4.uppercase.text-6xl.font-semibold.leading-6.text-white(v-for="winner in winners")
          | {{ winner }}
        .mt-2
          p.text-xl.leading-5.text-white.uppercase(v-if="answer !== ''")
            | {{ answer }}
          p.text-xl.leading-5.text-white.uppercase(v-else)
            | {{ answerName }} is {{ answerValue }}.
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'WinnerCard',
  props: {
    winners: Array,
    answer: {
      type: String,
      default: ''
    },
    answerName: {
      type: String,
      default: 'Answer'
    },
    answerValue: {
      type: String,
      default: 'correct'
    },
    headerImage: {
      type: String,
      default: '/images/winner_winner_chicken_dinner.png'
    },
    constrainHeaderImage: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    beforeEnter (el) {
      el.style.opacity = 0
    },
    enter (el, done) {
      gsap.to(el, {
        duration: 2,
        opacity: 1,
        ease: 'power1',
        onComplete: done
      })
    }
  }
}
</script>
