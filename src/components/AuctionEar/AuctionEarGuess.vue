<template lang='pug'>
.flex.flex-col.mx-32.rounded-lg.shadow-lg.overflow-hidden.text-left
  .flex-shrink-0
    img.h-48.m-0.w-full.clear-reveal.object-cover(:src='image' alt='')
  .flex-1.bg-white.p-6.flex.flex-col.justify-between
    .flex-1
      span.block.mt-2.text-xl.leading-7.font-semibold.text-gray-900
        | {{ prompt }}
      .my-4.text-center.flex.flex-col.justify-between.items-center
        button.actionButton(
          v-for='(item, index) in items'
          @click='emitGuess(currentPlayer, index)'
          ) {{ item.name }} {{ item.emoji }}
  .flex-1.bg-green.p-6.flex.flex-col.justify-between
    span.text-2xl.leading-7.font-semibold.text-white
      | {{ currentPlayer.name }}
</template>

<script>
export default {
  name: 'AuctionEarGuess',
  props: {
    items: Array,
    currentPlayer: Object,
    prompt: {
      type: String,
      default: 'What is your guess?'
    },
    image: {
      type: String,
      default: '/images/auctionear_header.png'
    }
  },
  methods: {
    emitGuess (player, index) {
      this.$emit('guess', { player: player, value: index })
    }
  }
}
</script>

<style lang="scss">
.actionButton {
  @apply inline-flex justify-center px-6 py-3 border border-transparent leading-6 font-medium rounded-md text-white text-2xl uppercase bg-darkgray transition ease-in-out duration-150 my-2 hover:bg-slate-300 focus:outline-none focus:border-slate-300 active:bg-slate-300;
}
</style>
