<template lang='pug'>
GameSlide
  PlayersSidebar(:players='players')
  GameContent
    template(v-slot:header)
      h3.text-white.fragment(v-for='hint in item.hints') {{ hint }}
    template(v-slot:content)
      img.fragment(:src='item.image')
    template(v-slot:footer)
      h1.fragment {{ item.name }}
</template>

<script>
import { mapGetters } from 'vuex'

import GameSlide from '@/components/base/GameSlide.vue'
import GameContent from '@/components/base/GameContent.vue'
import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'

export default {
  name: 'ItemIntro',
  components: {
    GameSlide,
    PlayersSidebar,
    GameContent
  },
  props: [
    'item'
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
  }
}
</script>
