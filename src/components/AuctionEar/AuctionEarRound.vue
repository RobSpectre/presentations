<template lang='pug'>
GameContentWithSidebar(v-if='game.players.length > 0')
  template(v-slot:content)
    .flex.flex-initial.grid.grid-cols-3.gap-4.p-4.w-full
      .col-span-3
        AudioPlayer(
          :src='src'
          :chunks='chunks',
          :chunkIndex='chunkIndex'
          :chunkEvenly='chunkEvenly'
        )
      .flex.flex-col
        Ladder(
          :items='bids'
          :ascending='false'
        )
        .pt-2
          CounterBox(
            label='Pot Total'
            :counter='prizeValue'
          )
      .col-span-2.flex.grow.flex-col
        AuctionEarBid(
          v-if="phase === 'bid'"
          :currentPlayer='currentPlayer'
          :image='image'
          @output='handleBid'
        )
        AuctionEarGuess(
         v-if="phase === 'guess'"
         :currentPlayer='currentGuesser'
         :image='image'
         :items='items'
         @guess='handleGuess'
         )
    WinnerCard(
      v-if='winners.length > 0'
      :winners='winners'
      :answerName='answer'
      answerValue='the song'
    )
    LoserCard(
      v-if='losers.length > 0'
      :losers='losers'
      :answerName='answer'
      answerValue='the song'
    )
</template>

<script>
import { mapState, mapActions, mapGetters } from 'pinia'

import { useGameStore } from '@/store'

import GameContentWithSidebar from '@/components/base/GameContentWithSidebar.vue'
import ActionButton from '@/components/base/ActionButton.vue'
import AudioPlayer from '@/components/AuctionEar/AudioPlayer.vue'
import Ladder from '@/components/AuctionEar/Ladder.vue'
import AuctionEarBid from '@/components/AuctionEar/AuctionEarBid.vue'
import AuctionEarGuess from '@/components/AuctionEar/AuctionEarGuess.vue'
import WinnerCard from '@/components/base/WinnerCard.vue'
import LoserCard from '@/components/base/LoserCard.vue'
import CounterBox from '@/components/base/CounterBox.vue'

export default {
  name: 'AuctionEarRound',
  components: {
    GameContentWithSidebar,
    ActionButton,
    AudioPlayer,
    Ladder,
    AuctionEarBid,
    AuctionEarGuess,
    WinnerCard,
    LoserCard,
    CounterBox
  },
  props: {
    src: String,
    answer: String,
    chunks: {
      type: Number,
      default: 5
    },
    ascending: {
      type: Boolean,
      default: true
    },
    awardTotalPot: {
      type: Boolean,
      default: false
    },
    chunkEvenly: {
      type: Boolean,
      default: false
    },
    gameType: {
      type: String,
      default: 'bidPerChunk'
    },
    image: {
      type: String,
      default: '/images/auctionear_header.png'
    }
  },
  data () {
    return {
      bids: [],
      phases: ['bid', 'guess'],
      phaseIndex: 0,
      chunkIndex: 0,
      guessIndex: 0,
      complete: false,
      prizeValue: 0,
      items: [
        { name: 'Right', emoji: '🎊️' },
        { name: 'Wrong', emoji: '👎️' }
      ],
      winners: [],
      losers: []
    }
  },
  computed: {
    ...mapState(useGameStore, ['game']),
    ...mapGetters(useGameStore, ['getPlayer']),
    currentPlayer () {
      return this.game.players[this.game.playerIndex]
    },
    currentGuesser () {
      return this.getPlayer(this.bids[this.guessIndex].name)
    },
    phase () {
      return this.phases[this.phaseIndex]
    }
  },
  methods: {
    orderedBids () {
      const ordered = []

      this.bids.forEach((bid) => {
        ordered.push(bid)
      })

      if (this.ascending === false) {
        return ordered.sort((a, b) => a.value - b.value).reverse()
      } else {
        return ordered.sort((a, b) => a.value - b.value)
      }
    },
    handleBid (event) {
      this.bids.push({
        name: event.player.name,
        value: parseInt(event.value)
      })

      this.nextPlayer()
    },
    handleGuess (event) {
      if (event.value === 0) {
        this.awardWinner(event.player.name)
      } else {
        this.increasePlayerScore(event.player.name, -this.bids[this.guessIndex].value)

        this.prizeValue = this.prizeValue + this.bids[this.guessIndex].value
        this.bids[this.guessIndex].value = 0

        const audio = new Audio('/sounds/wrong_sound.mp3')
        audio.volume = 0.2
        audio.play()

        this.nextGuess()
      }
    },
    nextPlayer () {
      this.increasePlayerIndex()

      if (this.game.playerIndex === this.game.playerButton) {
        this.phaseIndex++
        this.bids = this.orderedBids()
        this.bids[this.guessIndex].active = true
      }
    },
    nextChunk () {
      this.chunkIndex++

      if (this.gameType === 'bidPerChunk') {
        this.phaseIndex = 0
        this.guessIndex = 0
        this.bids = []

        this.increasePlayerButton()
      }

      if (this.chunkIndex >= this.chunks) {
        this.complete = true

        this.awardLosers()
      }
    },
    nextGuess () {
      if (this.bids[this.guessIndex + 1] === undefined) {
        this.guessIndex = 0
        this.phaseIndex++
      } else {
        this.guessIndex++
        this.bids[this.guessIndex].active = true
      }

      if (this.gameType === 'bidForChunk') {
        this.nextChunk()
      } else if (this.phases[this.phaseIndex] === undefined) {
        this.nextChunk()
      }
    },
    awardWinner (playerName) {
      this.increasePlayerScore(playerName, this.bids[this.guessIndex].value)

      if (this.awardTotalPot === true) {
        this.increasePlayerScore(playerName, -this.bids[this.guessIndex].value)

        const bidValues = this.bids.map(bid => bid.value)

        const bidSum = bidValues.reduce((partialSum, a) => partialSum + a, 0)

        this.increasePlayerScore(playerName, this.prizeValue + bidSum)
      } else {
        this.increasePlayerScore(playerName, this.prizeValue)
      }

      const audio = new Audio(this.src)
      audio.volume = 0.5
      audio.play()

      this.winners.push(playerName)

      this.complete = true

      this.increasePlayerButton()
    },
    awardLosers () {
      const audio = new Audio('/sounds/loser_sound.mp3')
      audio.volume = 0.2
      audio.play()

      this.losers = this.game.players.map(player => player.name)

      this.increasePlayerButton()
    },
    ...mapActions(useGameStore,
      ['increasePlayerButton',
        'increasePlayerIndex',
        'increasePlayerScore'])
  }
}
</script>
