<template lang="pug">
  section(:class='classes')
    div(class='flex items-center h-full')
      div(class='flex-1 flex-col')
        slot
    h1(v-if='heading') {{ heading }}
</template>

<script>
export default {
  name: 'Slide',
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
