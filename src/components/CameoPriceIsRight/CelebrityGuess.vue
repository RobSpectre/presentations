<template lang='pug'>
GameSlide
  PlayersSidebar(:players='players')
  .relative.mt-12.mx-auto(v-if='!complete')
    .flex.flex-col.mx-32.rounded-lg.shadow-lg.overflow-hidden.text-left
      .flex-shrink-0
        img.h-48.m-0.w-full.clear-reveal.object-cover(:src='image' alt='')
      .flex-1.bg-white.p-6.flex.flex-col.justify-between
        .flex-1
          span.block.mt-2.text-xl.leading-7.font-semibold.text-gray-900
          | {{ question }}
          .my-4.text-center
            input.shadow.appearance-none.border.rounded.py-2.px-3.text-gray-700.leading-tight(class='w-1/3 focus:outline-none focus:shadow-outline' type='text' placeholder='Guess' v-model='currentGuess' v-on:keydown.enter='addGuess(currentPlayer, currentGuess)')
      .flex-1.bg-green.p-6.flex.flex-col.justify-between
        span.text-2xl.leading-7.font-semibold.text-white
          | {{ currentPlayer }}
  .mx-auto.align-middle(v-else='')
    span.inline-flex.rounded-md.shadow-sm
      button.inline-flex.items-center.px-6.py-3.border.border-transparent.text-base.leading-6.font-medium.rounded-md.text-white.bg-indigo-600.transition.ease-in-out.duration-150.mt-12(type='button'
      class='hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700' @click='findWinner()'
      accesskey='z')
        | Is The Price Right?&#x9;
        svg.ml-3.-mr-1.h-5.w-5(fill='currentColor' viewbox='0 0 20 20')
          path(d='M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-11v2h1a3 3 0 0 1 0 6h-1v1a1 1 0 0 1-2 0v-1H8a1 1 0 0 1 0-2h3v-2h-1a3 3 0 0 1 0-6h1V6a1 1 0 0 1 2 0v1h3a1 1 0 0 1 0 2h-3zm-2 0h-1a1 1 0 1 0 0 2h1V9zm2 6h1a1 1 0 0 0 0-2h-1v2z')
  h1 {{ celebrity }}
  WinnerCard(
    v-if='winner.length > 0'
    :winners='[winner]'
    :answerName='celebrity'
    :answerValue='dollarify(price)'
  )
  LoserCard(
    v-if='losers.length > 0'
    :losers='losers'
    :answerName='celebrity'
    :answerValue='dollarify(price)'
  )
</template>

<script>
/* eslint vue/no-side-effects-in-computed-properties: "off" */
import { mapState, mapActions } from 'pinia'
import { useGameStore } from '@/store'

import GameSlide from '@/components/base/GameSlide.vue'
import WinnerCard from '@/components/base/WinnerCard.vue'
import LoserCard from '@/components/base/LoserCard.vue'

import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'

export default {
  name: 'CelebrityGuess',
  components: {
    GameSlide,
    PlayersSidebar,
    WinnerCard,
    LoserCard
  },
  props: {
    celebrity: String,
    image: String,
    price: Number,
    prize: Number,
    denomination: {
      type: String,
      default: '$'
    },
    question: {
      type: String,
      default: 'How much is this talent on Cameo?'
    }
  },
  data () {
    return {
      guesses: [],
      complete: false,
      winner: '',
      losers: [],
      winningGuess: 0,
      currentGuess: ''
    }
  },
  computed: {
    ...mapState(useGameStore, ['game']),
    guessesByPrice () {
      if (this.guesses.length > 0) {
        return this.guesses.sort((a, b) => a.guess - b.guess).reverse()
      } else {
        return []
      }
    },
    currentPlayer () {
      if (this.game.players.length > 0) {
        return this.game.players[this.game.playerIndex].name
      } else {
        return ''
      }
    },
    players () {
      const players = this.guessesByPrice

      players.forEach((player) => {
        player.name = player.playerName
        player.value = '$' + player.guess
      })

      return players
    }
  },
  methods: {
    addGuess (playerName, guess) {
      this.guesses.push({
        playerName: playerName,
        guess: parseInt(guess)
      })

      this.currentGuess = ''

      this.nextPlayer()
    },
    nextPlayer () {
      this.guess = ''
      this.increasePlayerIndex()

      if (this.game.playerIndex === this.game.playerButton) {
        this.complete = true
      }
    },
    findWinner () {
      let bestGuess = 0
      let guessDistance = 100000000
      let winner = ''
      const price = parseInt(this.price)
      let currentGuess = 0

      this.guesses.forEach((guess) => {
        currentGuess = parseInt(guess.guess)

        if (price < 0) {
          if (currentGuess >= price) {
            if (Math.abs(currentGuess - price) < guessDistance) {
              guessDistance = Math.abs(currentGuess - price)
              bestGuess = currentGuess
              winner = guess.playerName
            }
          }
        } else {
          if (currentGuess <= price) {
            if (Math.abs(currentGuess - price) < guessDistance) {
              guessDistance = Math.abs(currentGuess - price)
              bestGuess = currentGuess
              winner = guess.playerName
            }
          }
        }
      })

      if (parseInt(bestGuess) === this.price) {
        this.increasePlayerScore(winner, (this.prize * 2))

        const audio = new Audio('/sounds/sorry_for_party_rocking.mp3')
        audio.volume = 0.2
        audio.play()
      } else if (winner.length > 0) {
        this.increasePlayerScore(winner, this.prize)

        const audio = new Audio('/sounds/fanfare.mp3')
        audio.volume = 0.2
        audio.play()
      } else {
        const audio = new Audio('/sounds/loser_sound.mp3')
        audio.volume = 0.2
        audio.play()

        this.losers = this.players.map(player => player.name)
      }

      this.winner = winner
      this.winningGuess = bestGuess

      this.increasePlayerButton()
    },
    dollarify (value) {
      return this.denomination + value
    },
    ...mapActions(useGameStore, ['increasePlayerScore',
      'increasePlayerButton',
      'increasePlayerIndex'])
  }
}

</script>
