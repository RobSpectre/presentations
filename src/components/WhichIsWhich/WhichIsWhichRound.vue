<template lang='pug'>
ItemIntro(
  v-for='item in items'
  :item='item'
)
ItemGuess(
  :items='items'
  :winnerIndex='winnerIndex'
  :prize='prize'
  :question='question'
  :headerImage='headerImage'
)
</template>

<script>
import ItemIntro from './ItemIntro.vue'
import ItemGuess from './ItemGuess.vue'

export default {
  name: 'WhichIsWhichRound',
  components: {
    ItemIntro,
    ItemGuess
  },
  props: {
    items: Array,
    winnerIndex: Number,
    prize: Number,
    question: String,
    headerImage: {
      default: '/images/which_is_which_cover.jpg',
      type: String
    }
  }
}
</script>
