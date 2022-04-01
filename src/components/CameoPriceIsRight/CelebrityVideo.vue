<template lang="pug">
section
  .h-screen.flex.overflow-hidden
    PlayersSidebar(:players='players')
    main.flex-1.relative.z-0.overflow-y-auto.py-6(class='focus:outline-none' tabindex='0')
      .max-w-7xl.mx-auto.px-4(class='sm:px-6 md:px-8')
        .py-4
          video.mx-auto(controls='' style='height: 1200px;')
            source(:src='video' type='video/mp4')
  h1 {{ celebrity }}
</template>

<script>
import { mapGetters } from 'vuex'

import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'

export default {
  name: 'CelebrityVideo',
  components: {
    PlayersSidebar
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
