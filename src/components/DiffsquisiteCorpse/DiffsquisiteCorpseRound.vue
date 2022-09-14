<template lang="pug">
GenerateCorpse(
  v-for='player in getPlayersFromButton'
  :playerName='player.name'
  :hints='hints'
  :currentPrompt='prompt'
  @imageGenerated='handleImageGenerated'
)
ChooseWinner(
  :images='images'
  :title='prompt'
  :prize='prize'
  congratulation='That is the funniest corpse'
)
</template>

<script>
import ChooseWinner from '@/components/HelpComputer/ChooseWinner.vue'
import GenerateCorpse from '@/components/DiffsquisiteCorpse/GenerateCorpse.vue'

import { mapGetters } from 'pinia'
import { useGameStore } from '@/store'

export default {
  name: 'DiffsquisiteCorpseRound',
  components: {
    ChooseWinner,
    GenerateCorpse
  },
  props: {
    hints: Array,
    prize: {
      type: Number,
      default: 1
    }
  },
  computed: {
    ...mapGetters(useGameStore, ['getPlayersFromButton'])
  },
  data () {
    return {
      images: [],
      winner: null,
      prompt: '',
      completed: false
    }
  },
  methods: {
    handleImageGenerated (event) {
      this.images.push(event)

      this.prompt = event.prompt
    }
  }
}
</script>
