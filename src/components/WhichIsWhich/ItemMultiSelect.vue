<template lang='pug'>
GameContentWithSidebar(:players='players')
  template(v-slot:header)
    slot(name='header')
  template(v-slot:content)
    slot(name='content')
    ChooseItemModal(
      v-if='!complete'
      :items='items'
      :fragmentItemReveal='fragmentItemReveal'
      :question='question'
      :headerImage='headerImage'
      @guess='onGuess'
    )
    ActionButton(
      v-else
      label='Find Winners'
      @clicked='findWinners'
      accesskey='z'
    )
  template(v-slot:footer)
    WinnerCard(
      v-if='winners.length > 0'
      :winners='winners'
      :answerName='correctGuess'
      :answerValue='denominate(items[0].value)'
    )
    LoserCard(
      v-if='losers.length > 0'
      :losers='losers'
      :answerName='correctGuess'
      :answerValue='denominate(items[0].value)'
    )
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useGameStore } from '@/store'

import GameContentWithSidebar from '@/components/base/GameContentWithSidebar.vue'
import WinnerCard from '@/components/base/WinnerCard.vue'
import LoserCard from '@/components/base/LoserCard.vue'

import ChooseItemModal from '@/components/base/ChooseItemModal.vue'

import ActionButton from '@/components/base/ActionButton.vue'

export default {
  name: 'ItemMultiSelect',
  components: {
    GameContentWithSidebar,
    WinnerCard,
    LoserCard,
    ChooseItemModal,
    ActionButton
  },
  props: {
    items: Array,
    winnerIndice: Array,
    question: String,
    prize: {
      default: 1,
      type: Number
    },
    totalSelections: {
      default: 2,
      type: Number
    },
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
      guesses: {},
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

      for (const player in this.guesses) {
        players.push({
          name: player,
          value: this.guesses[player].items.map(x => x.emoji).toString().replace(',', ' ')
        })
      }

      return players
    },
    correctGuess () {
      return this.winnerIndice.map(x => this.items[x].name).toString().replace(',', ' and ')
    },
    ...mapState(useGameStore, ['game'])
  },
  methods: {
    onGuess (guess) {
      if (typeof this.guesses[guess.playerName] === 'undefined') {
        this.guesses[guess.playerName] = {
          items: []
        }
      }
      this.guesses[guess.playerName].items.push({
        value: guess.value,
        emoji: guess.emoji
      })

      if (this.guesses[guess.playerName].items.length >= this.totalSelections) {
        this.nextPlayer()
      }
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

      for (const player in this.guesses) {
        const correct = []

        this.guesses[player].items.forEach(item => {
          if (this.winnerIndice.includes(item.value)) {
            correct.push(item)
          }
        })

        if (correct.length === this.totalSelections) {
          winners.push(player)
          this.increasePlayerScore(player, this.prize)
        }
      }

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
