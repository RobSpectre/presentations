<template lang='pug'>
GameContentWithSidebar
  template(v-slot:content)
    TextInput(
      v-if='!loading'
      placeholder='Input prompt to generate image...'
      @inputEvent='handleInput'
      :buttonColor='buttonColor'
    )
    .flex.grow.justify-center
      AtomSpinner(
        v-if='loading'
        :animation-duration='1000'
        :size='800'
        color='#00b1e1'
      )
      .flex-col.justify-center.items-center(v-if='!loading')
        h5(v-if='prompt !== false') {{ prompt }}
        .flex.flex-none.justify-center.items-center(v-if='!loading')
          img.py-5(
            v-if='!loading && (image !== false)'
            :src='image'
          )
    .flex.flex-initial.justify-center.items-center.w-full.border-t-4
      img.pt-5(
        :src='comparisonImage'
      )
  template(v-slot:footer)
    h1(v-if='playerConfirmed') {{ playerConfirmed }}
    h1(v-else) {{ playerName }}
</template>

<script>
import GameContentWithSidebar from '@/components/base/GameContentWithSidebar.vue'

import TextInput from '@/components/base/TextInput.vue'

import AtomSpinner from '@/components/base/AtomSpinner.vue'

import websocket from '@/services/websocket.js'

import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'GenerateImage',
  components: {
    GameContentWithSidebar,
    TextInput,
    AtomSpinner
  },
  props: {
    comparisonImage: String,
    playerName: String
  },
  data () {
    return {
      loading: false,
      connected: false,
      generated: false,
      image: false,
      prompt: false,
      id: null,
      playerConfirmed: null
    }
  },
  computed: {
    buttonColor () {
      if (this.connected === true) {
        return '#00bc70'
      } else {
        return '#f36c3f'
      }
    }
  },
  mounted () {
    this.connection = websocket

    this.connection.addEventListener('open', () => {
      this.connected = true
    })

    this.connection.addEventListener('close', () => {
      this.connected = false
    })

    this.connection.addEventListener('message', this.handleMessage)

    this.id = uuidv4()
  },
  methods: {
    handleInput (input) {
      this.connection.send(JSON.stringify({
        name: 'Image Request',
        prompt: input.text,
        playerName: this.playerName,
        id: this.id
      }))
    },
    handleMessage (event) {
      event = JSON.parse(event.data)

      if (event.id === this.id) {
        if (event.name === 'Loading') {
          this.loading = true
        } else if (event.name === 'Image Response') {
          this.loading = false
          this.generated = true

          this.prompt = event.prompt
          this.image = '/images/' + event.imagePath

          this.playerConfirmed = event.playerName
          this.$emit('imageGenerated', event)
        } else {
          console.log(event)
        }
      }
    }
  }
}
</script>
