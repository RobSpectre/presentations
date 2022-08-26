<template lang="pug">
GameContentWithSidebar
  template(v-slot:content)
    .flex.flex-col.justify-center.items-center.h-screen.w-full
      img.pt-5(
        :src='image'
      )
  template(v-slot:footer)
    h1 {{ title }}
</template>

<script>
import GameContentWithSidebar from '@/components/base/GameContentWithSidebar.vue'

export default {
  name: 'ImageIntro',
  components: {
    GameContentWithSidebar
  },
  props: {
    image: String,
    title: String
  }
}
</script>
