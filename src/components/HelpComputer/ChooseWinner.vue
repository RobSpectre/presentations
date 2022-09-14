<template lang="pug">
GameContentWithSidebar
  template(v-slot:content)
    .flex.flex-col.justify-center.items-center.h-screen.w-full
      .grid.grid-cols-3.gap-2
        a(
          class='hover:bg-white'
          href="#"
          v-for='image in images'
          @click.prevent.stop='chooseWinner(image)'
        )
          img(
            :src='/images/ + image.imagePath'
          )
  template(v-slot:footer)
    h5 {{ title }}
    WinnerCard(
      v-if='winners.length > 0'
      :winners='winners'
      answerName='That'
      :answerValue='congratulation'
      :headerImage='winningImage'
    )
</template>

<script>
import { mapActions } from 'pinia'
import { useGameStore } from '@/store'

import GameContentWithSidebar from '@/components/base/GameContentWithSidebar.vue'
import WinnerCard from '@/components/base/WinnerCard.vue'

export default {
  name: 'ChooseWinner',
  components: {
    GameContentWithSidebar,
    WinnerCard
  },
  props: {
    images: Array,
    title: String,
    prize: Number,
    congratulation: {
      type: String,
      default: 'a dead ringer'
    }
  },
  data () {
    return {
      winners: [],
      winningImage: null
    }
  },
  methods: {
    chooseWinner (image) {
      this.increasePlayerScore(image.playerName, this.prize)

      this.winningImage = '/images/' + image.imagePath
      this.winners.push(image.playerName)

      const audio = new Audio('/sounds/fanfare.mp3')
      audio.volume = 0.5
      audio.play()

      this.increasePlayerButton()
    },
    ...mapActions(useGameStore, ['increasePlayerScore', 'increasePlayerButton'])
  }
}
</script>
