<template lang='pug'>
.fixed.bottom-0.inset-x-0.px-4.pb-6.transition.ease-in-out.duration-700(class='sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center')
  .fixed.inset-0.transition-opacity
    .absolute.inset-0.bg-gray-500.opacity-75
  .bg-blue.rounded-lg.px-4.pt-5.pb-4.overflow-hidden.shadow-xl.transform.transition-all(class='sm:max-w-sm sm:w-full sm:p-6' role='dialog' aria-modal='true' aria-labelledby='modal-headline')
    img.h-48.w-96.object-cover(src='/images/loser.gif' alt='')
    .mt-3.text-white.flex.flex-col(class='sm:mt-5').justify-evenly
      span.block.my-4.uppercase.text-6xl.font-semibold.leading-6.text-white(v-for="loser in losers")
        | {{ loser }}
      .mt-2
        p.text-xl.leading-5.text-white.uppercase
          | {{ answerName }} is
          b  {{ answerValue }}
</template>

<script>
export default {
  name: 'LoserCard',
  props: {
    losers: Array,
    answerName: String,
    answerValue: String
  }
}
</script>
