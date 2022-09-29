<template lang='pug'>
GameVideo(:video='video' :limit='limit' :players='players')
  template(v-slot:content)
    ChooseItemModal(
      v-if='!complete'
      :items='items'
      @guess='handleGuess'
    )
    ActionButton(
      v-else
      :label='question'
      @clicked='findWinners'
    )
  template(v-slot:footer)
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
import { mapActions, mapState } from 'pinia'
import { useGameStore } from '@/store'

import GameVideo from '@/components/base/GameVideo.vue'
import WinnerCard from '@/components/base/WinnerCard.vue'
import LoserCard from '@/components/base/LoserCard.vue'
import ActionButton from '@/components/base/ActionButton.vue'
import ChooseItemModal from '@/components/base/ChooseItemModal.vue'

export default {
  name: 'VideoChoiceRound',
  components: {
    GameVideo,
    WinnerCard,
    LoserCard,
    ActionButton,
    ChooseItemModal
  },
  props: {
    video: String,
    limit: {
      type: Number,
      default: 0
    },
    items: Array,
    winnerIndex: Number,
    prize: {
      type: Number,
      default: 1
    },
    headerImage: {
      type: String,
      default: '/images/which_is_which_cover.jpg'
    },
    question: {
      type: String,
      default: 'Find Winners'
    }
  },
  computed: {
    correctGuess () {
      return this.items[this.winnerIndex]
    },
    complete () {
      if (this.guesses.length < this.game.players.length) {
        return false
      } else {
        return true
      }
    },
    players () {
      const players = []

      this.guesses.forEach((guess) => {
        players.push(
          {
            name: guess.playerName,
            value: guess.emoji
          }
        )
      })

      return players
    },
    ...mapState(useGameStore, ['game'])
  },
  data () {
    return {
      guesses: [],
      winners: [],
      losers: []
    }
  },
  methods: {
    handleGuess (guess) {
      this.guesses.push(guess)
      this.increasePlayerIndex()
    },
    findWinners () {
      const winners = []

      this.guesses.forEach((guess) => {
        if (guess.value === this.winnerIndex) {
          this.increasePlayerScore(guess.playerName, this.prize)
          winners.push(guess.playerName)
        }
      })

      if (winners.length === 1) {
        this.guesses.forEach((guess) => {
          if (guess.playerName === winners[0]) {
            this.increasePlayerScore(winners[0], this.prize)
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

        this.losers = this.guesses.map(guess => guess.playerName)
      }

      this.increasePlayerButton()
    },
    ...mapActions(useGameStore, ['increasePlayerScore',
      'increasePlayerButton', 'increasePlayerIndex'])
  }
}
</script>
