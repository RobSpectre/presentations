<template lang='pug'>
.flex.flex-col.mx-32.rounded-lg.shadow-lg.overflow-hidden.text-left
  .flex-shrink-0
    img.h-48.m-0.w-full.clear-reveal.object-cover(:src='image' alt='')
  .flex-1.bg-white.p-6.flex.flex-col.justify-between
    .flex-1
      span.block.mt-2.text-xl.leading-7.font-semibold.text-gray-900
        | {{ prompt }}
      .my-4.text-center
        input.shadow.appearance-none.border.rounded.py-2.px-3.text-gray-700.leading-tight(
          class='w-1/3 focus:outline-none focus:shadow-outline' type='text'
          :placeholder='placeholderInput'
          v-model='currentInput'
          v-on:keydown.enter='emitInput(currentPlayer, currentInput)')
  .flex-1.bg-green.p-6.flex.flex-col.justify-between
    span.text-2xl.leading-7.font-semibold.text-white
      | {{ currentPlayer.name }}
</template>

<script>
export default {
  name: 'AuctionEarBid',
  props: {
    currentPlayer: Object,
    image: {
      type: String,
      default: '/images/auctionear_header.png'
    },
    prompt: {
      type: String,
      default: 'What is your bid?'
    },
    placeholderInput: {
      type: String,
      default: 'Bid'
    }
  },
  data () {
    return {
      currentInput: ''
    }
  },
  methods: {
    emitInput (player, input) {
      this.$emit('output', { player: player, value: input })

      this.currentInput = ''
    }
  }
}
</script>
