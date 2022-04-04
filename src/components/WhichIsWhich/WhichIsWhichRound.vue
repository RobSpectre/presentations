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
    question: String
  }
}
</script>
