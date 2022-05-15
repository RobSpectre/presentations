<template lang='pug'>
GameSlide
  PlayersSidebar(:players='players')
  .relative.mt-12.mx-auto(v-if='game.players')
    .flex.flex-col.mx-32.rounded-lg.shadow-lg.overflow-hidden.text-left
      .flex-shrink-0
        img.m-0.w-full.clear-reveal.object-cover(:src='headerImage' alt='')
      .flex-1.bg-white.p-6.flex.flex-col.justify-between
        .flex-1
          span.block.text-lg.leading-7.font-semibold.text-gray-900.uppercase
          | {{ heading }}
          .my-2.text-center.flex.flex-col
            button.actionButton(
              v-for='player in game.players'
              @click='chooseWinner(player.name)'
              ) {{ player.name }}
      .flex-1.bg-green.p-6.flex.flex-col.justify-between
        span.text-2xl.uppercase.leading-7.font-semibold.text-white
          | Who was closest?
  WinnerCard(
    v-if='winners.length > 0'
    :winners='winners'
    :answerName='winners[0].name'
    :answerValue='winnerSuffix'
  )
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useGameStore } from '@/store'

import GameSlide from '@/components/base/GameSlide.vue'
import WinnerCard from '@/components/base/WinnerCard.vue'

import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'

export default {
  name: 'ChooseWinner',
  components: {
    GameSlide,
    PlayersSidebar,
    WinnerCard
  },
  props: {
    prize: {
      default: 1,
      type: Number
    },
    headerImage: {
      default: '/images/which_is_which_cover.jpg',
      type: String
    },
    winnerSuffix: {
      default: ' the winner',
      type: String
    },
    heading: {
      default: 'Pick the winner',
      string: String
    }
  },
  data () {
    return {
      winners: []
    }
  },
  computed: {
    players () {
      const players = []

      this.game.players.forEach((player) => {
        players.push(
          {
            name: player.name,
            value: player.score
          }
        )
      })

      return players
    },
    ...mapState(useGameStore, ['game'])
  },
  methods: {
    chooseWinner (playerName) {
      this.increasePlayerScore(playerName, this.prize)

      const audio = new Audio('/sounds/fanfare.mp3')
      audio.volume = 0.2
      audio.play()

      this.winners.push(playerName)
    },
    ...mapActions(useGameStore, ['increasePlayerScore'])
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
