<template lang="pug">
GameSlide
  PlayersSidebar(:players='players')
  GameContent
    template(v-slot:content)
      .flex.h-screen.items-center.justify-center
        video(controls='')
          source(:src='videoSource' :type='videoType')
    template(v-slot:footer)
      h1(v-if='title') {{ title }}
      slot(name='footer')
</template>

<script>
import { mapGetters } from 'pinia'
import { useGameStore } from '@/store'

import GameSlide from '@/components/base/GameSlide.vue'
import GameContent from '@/components/base/GameContent.vue'
import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'

export default {
  name: 'GameVideo',
  components: {
    PlayersSidebar,
    GameSlide,
    GameContent
  },
  props: {
    title: String,
    video: String,
    videoType: {
      type: String,
      default: 'video/mp4'
    },
    limit: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(useGameStore, ['getPlayersByScore']),
    players () {
      const players = this.getPlayersByScore

      players.forEach((player) => {
        player.value = player.score
      })

      return players
    },
    videoSource () {
      if (this.limit > 0) {
        return this.video + '#t=0,' + this.limit
      } else {
        return this.video
      }
    }
  }
}

</script>
