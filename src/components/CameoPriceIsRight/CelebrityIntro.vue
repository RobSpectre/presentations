<template lang='pug'>
GameSlide
  PlayersSidebar(:players='players')
  GameContent
    template(v-slot:header)
      h3.fragment.text-white {{ hint1 }}
      h3.fragment.text-white {{ hint2 }}
      h3.fragment.text-white {{ hint3 }}
    template(v-slot:content)
      img.fragment(:src='image')
    template(v-slot:footer)
      h1.fragment {{ celebrity }}
</template>

<script>
import { mapGetters } from 'pinia'
import { useGameStore } from '@/store'

import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'
import GameSlide from '@/components/base/GameSlide.vue'
import GameContent from '@/components/base/GameContent.vue'

export default {
  name: 'CelebrityIntro',
  components: {
    PlayersSidebar,
    GameSlide,
    GameContent
  },
  props: [
    'celebrity',
    'hint1',
    'hint2',
    'hint3',
    'image'
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
