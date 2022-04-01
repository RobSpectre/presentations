<template lang="pug">
VideoSlide(
  v-if='backgroundType === "video"'
  :background='background'
)
  div(class='flex h-full')
    img(
      v-if='headingType === "image"'
      class='titleLogo'
      :src='heading'
    )
    h2(v-else class='titleLogo') {{ heading }}
BackgroundImageSlide(v-else)
  div(class='flex h-full')
    img(
      v-if='headingType === "image"'
      class='titleLogo'
      :src='heading'
    )
    h2(v-else class='titleLogo') {{ heading }}
</template>

<script>
import VideoSlide from '@/components/base/VideoSlide.vue'
import BackgroundImageSlide from '@/components/base/BackgroundImageSlide.vue'

export default {
  name: 'Title',
  components: {
    VideoSlide,
    BackgroundImageSlide
  },
  props: {
    background: {
      type: String,
      default: '/video/intro.mp4'
    },
    backgroundType: {
      type: String,
      default: 'video'
    },
    heading: {
      type: String,
      default: '/images/hackparty_logo.png'
    },
    headingType: {
      type: String,
      default: 'image'
    }
  }
}
</script>

<style lang="scss" scoped>
.titleLogo {
  @apply m-auto;
}
</style>
