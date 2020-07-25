<template lang="pug">
    section(
      :data-background-video='background'
      data-background-color='#000'
      data-background-video-muted
      data-background-video-loop
    )
      slot
</template>

<script>
export default {
  name: 'VideoSlide',
  props: {
    background: {
      type: String,
      default: require('@/assets/video/intro.mp4')
    }
  }
}
</script>
