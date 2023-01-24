<template lang='pug'>
GameSlide(:dataState='dataState')
  PlayersSidebar(:players='playersToDisplay')
  GameContent
    template(v-slot:header)
      slot(name='header')
    template(v-slot:content)
      slot(name='content')
    template(v-slot:footer)
      slot(name='footer')
</template>

<script>
import { mapGetters } from 'pinia'
import { useGameStore } from '@/store'

import GameSlide from '@/components/base/GameSlide.vue'
import GameContent from '@/components/base/GameContent.vue'
import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'

export default {
  name: 'GameContentWithSidebar',
  components: {
    GameSlide,
    PlayersSidebar,
    GameContent
  },
  props: {
    players: {
      type: Array,
      default: null
    },
    dataState: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters(useGameStore, ['getPlayersByScore']),
    playersToDisplay () {
      if (this.players === null) {
        const players = this.getPlayersByScore

        players.forEach((player) => {
          player.value = player.score
        })

        return players
      } else {
        return this.players
      }
    }
  }
}
</script>
