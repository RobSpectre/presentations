<template lang='pug'>
GameVideo(:video='video' :limit='limit')
Wager(:items='items' @bet='handleBet')
GameVideo(:video='video')
  template(v-slot:footer)
    ActionButton(
      label='Pay Out'
      @clicked='payOut'
      accesskey='z'
    )
    WinnerCard(
      v-if='winners.length > 0'
      :winners='winners'
      :answerName='correctGuess.name'
      answerValue='this video'
    )
    LoserCard(
      v-if='losers.length > 0'
      :losers='losers'
      :answerName='correctGuess.name'
      answerValue='this video'
    )
</template>

<script>
import { mapActions } from 'pinia'
import { useGameStore } from '@/store'

import GameVideo from '@/components/base/GameVideo.vue'
import WinnerCard from '@/components/base/WinnerCard.vue'
import LoserCard from '@/components/base/LoserCard.vue'
import ActionButton from '@/components/base/ActionButton.vue'

import Wager from '@/components/Wager/Wager.vue'

export default {
  name: 'VideoWagerRound',
  components: {
    GameVideo,
    Wager,
    WinnerCard,
    LoserCard,
    ActionButton
  },
  props: {
    video: String,
    limit: {
      type: Number,
      default: 0
    },
    items: Array,
    winnerIndex: Number
  },
  computed: {
    correctGuess () {
      return this.items[this.winnerIndex]
    }
  },
  data () {
    return {
      bets: [],
      winners: [],
      losers: []
    }
  },
  methods: {
    handleBet (bet) {
      this.bets.push(bet)
    },
    payOut (bet) {
      const winners = []

      this.bets.forEach((bet) => {
        if (bet.guess.name === this.items[this.winnerIndex].name) {
          this.increasePlayerScore(bet.name, bet.wager)
          winners.push(bet.name)
        } else {
          this.increasePlayerScore(bet.name, -bet.wager)
        }
      })

      if (winners.length === 1) {
        this.bets.forEach((bet) => {
          if (bet.name === winners[0]) {
            this.increasePlayerScore(winners[0], bet.wager)
          }
        })

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

        this.losers = this.bets.map(bet => bet.name)
      }

      this.increasePlayerButton()
    },
    ...mapActions(useGameStore, ['increasePlayerScore',
      'increasePlayerButton'])
  }
}
</script>
