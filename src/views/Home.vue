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
    CameoPriceIsRightRound(
      celebrity='ESPN eSports'
      hint1='Professional TV'
      hint2='Most Expensive Cable Channel'
      hint3='Only Recognizable Brand'
      video='/images/espnesports.mp4'
      price=91702
      prize=1
      image='https://espnpressroom.com/us/files/2016/01/ESPN_esports_logo1.jpg'
      )
    PlayerBoard

</template>

<script>
import BackgroundImageSlide from '@/components/base/BackgroundImageSlide.vue'
import Reveal from '@/components/base/Reveal.vue'
import Title from '@/components/base/Title.vue'
import Slide from '@/components/base/Slide.vue'
import VideoSlide from '@/components/base/VideoSlide.vue'

import PlayerBoard from '@/components/Players/PlayerBoard.vue'

import CameoPriceIsRightRound from '@/components/CameoPriceIsRight/CameoPriceIsRightRound'

export default {
  name: 'Home',
  components: {
    PlayerBoard,
    Title,
    Slide,
    Reveal,
    BackgroundImageSlide,
    VideoSlide,
    CameoPriceIsRightRound
  }
}
</script>
