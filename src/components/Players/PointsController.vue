<template lang='pug'>
.flex.flex-col.items-center.justify-center
  .h-5.w-5(
    :class="darkBackground ? 'dark' : 'light'"
    v-on:click='incrementPlayerScore(playerName)'
  )
    ArrowNarrowUpIcon
  .h-5.w-5(
    :class="darkBackground ? 'dark' : 'light'"
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
    playerName: String,
    darkBackground: {
      type: Boolean,
      default: false
    }
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

<style lang='scss' scoped>
.dark {
  @apply text-slate-500 hover:text-slate-100;
}

.light {
  @apply text-slate-400 hover:text-slate-700;
}
</style>
