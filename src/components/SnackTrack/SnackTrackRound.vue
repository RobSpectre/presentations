<template lang='pug'>
GameSlide(v-if='game.players.length > 0')
  PlayersSidebar(:players='players')
  GameContent
    template(v-slot:header)
      AudioPlayer(
        :src='src'
        :key='src'
      )
    template(v-slot:content)
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
                  @click='checkAnswer(currentPlayer, index)'
                  :class='{ fragment: fragmentItemReveal }'
                  ) {{ item.name }} {{ item.emoji }}
          .flex-1.bg-green.p-6.flex.flex-col.justify-between
            span.text-2xl.uppercase.leading-7.font-semibold.text-white
              | {{ currentPlayer }}
    template(v-slot:footer)
      WinnerCard(
        v-if='winners.length > 0'
        :winners='winners'
        answerName='The song'
        :answerValue='answer'
      )
      LoserCard(
        v-if='losers.length > 0'
        :losers='losers'
        answerName='The song'
        :answerValue='answer'
      )
</template>

<script>
import { mapState, mapActions, mapGetters } from 'pinia'

import { useGameStore } from '@/store'

import GameSlide from '@/components/base/GameSlide.vue'
import GameContent from '@/components/base/GameContent.vue'
import ActionButton from '@/components/base/ActionButton.vue'
import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'
import AudioPlayer from '@/components/AuctionEar/AudioPlayer.vue'
import WinnerCard from '@/components/base/WinnerCard.vue'
import LoserCard from '@/components/base/LoserCard.vue'

export default {
  name: 'SnackTrackRound',
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
    tracks: Array,
    items: Array,
    winnerIndex: Number,
    answer: String,
    prize: {
      type: Number,
      default: 1
    },
    question: {
      type: String,
      default: 'What is the song?'
    },
    headerImage: {
      type: String,
      default: '/images/snack_track_header.png'
    },
    fragmentItemReveal: {
      default: false,
      type: Boolean
    },
    playerOrder: {
      type: String,
      default: 'highestScoreFirst'
    }
  },
  data () {
    return {
      trackIndex: 0,
      playerIndex: 0,
      complete: false,
      winners: [],
      losers: []
    }
  },
  computed: {
    ...mapState(useGameStore, ['game']),
    ...mapGetters(useGameStore, ['getPlayersByScore', 'getPlayersFromButton']),
    src () {
      return this.tracks[this.trackIndex]
    },
    currentPlayer () {
      if (this.players.length > 0) {
        return this.players[this.playerIndex].name
      } else {
        return ''
      }
    },
    players () {
      const players = []

      if (this.playerOrder === 'lowestScoreFirst') {
        const reversedPlayers = this.getPlayersByScore.revese()

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
    }
  },
  methods: {
    nextPlayer () {
      this.playerIndex++

      if (this.playerIndex >= this.players.length) {
        this.playerIndex = 0
      }

      this.trackIndex++

      if (this.trackIndex >= this.tracks.length) {
        this.complete = true

        const audio = new Audio('/sounds/loser_sound.mp3')
        audio.volume = 0.5
        audio.play()

        this.losers = this.players.map(player => player.name)

        this.increasePlayerButton()
      }
    },
    checkAnswer (playerName, itemIndex) {
      if (itemIndex === this.winnerIndex) {
        this.complete = true

        if (this.trackIndex === 0) {
          this.increasePlayerScore(playerName, this.prize * 2)
        } else {
          this.increasePlayerScore(playerName, this.prize)
        }

        if (this.trackIndex >= this.tracks.length - 1) {
          const audio = new Audio('/sounds/fanfare.mp3')
          audio.volume = 0.5
          audio.play()
        } else {
          const audio = new Audio(this.tracks[this.tracks.length - 1])
          audio.volume = 0.5
          audio.play()
        }

        this.winners.push(playerName)

        this.increasePlayerButton()
      } else {
        const audio = new Audio('/sounds/wrong_sound.mp3')
        audio.volume = 0.5
        audio.play()

        this.nextPlayer()
      }
    },
    ...mapActions(useGameStore,
      ['increasePlayerButton',
        'increasePlayerIndex',
        'increasePlayerScore'])
  }
}
</script>
