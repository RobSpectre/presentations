<template lang='pug'>
.flex.flex-col.items-center.justify-center
  .h-5.w-5.text-slate-400(
      class='hover:text-slate-700'
      v-on:click='incrementPlayerScore(playerName)'
    )
    ArrowNarrowUpIcon
  .h-5.w-5.text-slate-400(
      class='hover:text-slate-700'
      v-on:click='decrementPlayerScore(playerName)'
    )
    ArrowNarrowDownIcon
</template>

<script>
import { mapMutations } from 'vuex'

import { ArrowNarrowUpIcon, ArrowNarrowDownIcon } from '@heroicons/vue/solid'

export default {
  name: 'PointsController',
  components: {
    ArrowNarrowUpIcon,
    ArrowNarrowDownIcon
  },
  props: {
    playerName: String
  },
  methods: {
    incrementPlayerScore (playerName) {
      this.increasePlayerScore({
        playerName: this.playerName,
        value: 1
      })
    },
    decrementPlayerScore (playerName) {
      this.increasePlayerScore({
        playerName: this.playerName,
        value: -1
      })
    },
    ...mapMutations(['increasePlayerScore'])
  }
}
</script>
