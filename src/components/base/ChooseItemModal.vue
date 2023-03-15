<template lang="pug">
.relative.mt-12.mx-auto(class='w-3/5')
  .flex.flex-col.mx-32.rounded-lg.shadow-lg.overflow-hidden.text-left
    .flex-shrink-0(v-if='headerImage.length > 0')
      img.m-0.w-full.clear-reveal.object-cover(:src='headerImage' alt='')
    .flex-1.bg-white.p-6.flex.flex-col.justify-between
      .flex-1
        slot(name='interstitial')
        span.block.text-lg.leading-7.font-semibold.text-gray-900.uppercase
        | {{ question }}
        .my-2.text-center.flex.flex-col
          button.actionButton(
            v-for='(item, index) in items'
            @click='guessItem(currentPlayer, index)'
            :class='{ fragment: fragmentItemReveal }'
            ) {{ item.name }} {{ item.emoji }}
    .flex-1.bg-green.p-6.flex.flex-col.justify-between
      span.text-2xl.uppercase.leading-7.font-semibold.text-white(
        v-if="selectedPlayer === ''"
      )
        | {{ currentPlayer }}
      span.text-2xl.uppercase.leading-7.font-semibold.text-white(
        v-else
      )
        | {{ selectedPlayer }}
</template>

<script>
import { mapState } from 'pinia'

import { useGameStore } from '@/store'

import ActionButton from '@/components/base/ActionButton.vue'

export default {
  name: 'ChooseItemModal',
  components: {
    ActionButton
  },
  props: {
    headerImage: {
      type: String,
      default: ''
    },
    question: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default () {
        return [
          { name: 'Right', emoji: '👍️' },
          { name: 'Wrong', emoji: '👎️' }
        ]
      }
    },
    fragmentItemReveal: {
      type: Boolean,
      default: false
    },
    selectedPlayer: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(useGameStore, ['game']),
    currentPlayer () {
      if (this.game.players.length > 0) {
        return this.game.players[this.game.playerIndex].name
      } else {
        return ''
      }
    }
  },
  methods: {
    guessItem (playerName, index) {
      this.$emit('guess', { playerName: playerName, value: index, emoji: this.items[index].emoji })
    }
  }
}
</script>
