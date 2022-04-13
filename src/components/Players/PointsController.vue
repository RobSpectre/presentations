<template lang='pug'>
.flex.flex-col.items-center.justify-center
  .h-5.w-5.up-arrow(
    :class="darkBackground ? 'dark' : 'light'"
    v-on:click='incrementPlayerScore(playerName)'
  )
    ArrowNarrowUpIcon
  .h-5.w-5.down-arrow(
    :class="darkBackground ? 'dark' : 'light'"
    v-on:click='decrementPlayerScore(playerName)'
  )
    ArrowNarrowDownIcon
</template>

<script>
import { mapActions } from 'pinia'
import { useGameStore } from '@/store'

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
      this.increasePlayerScore(this.playerName)
    },
    decrementPlayerScore (playerName) {
      this.increasePlayerScore(this.playerName, -1)
    },
    ...mapActions(useGameStore, ['increasePlayerScore'])
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
