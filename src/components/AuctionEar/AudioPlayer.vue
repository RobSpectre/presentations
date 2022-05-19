<template lang='pug'>
.w-full.flex.flex-col.flex-grow.relative.bg-stone-700.audio-player
  .border-t.border-b.border-2.border-slate-400
    .h-9.w-full.relative.overflow-hidden
      #round-progress.h-full.absolute.overflow-hidden.bg-stone-200(
        :style='roundProgress'
      )
      #play-progress.h-full.absolute.overflow-hidden.bg-green(
        :style='playProgress'
      )
      .w-full.h-full.absolute
        .w-px.h-full.absolute.bg-stone-400(
          v-for='chunk in chunkPercentages',
          :style='styleChunk(chunk)'
        )
  .flex.flex-row
    .flex-none.text-2xl.text-white.px-4.py-2 {{ currentTimeHuman }}
    .grow
      button(
        @click='togglePlay'
      )
        PlayIcon(
          v-if='!playing'
          class='w-12 h-12 text-stone-400 hover:text-white'
        )
        PauseIcon(
          v-else
          class='w-12 h-12 text-stone-400 hover:text-white'
        )
    .flex-none.text-2xl.text-white.px-4.py-2 {{ durationHuman }}
</template>

<script>
import { PlayIcon, PauseIcon } from '@heroicons/vue/solid'

export default {
  name: 'AudioPlayer',
  components: {
    PlayIcon,
    PauseIcon
  },
  props: {
    src: String,
    chunks: {
      type: Number,
      default: 0
    },
    chunkIndex: {
      type: Number,
      default: 0
    },
    chunkEvenly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      audio: new Audio(this.src),
      audioContext: false,
      audioTrack: false,
      playing: false,
      currentTime: 0,
      duration: 0,
      checkCurrentTimeInterval: false
    }
  },
  mounted () {
    this.initializeAudioContextObject()
  },
  computed: {
    chunkPercentages () {
      const chunks = []
      const diffs = []

      for (let i = 1; i <= this.chunks; i++) {
        if (this.chunkEvenly === true) {
          chunks.push(i / this.chunks)
        } else {
          chunks.push(((1 / i)))
        }
      }

      if (this.chunkEvenly === true) {
        return chunks
      }

      for (let i = 0; i < chunks.length; i++) {
        if (chunks[i + 1] === undefined) {
          break
        }

        diffs.push(chunks[i] - chunks[i + 1])
      }

      return diffs.reverse()
    },
    roundProgress () {
      if (this.chunkPercentages[this.chunkIndex] === undefined) {
        return 'width: 100%;'
      } else {
        return 'width: ' + (this.chunkPercentages[this.chunkIndex] * 100).toFixed(2) + '%;'
      }
    },
    playProgressPercentage () {
      return this.currentTime / this.duration
    },
    playProgress () {
      return 'width: ' + (this.playProgressPercentage * 100).toFixed(2) + '%;'
    },
    currentTimeHuman () {
      return this.convertAudioTimeToHumanString(this.currentTime)
    },
    durationHuman () {
      return this.convertAudioTimeToHumanString(this.duration)
    },
    durationLimit () {
      return this.chunkPercentages[this.chunkIndex] * this.duration
    }
  },
  methods: {
    styleChunk (chunk) {
      return 'left: ' + (chunk * 100).toFixed(2) + '%;'
    },
    initializeAudioContextObject () {
      this.audio.addEventListener('loadedmetadata', () => {
        this.currentTime = this.audio.currentTime
        this.duration = this.audio.duration

        this.audio.volume = 0.5
      })
    },
    convertAudioTimeToHumanString (seconds) {
      const secs = parseInt(`${seconds} % 60`, 10)
      const mins = parseInt(`${seconds / 60} % 60`, 10)

      return mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0')
    },
    checkCurrentTime () {
      this.currentTime = this.audio.currentTime

      if (this.currentTime >= this.durationLimit) {
        this.togglePlay()

        this.audio.currentTime = 0
        this.currentTime = 0
      }
    },
    async togglePlay () {
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume()
      }

      if (this.playing === true) {
        this.playing = false
        await this.audio.pause()

        clearInterval(this.checkCurrentTimeInterval)
      } else {
        this.playing = true
        await this.audio.play()

        this.checkCurrentTimeInterval = setInterval(this.checkCurrentTime, 25)
      }
    }
  }
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css2?family=Bungee&display=swap');

.audio-player {
  font-family: 'Bungee', cursive;
}
</style>
