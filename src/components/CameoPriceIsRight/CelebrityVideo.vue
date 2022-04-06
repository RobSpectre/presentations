<template lang="pug">
GameSlide
  PlayersSidebar(:players='players')
  GameContent
    template(v-slot:content)
      video.mx-auto(controls='' style='height: 1200px;')
        source(:src='video' type='video/mp4')
    template(v-slot:footer)
      h1 {{ celebrity }}
</template>

<script>
import { mapGetters } from 'vuex'

import GameSlide from '@/components/base/GameSlide.vue'
import GameContent from '@/components/base/GameContent.vue'
import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'

export default {
  name: 'CelebrityVideo',
  components: {
    PlayersSidebar,
    GameSlide,
    GameContent
  },
  props: [
    'celebrity',
    'video'
  ],
  computed: {
    ...mapGetters(['getPlayersByScore']),
    players () {
      const players = this.getPlayersByScore

      players.forEach((player) => {
        player.value = player.score
      })

      return players
    }
  },
  methods: {
    playVideo () {
      const video = this.$refs.video

      video.play()
    },
    pauseVideo () {
      const video = this.$refs.video

      video.pause()
    }
  }
}

</script>
