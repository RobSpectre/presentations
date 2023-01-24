<template lang="pug">
ItemGuess(
  v-for='round in rounds'
  :items='round.items'
  :winnerIndex='round.winnerIndex'
  :prize='prize'
  :question='question'
  :denomination='denomination'
  :headerImage='headerImage'
  :fragmentItemReveal='fragmentItemReveal'
)
</template>

<script>
import ItemGuess from '@/components/WhichIsWhich/ItemGuess.vue'

export default {
  name: 'RandomTriviaRound',
  components: {
    ItemGuess
  },
  props: {
    wrongAnswers: Array,
    rightAnswers: Array,
    question: String,
    answersLength: {
      type: Number,
      default: 3
    },
    prize: {
      type: Number,
      default: 1
    },
    denomination: {
      default: '$',
      type: String
    },
    headerImage: {
      default: '/images/which_is_which_cover.jpg',
      type: String
    },
    fragmentItemReveal: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rounds () {
      const rounds = []
      const shuffledRightAnswers = this.shuffle(this.rightAnswers)
      const shuffledWrongAnswers = this.shuffle(this.wrongAnswers)
      const roundTotal = Math.floor(
        (this.rightAnswers.length + this.wrongAnswers.length) / this.answersLength
      )

      for (let i = 0; i < roundTotal; i++) {
        const round = {
          items: [],
          winnerIndex: 0
        }

        round.winnerIndex = this.getRandomInt(this.answersLength)

        for (let x = 0; x < this.answersLength; x++) {
          if (x === round.winnerIndex) {
            round.items.push(shuffledRightAnswers.pop())
          } else {
            round.items.push(shuffledWrongAnswers.pop())
          }
        }

        rounds.push(round)
      }

      return rounds
    }
  },
  methods: {
    shuffle (array) {
      let currentIndex = array.length; let randomIndex

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]]
      }

      return array
    },
    getRandomInt (max) {
      return Math.floor(Math.random() * max)
    }
  }
}
</script>
