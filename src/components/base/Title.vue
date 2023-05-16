<template lang="pug">
VideoSlide(
  v-if='backgroundType === "video"'
  :background='background'
  :muted='muted'
)
  .h-full.flex.items-center.justify-center
    slot(name='title')
BackgroundImageSlide(
  v-else
  :background='background'
)
  .h-full.flex.items-center.justify-center
    slot(name='title')
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
    muted: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.titleLogo {
  @apply flex grow-0;
}
</style>
