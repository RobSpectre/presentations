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
export default {
  name: 'Title',
  props: {
    background: {
      type: String,
      default: require('@/assets/video/intro.mp4')
    },
    backgroundType: {
      type: String,
      default: 'video'
    },
    heading: {
      type: String,
      default: require('@/assets/images/hackparty_logo.png')
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
