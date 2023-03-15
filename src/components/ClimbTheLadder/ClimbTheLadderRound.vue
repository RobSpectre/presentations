<template lang='pug'>
GameContentWithSidebar(:players='computedPlayers')
  template(v-slot:content)
    ChooseItemModal(
      v-if='!complete'
      :items='items'
      :fragmentItemReveal='fragmentItemReveal'
      :question='question'
      :headerImage='headerImage'
      @guess='onGuess',
      :selectedPlayer='currentPlayer'
    )
      template(v-slot:interstitial)
        Countdown(
          :timer='timeRemaining'
          @countedDown='countedDown'
        )
    .flex.flex-grow.items-center.justify-center.bg-cover.min-h-screen(
      v-else
      class="bg-[url('/images/climb_the_ladder_victory.jpg')]"
    )
      .flex.flex-col.mx-auto(class='w-2/5')
        .flex.flex-col.rounded-lg.shadow-lg.overflow-hidden.bg-blue
          .flex-1.p-2.flex.flex-col.justify-between(
            v-for='player in playersByScoreDifference'
          )
            span.winner
              | {{ player.name }} #[strong {{ player.value }}]
          .flex-1.bg-green.p-6.flex.flex-col.justify-between
            span.text-2xl.uppercase.leading-7.font-semibold.text-white
              | Points Gained
</template>

<script>
import { mapGetters, mapActions } from 'pinia'
import { useGameStore } from '@/store'

import Countdown from '@/components/base/Countdown.vue'
import GameContentWithSidebar from '@/components/base/GameContentWithSidebar.vue'

import ChooseItemModal from '@/components/base/ChooseItemModal.vue'

export default {
  name: 'ClimbTheLadderRound',
  components: {
    Countdown,
    GameContentWithSidebar,
    ChooseItemModal
  },
  props: {
    timer: {
      type: Number,
      default: 30
    },
    question: {
      type: String,
      default: ''
    },
    alarmSound: {
      type: String,
      default: '/sounds/wrong_sound.mp3'
    },
    denomination: {
      default: '$',
      type: String
    },
    headerImage: {
      default: '/images/which_is_which_cover.jpg',
      type: String
    },
    prize: {
      default: 1,
      type: Number
    },
    fragmentItemReveal: {
      default: false,
      type: Boolean
    },
    playerOrder: {
      type: String,
      default: 'lowestScoreFirst'
    }
  },
  computed: {
    currentPlayer () {
      if (this.players.length > 0) {
        return this.players[this.playerIndex].name
      } else {
        return ''
      }
    },
    computedPlayers () {
      const players = []

      if (this.playerOrder === 'lowestScoreFirst') {
        const reversedPlayers = this.reverse(this.getPlayersByScore)

        reversedPlayers.forEach((player) => {
          players.push({
            name: player.name,
            value: player.score
          })
        })
      } else if (this.playerOrder === 'button') {
        this.getPlayersFromButton.forEach((player) => {
          players.push({
            name: player.name,
            value: player.score
          })
        })
      } else {
        this.getPlayersByScore.forEach((player) => {
          players.push(
            {
              name: player.name,
              value: player.score
            }
          )
        })
      }

      return players
    },
    playersByScoreDifference () {
      const playersByScoreDifference = []

      this.computedPlayers.forEach((player) => {
        let originalScore = 0
        let newScore = 0

        this.players.forEach((oldPlayer) => {
          if (player.name === oldPlayer.name) {
            originalScore = oldPlayer.value
            newScore = player.value
          }
        })

        playersByScoreDifference.push({
          name: player.name,
          value: newScore - originalScore
        })
      })

      return playersByScoreDifference.sort((a, b) => (a.value > b.value) ? 1 : -1)
    },
    ...mapGetters(useGameStore, ['getPlayersByScore'])
  },
  data () {
    return {
      complete: false,
      playerIndex: 0,
      players: [],
      items: [
        { name: 'Correct', emoji: '👍️' }
      ],
      timeRemaining: this.timer
    }
  },
  created () {
    this.players = this.computedPlayers
  },
  methods: {
    onGuess (guess) {
      this.increasePlayerScore(this.currentPlayer, this.prize)

      const audio = new Audio('/sounds/sonic_ring.mp3')
      audio.volume = 0.2
      audio.play()
    },
    countedDown (event) {
      this.playerIndex++

      if (this.playerIndex >= this.players.length) {
        this.complete = true

        const audio = new Audio('/sounds/fanfare.mp3')
        audio.volume = 0.2
        audio.play()
      }
    },
    reverse (array) {
      const output = []

      for (var i = array.length - 1; i > -1; i--) {
        output.push(array[i])
      }

      return output
    },
    ...mapActions(useGameStore, ['increasePlayerScore'])
  }
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css2?family=Tilt+Warp&display=swap');

.winner {
  font-family: 'Tilt Warp', cursive;
  @apply text-4xl uppercase text-white text-center
}
</style>
