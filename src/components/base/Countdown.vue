<template lang='pug'>
.flex.flex-none.text-center.items-center.justify-center
  CounterBox(
    :counter='timeRemaining'
    :label='label'
  )
    template(v-slot:footer)
      .flex.flex-row.bg-darkgray.rounded-b-lg
        .flex-none
          button(
            @click='resetTimer'
          )
            RefreshIcon(
              class='w-12 h-12 text-stone-200 hover:text-white'
            )

        .flex-grow
          button(
            @click='toggleCountdown'
          )
            PlayIcon(
              v-if='!playing'
              class='w-12 h-12 text-stone-200 hover:text-white'
            )
            PauseIcon(
              v-else
              class='w-12 h-12 text-stone-200 hover:text-white'
            )
</template>

<script>
import { PlayIcon, PauseIcon, RefreshIcon } from '@heroicons/vue/solid'

import CounterBox from '@/components/base/CounterBox.vue'

export default {
  name: 'Countdown',
  components: {
    CounterBox,
    PlayIcon,
    PauseIcon,
    RefreshIcon
  },
  props: {
    timer: {
      type: Number,
      default: 30
    },
    label: {
      type: String,
      default: 'Timer'
    },
    alarmSound: {
      type: String,
      default: '/sounds/wrong_sound.mp3'
    }
  },
  data () {
    return {
      timeRemaining: this.timer,
      playing: false,
      countdownInterval: null,
      hurriedUp: false
    }
  },
  methods: {
    toggleCountdown () {
      if (this.playing === false) {
        if (this.timeRemaining === this.timer) {
          this.playStartTimer()
        }

        this.playing = true
        this.countdownInterval = setInterval(this.countdown, 1000)
      } else {
        this.playing = false
        clearInterval(this.countdownInterval)
      }
    },
    resetTimer () {
      if (this.playing === true) {
        this.toggleCountdown()
      }

      this.timeRemaining = this.timer
      this.hurriedUp = false

      this.playReset()
    },
    countdown () {
      this.timeRemaining--

      if (this.timeRemaining < (this.timer * 0.25) && this.hurriedUp === false) {
        this.playHurryUp()
        this.hurriedUp = true
      }

      if (this.timeRemaining <= 0) {
        clearInterval(this.countdownInterval)
        this.playCountedDown()
        this.$emit('countedDown')
      }
    },
    playSound (soundFile) {
      const audio = new Audio(soundFile)
      audio.volume = 0.2
      audio.play()
    },
    playAlarm () {
      this.playSound(this.alarmSound)
    },
    playStartTimer () {
      this.playSound('/sounds/whoosh_and_boom_1.wav')
    },
    playHurryUp () {
      this.playSound('/sounds/smb_warning.wav')
    },
    playReset () {
      this.playSound('/sounds/reset.mp3')
    },
    playCountedDown () {
      this.playSound('/sounds/wrong_sound.mp3')
    }
  }
}
</script>
