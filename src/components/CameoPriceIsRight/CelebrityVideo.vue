<template lang="pug">
GameVideo(
  :video='video'
)
  template(v-slot:footer)
    h1 {{ celebrity }}
</template>

<script>
import { mapGetters } from 'pinia'
import { useGameStore } from '@/store'

import GameSlide from '@/components/base/GameSlide.vue'
import GameVideo from '@/components/base/GameVideo.vue'
import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'

export default {
  name: 'CelebrityVideo',
  components: {
    PlayersSidebar,
    GameSlide,
    GameVideo
  },
  props: [
    'celebrity',
    'video'
  ],
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
