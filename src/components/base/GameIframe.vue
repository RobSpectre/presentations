<template lang='pug'>
GameSlide
  PlayersSidebar(:players='players')
  GameContent
    template(v-slot:content)
      iframe(:src='iframe')
</template>

<script>
import { mapGetters } from 'pinia'
import { useGameStore } from '@/store'

import GameSlide from '@/components/base/GameSlide.vue'
import GameContent from '@/components/base/GameContent.vue'
import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'

export default {
  name: 'GameIframe',
  components: {
    GameSlide,
    PlayersSidebar,
    GameContent
  },
  props: {
    iframe: String
  },
  computed: {
    ...mapGetters(useGameStore, ['getPlayersByScore']),
    players () {
      const players = this.getPlayersByScore

      players.forEach((player) => {
        player.value = player.score
      })

      return players
    }
  }
}
</script>
