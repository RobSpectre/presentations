<template lang="pug">
section(
  :class='classes'
  :data-state='dataState'
)
  .h-screen.flex.overflow-hidden
    slot
    h1(v-if='heading') {{ heading }}
</template>

<script>
export default {
  name: 'GameSlide',
  props: {
    heading: {
      type: String
    },
    classes: {
      type: String
    },
    dataState: {
      type: String,
      default: null
    }
  }
}
</script>
