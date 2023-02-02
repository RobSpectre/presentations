<template lang="pug">
GameContentWithSidebar(:players='players')
  template(v-slot:content)
    ChooseItemModal(
      :items='playerItems'
      :fragmentItemReveal='fragmentItemReveal'
      :question='question'
      :headerImage='headerImage'
      @guess='pickWinner'
      :selectedPlayer='null'
    )
</template>

<script>
import { mapActions, mapGetters, mapState } from 'pinia'
import { useGameStore } from '@/store'

import GameContentWithSidebar from '@/components/base/GameContentWithSidebar.vue'
import ChooseItemModal from '@/components/base/ChooseItemModal.vue'

export default {
  name: 'Scoreboard',
  components: {
    GameContentWithSidebar,
    ChooseItemModal
  },
  props: {
    question: String,
    prize: {
      default: 1,
      type: Number
    },
    headerImage: {
      default: '/images/scoreboard.avif',
      type: String
    },
    fragmentItemReveal: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    players () {
      const players = []

      this.getPlayersByScore.forEach((player) => {
        players.push({
          name: player.name,
          value: player.score
        })
      })

      return players
    },
    playerItems () {
      const players = []

      this.game.players.forEach((player) => {
        players.push({
          name: player.name,
          value: player.name,
          emoji: ''
        })
      })

      return players
    },
    ...mapState(useGameStore, ['game']),
    ...mapGetters(useGameStore, ['getPlayersByScore'])
  },
  methods: {
    pickWinner (guess) {
      this.increasePlayerScore(this.playerItems[guess.value].name, this.prize)

      const audio = new Audio('/sounds/sonic_ring.mp3')
      audio.volume = 0.2
      audio.play()
    },
    ...mapActions(useGameStore, ['increasePlayerScore'])
  }
}
</script>
