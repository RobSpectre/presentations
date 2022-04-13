<template lang='pug'>
celebrity-intro(:celebrity='celebrity' :hint1='hint1' :hint2='hint2' :hint3='hint3' :image='image')
celebrity-video(:celebrity='celebrity' :video='video')
celebrity-guess(
  :celebrity='celebrity'
  :image='image'
  :price='price'
  :prize='prize'
)
</template>

<script>
import CelebrityIntro from './CelebrityIntro.vue'
import CelebrityVideo from './CelebrityVideo.vue'
import CelebrityGuess from './CelebrityGuess.vue'

export default {
  name: 'CameoPriceIsRightRound',
  components: {
    CelebrityIntro,
    CelebrityVideo,
    CelebrityGuess
  },
  props: {
    celebrity: String,
    hint1: String,
    hint2: String,
    hint3: String,
    video: String,
    image: String,
    price: Number,
    prize: Number
  }
}
</script>
