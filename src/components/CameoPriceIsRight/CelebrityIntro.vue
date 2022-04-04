<template lang='pug'>
section
  .h-screen.flex.overflow-hidden
    PlayersSidebar(:players='players')
    main.flex-1.relative.z-0.overflow-y-auto.py-6(class='focus:outline-none' tabindex='0')
      .max-w-7xl.mx-auto.px-4(class='sm:px-6 md:px-8')
        .py-4.grid.grid-rows-3.grid-flow-col.gap-4
          .row-span-1.col-span-2.border-4.border-dashed.border-gray-200.rounded-lg.w-.cluse
            h3.fragment {{ hint1 }}
            h3.fragment {{ hint2 }}
            h3.fragment {{ hint3 }}
          .row-span-2.col-span-2
            img.fragment.m-0(style='margin: auto;' :src='image')
    h1.fragment {{ celebrity }}
</template>

<script>
import { mapGetters } from 'vuex'

import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'

export default {
  name: 'CelebrityIntro',
  components: {
    PlayersSidebar
  },
  props: [
    'celebrity',
    'hint1',
    'hint2',
    'hint3',
    'image'
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
