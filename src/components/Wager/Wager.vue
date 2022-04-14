<template lang='pug'>
GameSlide
  PlayersSidebar(:players='players')
  .relative.mt-12.mx-auto(v-if='!complete & !wagerComplete')
    .flex.flex-col.mx-32.rounded-lg.shadow-lg.overflow-hidden.text-left
      .flex-shrink-0
        .bg-blue.leading-7.uppercase.font-semibold.text-white.p-4 Make your wager
      .flex-1.bg-white.p-6.flex.flex-col.justify-between
        .flex-1
          span.block.mt-2.text-xl.leading-7.font-semibold.text-gray-900
            | How much is your wager?
          .my-4.text-center
            input.shadow.appearance-none.border.rounded.py-2.px-3.text-gray-700.leading-tight(class='w-1/3 focus:outline-none focus:shadow-outline' type='text' placeholder='Wager' v-model='wager' v-on:keydown.enter='addWager(currentPlayer, wager)')
      .flex-1.bg-green.p-6.flex.flex-col.justify-between
        span.text-2xl.leading-7.font-semibold.text-white
          | {{ currentPlayer }}
  .relative.mt-12.mx-auto(v-if='!complete & wagerComplete')
    .flex.flex-col.mx-32.rounded-lg.shadow-lg.overflow-hidden.text-left
      .flex-shrink-0
        .bg-blue.leading-7.uppercase.font-semibold.text-white.p-4 Place your bet
      .flex-1.bg-white.p-6.flex.flex-col.justify-between
        .flex-1
          span.block.text-lg.leading-7.font-semibold.text-gray-900
          | Where are you placing your bet?
          .my-2.text-center.flex.flex-col
            button.actionButton(
              v-for='(item, index) in items'
              @click='addGuess(currentPlayer, index)'
              ) {{ item.name }} {{ item.emoji }}
      .flex-1.bg-green.p-6.flex.flex-col.justify-between
        span.text-2xl.uppercase.leading-7.font-semibold.text-white
          | {{ currentPlayer }}
</template>

<script>
/* eslint vue/no-side-effects-in-computed-properties: "off" */
import { mapState, mapActions } from 'pinia'
import { useGameStore } from '@/store'

import GameSlide from '@/components/base/GameSlide.vue'

import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'

export default {
  name: 'Wager',
  components: {
    GameSlide,
    PlayersSidebar
  },
  props: {
    items: Array
  },
  data () {
    return {
      wager: 0,
      guess: 0,
      bets: [],
      complete: false,
      wagerComplete: false
    }
  },
  computed: {
    ...mapState(useGameStore, ['game']),
    currentPlayer () {
      if (this.game.players.length > 0) {
        return this.game.players[this.game.playerIndex].name
      } else {
        return ''
      }
    },
    players () {
      const players = []

      this.bets.forEach((bet) => {
        players.push({
          name: bet.name,
          value: bet.guess.emoji
        })
      })

      return players
    }
  },
  methods: {
    addWager (playerName, wager) {
      this.wager = parseInt(wager)
      this.wagerComplete = true
    },
    addGuess (playerName, guess) {
      const bet = {
        name: playerName,
        wager: this.wager,
        guess: this.items[guess]
      }

      this.$emit('bet', bet)

      this.bets.push(bet)

      this.nextPlayer()
    },
    nextPlayer () {
      this.wager = 0
      this.guess = 0
      this.wagerComplete = false

      this.increasePlayerIndex()

      if (this.game.playerIndex === this.game.playerButton) {
        this.complete = true
      }
    },
    ...mapActions(useGameStore, ['increasePlayerScore',
      'increasePlayerButton',
      'increasePlayerIndex'])
  }
}

</script>

<style lang="scss" scoped>
.actionButton {
  @apply inline-flex justify-center px-6 py-3 border border-transparent leading-6 font-medium rounded-md text-white text-2xl uppercase bg-darkgray transition ease-in-out duration-150 my-2 hover:bg-slate-300 focus:outline-none focus:border-slate-300 active:bg-slate-300;
}
</style>
