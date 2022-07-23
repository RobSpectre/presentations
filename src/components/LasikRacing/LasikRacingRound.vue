<template lang="pug">
GameContentWithSidebar
  template(v-slot:content)
    .flex.items-center.justify-center
      img#prompt.h-96(
        :src='src'
        v-bind:style='{ filter: blurValue }'
      )
    ChooseItemModal(
      v-if='!complete'
      @guess='onGuess'
    )
  template(v-slot:footer)
    WinnerCard(
      v-if='winners.length > 0'
      :winners='winners'
      :answerName='answer.name'
      :answerValue='answer.value'
      :headerImage='src'
      :constrainHeaderImage='false'
    )
    LoserCard(
      v-if='losers.length > 0'
      :losers='losers'
      :answerName='answer.name'
      :answerValue='answer.value'
      :headerImage='src'
      :constrainHeaderImage='false'
    )
</template>

<script>
import { mapState, mapActions } from 'pinia'

import { useGameStore } from '@/store'

import GameContentWithSidebar from '@/components/base/GameContentWithSidebar.vue'
import ChooseItemModal from '@/components/base/ChooseItemModal.vue'
import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'
import WinnerCard from '@/components/base/WinnerCard.vue'
import LoserCard from '@/components/base/LoserCard.vue'

export default {
  name: 'LasikRacingRound',
  components: {
    GameContentWithSidebar,
    ChooseItemModal,
    PlayersSidebar,
    WinnerCard,
    LoserCard
  },
  props: {
    src: String,
    correctIndex: {
      type: Number,
      default: 0
    },
    prize: {
      type: Number,
      default: 1
    },
    headerImage: {
      type: String,
      default: '/images/maz_kanata_banner.png'
    },
    answer: {
      type: Object,
      default () {
        return { name: 'That', value: 'correct' }
      }
    },
    initialBlur: {
      type: Number,
      default: 48
    }
  },
  data () {
    return {
      guesses: [],
      complete: false,
      winners: [],
      losers: [],
      currentBlur: this.initialBlur
    }
  },
  computed: {
    ...mapState(useGameStore, ['game']),
    blurValue () {
      return 'blur(' + this.currentBlur + 'px)'
    },
    blurReduceValue () {
      return this.initialBlur / this.game.players.length
    }
  },
  methods: {
    onGuess (guess) {
      if (guess.value === this.correctIndex) {
        this.increasePlayerScore(guess.playerName, this.prize)

        this.complete = true

        this.winners.push(guess.playerName)

        const audio = new Audio('/sounds/fanfare.mp3')
        audio.volume = 0.5
        audio.play()

        this.increasePlayerButton()
      } else {
        const audio = new Audio('/sounds/wrong_sound.mp3')
        audio.volume = 0.5
        audio.play()

        this.currentBlur = this.currentBlur - this.blurReduceValue

        this.nextPlayer()
      }
    },
    nextPlayer () {
      this.increasePlayerIndex()

      if (this.game.playerIndex === this.game.playerButton) {
        const audio = new Audio('/sounds/loser_sound.mp3')
        audio.volume = 0.5
        audio.play()

        this.complete = true

        this.losers = this.game.players.map(player => player.name)

        this.increasePlayerButton()
      }
    },
    ...mapActions(useGameStore,
      ['increasePlayerButton',
        'increasePlayerIndex',
        'increasePlayerScore'])
  }
}
</script>
