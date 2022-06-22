<template lang='pug'>
GameContentWithSidebar(:dataState='word')
  template(v-slot:content)
    .flex.flex-row.items-center.justify-center
      Ladder(:items='ladder')
      #board
        div(
          v-for='(row, index) in board'
          :class="[ 'row', shakeRowIndex === index && 'shake',\
                  success && currentRowIndex === index && 'jump']"
        )
          div(
            v-for='(tile, index) in row'
            :class="['tile', tile.letter && 'filled', tile.state && 'revealed']"
          )
            .front(:style='{ transitionDelay: `${index * 300}ms` }')
              | {{ tile.letter }}
            div(
              :class="['back', tile.state]"
              :style='{transitionDelay: `${index * 300}ms`,\
                      animationDelay: `${index * 100}ms`}')
              | {{ tile.letter }}
    Keyboard(
      @key="onKey"
      :letter-states="letterStates"
    )
  template(v-slot:footer)
    LoserCard(
      v-if='losers.length > 0'
      :losers='losers'
      :answerName='word'
      headerImage='/images/bird_is_the_word.gif',
      answerValue=' the word'
    )
</template>

<script>
import { useToast } from 'vue-toastification'

import { mapState, mapActions } from 'pinia'

import { useGameStore } from '@/store'

import GameContentWithSidebar from '@/components/base/GameContentWithSidebar.vue'
import LoserCard from '@/components/base/LoserCard.vue'

import Ladder from '@/components/WordleRipoff/Ladder.vue'
import Keyboard from '@/components/WordleRipoff/Keyboard.vue'

import { getWord, allWords } from '@/components/WordleRipoff/GetWord'

export default {
  name: 'WordleRipoffRound',
  components: {
    Ladder,
    Keyboard,
    GameContentWithSidebar,
    LoserCard
  },
  props: {
    prize: {
      type: Number,
      default: 1
    },
    answer: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState(useGameStore, ['game']),
    currentPlayer () {
      return this.game.players[this.game.playerIndex]
    },
    currentRow () {
      return this.board[this.currentRowIndex]
    },
    ladder () {
      const activePlayer = {
        name: this.currentPlayer.name,
        active: true
      }

      if (this.success === true) {
        const finalPlayers = this.pastPlayers

        finalPlayers[finalPlayers.length - 1].winner = true

        return finalPlayers
      } else {
        return [...this.pastPlayers, activePlayer]
      }
    },
    correctLetters () {
      return Object.keys(Object.fromEntries(Object.entries(this.letterStates).filter(item => item[1] === 'correct')))
    },
    presentLetters () {
      return Object.keys(Object.fromEntries(Object.entries(this.letterStates).filter(item => item[1] === 'present')))
    }
  },
  data () {
    return {
      letterStates: {},
      currentRowIndex: 0,
      board: [],
      message: '',
      grid: '',
      shakeRowIndex: -1,
      success: false,
      word: '',
      allowInput: true,
      pastPlayers: [],
      loopInterval: 0,
      loop: false,
      losers: []
    }
  },
  mounted () {
    'qwertyuiopasdfghjklzxcvbnm'.split('').forEach(letter => {
      this.letterStates[letter] = 0
    })

    this.board = Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({
        letter: '',
        state: 0
      }))
    )

    if (this.answer !== null) {
      this.word = this.answer
    } else {
      this.word = getWord()
    }

    this.toast = useToast()
  },
  methods: {
    onKey (key) {
      if (this.allowInput === false) {
        return
      }
      if (/^[a-zA-Z]$/.test(key)) {
        this.fillTile(key.toLowerCase())
      } else if (key === 'Backspace') {
        this.clearTile()
      } else if (key === 'Enter') {
        this.completeRow()
      }
    },
    fillTile (letter) {
      for (const tile of this.currentRow) {
        if (!tile.letter) {
          tile.letter = letter
          break
        }
      }
    },
    clearTile () {
      for (const tile of [...this.currentRow].reverse()) {
        if (tile.letter) {
          tile.letter = ''
          break
        }
      }
    },
    completeRow () {
      let presentCount = 0
      let correctCount = 0

      if (this.currentRow.every((tile) => tile.letter)) {
        const guess = this.currentRow.map((tile) => tile.letter).join('')
        if (!allWords.includes(guess) && guess !== this.word) {
          this.shake()

          this.toast.error('Not in word list', { timeout: 2500 })

          return
        }
        const answerLetters = this.word.split('')
        // first pass: mark correct ones
        this.currentRow.forEach((tile, i) => {
          if (answerLetters[i] === tile.letter) {
            if (!this.correctLetters.includes(tile.letter)) {
              correctCount++
            }

            tile.state = this.letterStates[tile.letter] = 'correct'
            answerLetters[i] = null
          }
        })
        // second pass: mark the present
        this.currentRow.forEach((tile) => {
          if (!tile.state && answerLetters.includes(tile.letter)) {
            if (!this.presentLetters.includes(tile.letter)) {
              presentCount++
            }

            tile.state = 'present'
            answerLetters[answerLetters.indexOf(tile.letter)] = null
            if (!this.letterStates[tile.letter]) {
              this.letterStates[tile.letter] = 'present'
            }
          }
        })
        // 3rd pass: mark absent
        this.currentRow.forEach((tile) => {
          if (!tile.state) {
            tile.state = 'absent'
            if (!this.letterStates[tile.letter]) {
              this.letterStates[tile.letter] = 'absent'
            }
          }
        })

        this.allowInput = false

        if (this.currentRow.every((tile) => tile.state === 'correct')) {
          // yay!
          setTimeout(() => {
            this.success = true
            this.toast.success(this.currentPlayer.name + ' is the winner!')

            const totalScore = ((correctCount * this.prize) * 2) + (this.prize * 5)

            this.increasePlayerScore(this.currentPlayer.name, totalScore)

            const audio = new Audio('/sounds/fanfare.mp3')
            audio.volume = 0.5
            audio.play()

            this.pushPlayerToHistory()

            this.increasePlayerButton()
          }, 1600)
        } else if (this.currentRowIndex < this.board.length - 1) {
          // go the next row
          setTimeout(() => {
            this.currentRowIndex++

            this.awardPoints(this.currentPlayer.name, presentCount, correctCount)

            this.pushPlayerToHistory()

            this.increasePlayerIndex()

            this.allowInput = true
          }, 1600)
        } else {
          // game over :(
          setTimeout(() => {
            const audio = new Audio('/sounds/surfin_bird_loss.mp3')
            audio.volume = 0.5
            audio.play()

            this.losers = this.game.players.map(player => player.name)

            this.increasePlayerButton()
          }, 1600)
        }
      } else {
        this.shake()
        this.toast.error('Not enough letters', { timeout: 2500 })
      }
    },
    pushPlayerToHistory () {
      const lastPlayer = {
        name: this.currentPlayer.name,
        active: false
      }

      this.pastPlayers.push(lastPlayer)
    },
    loopSound (soundFile) {
      this.loopInterval--

      console.log(this.loopInterval)

      if (this.loopInterval <= 0) {
        clearInterval(this.loop)
      }

      const audio = new Audio(soundFile)
      audio.volume = 0.3
      audio.play()
    },
    awardPoints (playerName, presentCount, correctCount) {
      const totalScore = (presentCount * this.prize) + ((correctCount * this.prize) * 2)

      if (totalScore > 0) {
        this.increasePlayerScore(playerName, totalScore)

        this.loopInterval = totalScore

        this.loop = setInterval(() => this.loopSound('/sounds/sonic_ring.mp3'), 150)
      } else {
        const audio = new Audio('/sounds/wrong_sound.mp3')
        audio.play()
      }
    },
    shake () {
      this.shakeRowIndex = this.currentRowIndex
      setTimeout(() => {
        this.shakeRowIndex = -1
      }, 1000)
    },
    ...mapActions(useGameStore,
      ['increasePlayerButton',
        'increasePlayerIndex',
        'increasePlayerScore'])
  }
}
</script>

<style scoped>
#board .correct,
#board .present,
#board .absent {
  color: #fff !important;
}

#board .correct {
  background-color: #6aaa64 !important;
}

#board .present {
  background-color: #c9b458 !important;
}

#board .absent {
  background-color: #787c7e !important;
}

#board {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  --height: min(1200px, calc(var(--vh, 100vh) - 310px));
  height: var(--height);
  width: min(650px, calc(var(--height) / 6 * 5));
  margin: 0;
}

#board .row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
}

#board .tile {
  width: 100%;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  vertical-align: middle;
  text-transform: uppercase;
  user-select: none;
  position: relative;
}

#board .tile.filled {
  animation: zoom 0.2s;
}

#board .tile .front,
#board .tile .back {
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

#board .tile .front {
  border: 2px solid #d3d6da;
}

#board .tile.filled .front {
  border-color: #999;
}

#board .tile .back {
  transform: rotateX(180deg);
}

#board .tile.revealed .front {
  transform: rotateX(180deg);
}

#board .tile.revealed .back {
  transform: rotateX(0deg);
}

@keyframes zoom {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

#board .shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0% {
    transform: translate(1px);
  }
  10% {
    transform: translate(-2px);
  }
  20% {
    transform: translate(2px);
  }
  30% {
    transform: translate(-2px);
  }
  40% {
    transform: translate(2px);
  }
  50% {
    transform: translate(-2px);
  }
  60% {
    transform: translate(2px);
  }
  70% {
    transform: translate(-2px);
  }
  80% {
    transform: translate(2px);
  }
  90% {
    transform: translate(-2px);
  }
  100% {
    transform: translate(1px);
  }
}

#board .jump .tile .back {
  animation: jump 0.5s;
}

@keyframes jump {
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(5px);
  }
  60% {
    transform: translateY(-25px);
  }
  90% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(0px);
  }
}

@media (max-height: 680px) {
  .tile {
    font-size: 3vh;
  }
}
</style>
