<template lang='pug'>
GameSlide
  PlayersSidebar(:players='players')
  .relative.mt-12.mx-auto(v-if='!complete')
    .flex.flex-col.mx-32.rounded-lg.shadow-lg.overflow-hidden.text-left
      .flex-shrink-0
        img.m-0.w-full.clear-reveal.object-cover(:src='headerImage' alt='')
      .flex-1.bg-white.p-6.flex.flex-col.justify-between
        .flex-1
          span.block.text-lg.leading-7.font-semibold.text-gray-900.uppercase
          | {{ question }}
          .my-2.text-center.flex.flex-col
            button.actionButton(
              v-for='(item, index) in items'
              @click='guessItem(currentPlayer, index)'
              :class='{ fragment: fragmentItemReveal }'
              ) {{ item.name }} {{ item.emoji }}
      .flex-1.bg-green.p-6.flex.flex-col.justify-between
        span.text-2xl.uppercase.leading-7.font-semibold.text-white
          | {{ currentPlayer }}
  .mx-auto.align-middle(v-if='complete == true && winners.length <= 0 && losers.length <= 0')
    span.inline-flex.rounded-md.shadow-sm
      button.inline-flex.items-center.px-6.py-3.border.border-transparent.text-base.leading-6.font-medium.rounded-md.text-white.uppercase.bg-slate-400.transition.ease-in-out.duration-150.mt-12(type='button' class='hover:bg-slate-700 focus:outline-none focus:border-slate-700 active:bg-slate-700' @click='findWinners()')
        | Which is Which?
  WinnerCard(
    v-if='winners.length > 0'
    :winners='winners'
    :answerName='correctGuess.name'
    :answerValue='denominate(correctGuess.value)'
  )
  LoserCard(
    v-if='losers.length > 0'
    :losers='losers'
    :answerName='correctGuess.name'
    :answerValue='denominate(correctGuess.value)'
  )
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useGameStore } from '@/store'

import GameSlide from '@/components/base/GameSlide.vue'
import WinnerCard from '@/components/base/WinnerCard.vue'
import LoserCard from '@/components/base/LoserCard.vue'

import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'

export default {
  name: 'ItemGuess',
  components: {
    GameSlide,
    PlayersSidebar,
    WinnerCard,
    LoserCard
  },
  props: {
    items: Array,
    winnerIndex: Number,
    prize: Number,
    question: String,
    denomination: {
      default: '$',
      type: String
    },
    headerImage: {
      default: '/images/which_is_which_cover.jpg',
      type: String
    },
    fragmentItemReveal: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      guesses: [],
      complete: false,
      winners: [],
      losers: []
    }
  },
  computed: {
    currentPlayer () {
      if (this.game.players.length > 0) {
        return this.game.players[this.game.playerIndex].name
      } else {
        return ''
      }
    },
    players () {
      const players = []

      this.guesses.forEach((guess) => {
        players.push(
          {
            name: guess.playerName,
            value: guess.item.emoji
          }
        )
      })

      return players
    },
    correctGuess () {
      return this.items[this.winnerIndex]
    },
    ...mapState(useGameStore, ['game'])
  },
  methods: {
    guessItem (playerName, itemIndex) {
      this.guesses.push({
        playerName: playerName,
        item: this.items[itemIndex]
      })

      this.nextPlayer()
    },
    nextPlayer () {
      this.guess = ''
      this.increasePlayerIndex()

      if (this.game.playerIndex === this.game.playerButton) {
        this.complete = true
      }
    },
    findWinners () {
      const winners = []

      this.guesses.forEach((guess) => {
        if (guess.item.name === this.items[this.winnerIndex].name) {
          winners.push(guess.playerName)

          this.increasePlayerScore(guess.playerName, this.prize)
        }
      })

      if (winners.length === 1) {
        this.increasePlayerScore(winners[0], this.prize)

        const audio = new Audio('/sounds/sorry_for_party_rocking.mp3')
        audio.volume = 0.2

        audio.play()

        this.winners = winners
      } else if (winners.length > 0) {
        const audio = new Audio('/sounds/fanfare.mp3')
        audio.volume = 0.2
        audio.play()

        this.winners = winners
      } else {
        const audio = new Audio('/sounds/loser_sound.mp3')
        audio.volume = 0.2
        audio.play()

        this.losers = this.players.map(player => player.name)
      }

      this.increasePlayerButton()
    },
    denominate (value) {
      return this.denomination + value
    },
    ...mapActions(useGameStore, ['increasePlayerScore',
      'increasePlayerButton',
      'increasePlayerIndex'])
  }
}
</script>

<style lang="scss">
.actionButton {
  @apply inline-flex justify-center px-6 py-3 border border-transparent leading-6 font-medium rounded-md text-white text-2xl uppercase bg-darkgray transition ease-in-out duration-150 my-2 hover:bg-slate-300 focus:outline-none focus:border-slate-300 active:bg-slate-300;
}

.reveal img {
  margin: 0 !important;
  @apply max-w-full;
}
</style>
