<template lang='pug'>
GameSlide(v-if='game.players.length > 0')
  PlayersSidebar(:players='players')
  GameContent
    template(v-slot:content)
      AudioPlayer(
        :src='src'
      )
      .relative.mt-12.mx-auto(class='w-3/5' v-if='!complete')
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
      ActionButton(
        v-if='complete == true && winners.length <= 0 && losers.length <= 0'
        label='Which is which?'
        @click='findWinners()'
      )
    template(v-slot:footer)
      WinnerCard(
        v-if='winners.length > 0'
        :winners='winners'
        :answerName='answer.name'
        :answerValue='answer.value'
      )
      LoserCard(
        v-if='losers.length > 0'
        :losers='losers'
        :answerName='answer.name'
        :answerValue='answer.value'
      )
</template>

<script>
import { mapState, mapActions } from 'pinia'

import { useGameStore } from '@/store'

import GameSlide from '@/components/base/GameSlide.vue'
import GameContent from '@/components/base/GameContent.vue'
import ActionButton from '@/components/base/ActionButton.vue'
import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'
import AudioPlayer from '@/components/AuctionEar/AudioPlayer.vue'
import WinnerCard from '@/components/base/WinnerCard.vue'
import LoserCard from '@/components/base/LoserCard.vue'

export default {
  name: 'AudioChoiceRound',
  components: {
    GameSlide,
    GameContent,
    ActionButton,
    PlayersSidebar,
    AudioPlayer,
    WinnerCard,
    LoserCard
  },
  props: {
    src: String,
    items: Array,
    winnerIndex: Number,
    prize: {
      type: Number,
      default: 1
    },
    question: {
      type: String,
      default: 'From where does the song belong?'
    },
    headerImage: {
      type: String,
      default: '/images/auctionear_header.png'
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
    answer () {
      return this.items[this.winnerIndex]
    }
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
        if (guess.item.name === this.answer.name) {
          winners.push(guess.playerName)

          this.increasePlayerScore(guess.playerName, this.prize)
        }
      })

      if (winners.length === 1) {
        this.increasePlayerScore(winners[0], this.prize)

        const audio = new Audio('/sounds/sorry_for_party_rocking.mp3')
        audio.volume = 0.5

        audio.play()

        this.winners = winners
      } else if (winners.length > 0) {
        const audio = new Audio('/sounds/fanfare.mp3')
        audio.volume = 0.5
        audio.play()

        this.winners = winners
      } else {
        const audio = new Audio('/sounds/loser_sound.mp3')
        audio.volume = 0.5
        audio.play()

        this.losers = this.players.map(player => player.name)
      }

      this.increasePlayerButton()
    },
    ...mapActions(useGameStore,
      ['increasePlayerButton',
        'increasePlayerIndex',
        'increasePlayerScore'])
  }
}
</script>
