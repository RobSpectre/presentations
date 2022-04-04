<template lang='pug'>
GameSlide
  PlayersSidebar(:players='players')
  .flex.flex-grow.overflow-y-auto(class='focus:outline-none' tabindex='0')
    .flex-col.items-center.w-full
      .flex-none.bg-blue
        h3.text-white.fragment(v-for='hint in item.hints') {{ hint }}
      .flex.flex-initial.items-center.justify-center
          img.fragment(:src='item.image')
    h1.fragment {{ item.name }}
</template>

<script>
import { mapGetters } from 'vuex'

import GameSlide from '@/components/base/GameSlide.vue'
import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'

export default {
  name: 'ItemIntro',
  components: {
    GameSlide,
    PlayersSidebar
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
