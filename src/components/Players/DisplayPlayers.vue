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
              .mt-1(class='sm:mt-0')
                .inline-flex.items-center.p-2.rounded-full.text-4xl.text-white.font-semibold.leading-5.green
                  | {{ element.score }}
            .ml-5.flex-shrink-0
              span(v-on:click='removePlayer(element.name)')
                svg.-ml-1.mr-2.h-5.w-5.text-gray-400(fill='currentColor' viewbox='0 0 20 20')
                  path(d='M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z')
</template>

<style lang="scss" scoped>
</style>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import draggable from 'vuedraggable'

export default {
  name: 'DisplayPlayers',
  components: {
    draggable
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
    ...mapMutations(['addPlayer', 'removePlayer', 'changeAttributeOfPlayer'])
  }
}
</script>
