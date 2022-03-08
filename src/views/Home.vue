<template lang="pug">
Reveal
  .slides
    Title
    Slide(heading='Test')
      h2 Is this
      h2 working?
    Slide
      h2 No heading.
    PlayerBoard
</template>

<script>
import BackgroundImageSlide from '@/components/base/BackgroundImageSlide.vue'
import Reveal from '@/components/base/Reveal.vue'
import Title from '@/components/base/Title.vue'
import Slide from '@/components/base/Slide.vue'
import VideoSlide from '@/components/base/VideoSlide.vue'

import PlayerBoard from '@/components/Players/PlayerBoard.vue'

export default {
  name: 'Home',
  components: {
    PlayerBoard,
    Title,
    Slide,
    Reveal,
    BackgroundImageSlide,
    VideoSlide
  }
}
</script>
