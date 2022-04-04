<template lang="pug">
section(:class='classes')
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
    }
  }
}
</script>
