<template lang="pug">
.bg-white.shadow.overflow-hidden.mt-5.mx-20(class='sm:rounded-md' v-if='players.length > 0')
  .bg-green.px-2.py-2.border-b.border-gray-200(class='sm:px-6')
    .-ml-2.-mt-1.flex.items-center.justify-between.flex-wrap(class='sm:flex-no-wrap')
      .ml-2.mt-1
        span.reset-this.text-lg.leading-6.font-semibold.text-white
          | Players
  draggable(v-model='players' item-key='index')
    template(v-slot:item='{ element }')
      span.transition.duration-150.ease-in-out(class='hover:bg-gray-50 focus:outline-none focus:bg-gray-50')
        .bg-white
          .px-6.py-6.flex.items-center
            .flex-1(class='sm:flex sm:items-center sm:justify-between')
              .text-5xl.leading-5.font-medium
                | {{ element.name }}
              .flex.flex-row.mt-1(class='sm:mt-0')
                .flex.flex-col.items-center.justify-center
                  .h-5.w-5.text-slate-400(
                      class='hover:text-slate-700'
                      v-on:click='incrementPlayerScore(element.name)'
                    )
                    ArrowNarrowUpIcon
                  .h-5.w-5.text-slate-400(
                      class='hover:text-slate-700'
                      v-on:click='decrementPlayerScore(element.name)'
                    )
                    ArrowNarrowDownIcon
                .inline-flex.items-center.px-2.py-4.rounded-full.text-4xl.text-white.font-semibold.leading-5.green
                  | {{ element.score }}
            .ml-5.flex-shrink-0
              div(v-on:click='removePlayer(element.name)')
                TrashIcon.h-10.w-10.text-slate-400(class='hover:text-slate-700')
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import { TrashIcon, ArrowNarrowUpIcon, ArrowNarrowDownIcon } from '@heroicons/vue/solid'

import draggable from 'vuedraggable'

export default {
  name: 'DisplayPlayers',
  components: {
    draggable,
    TrashIcon,
    ArrowNarrowUpIcon,
    ArrowNarrowDownIcon
  },
  computed: {
    ...mapState(['game']),
    ...mapGetters(['getPlayersByScore']),
    players: {
      get () {
        return this.getPlayersByScore
      },
      set (value) {
        this.movePlayer(value)
      }
    }
  },
  methods: {
    movePlayer (event) {
      if (event) {
        if (event.addedIndex) {
          this.removePlayer(event.payload.name)

          this.addPlayer({
            name: event.payload.name,
            index: event.addedIndex
          })
        }
      }
    },
    getChildPayload (playerIndex) {
      var player = this.game.players[playerIndex]
      return player
    },
    incrementPlayerScore (playerName) {
      this.increasePlayerScore({
        playerName: playerName,
        value: 1
      })
    },
    decrementPlayerScore (playerName) {
      this.increasePlayerScore({
        playerName: playerName,
        value: -1
      })
    },
    ...mapMutations([
      'addPlayer',
      'removePlayer',
      'changeAttributeOfPlayer',
      'increasePlayerScore'
    ])
  }
}
</script>
