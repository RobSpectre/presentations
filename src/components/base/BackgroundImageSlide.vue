<template lang="pug">
section(
  :data-background-image='background'
)
  slot
</template>

<script>
export default {
  name: 'BackgroundImageSlide',
  props: {
    background: {
      type: String,
      default: '@/assets/images/party_hard.gif'
    }
  }
}
</script>
