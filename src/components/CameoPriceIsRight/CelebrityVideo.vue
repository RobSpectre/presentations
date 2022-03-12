<template lang="pug">
section
  .h-screen.flex.overflow-hidden
    // Static sidebar for desktop
    .hidden(class='md:flex md:flex-shrink-0')
      .flex.flex-col.w-64
        .flex.items-center.h-16.flex-shrink-0.px-4.green
          img.h-8.w-auto(src='@/assets/images/cameo_price_is_right.png' alt='Workflow')
        .h-0.flex-1.flex.flex-col.overflow-y-auto
          // Sidebar component, swap this element with another sidebar if you like
          nav.flex-1.px-2.py-4.bg-gray-800
            .mt-1.group.flex.items-center.px-2.py-2.text-base.leading-6.font-medium.rounded-md.text-gray-300.transition.ease-in-out.duration-150(v-for='player in game.players' :key='player.name' class='hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700')
              .font-semibold.w-48.text-3xl {{ player.name }}
              .inline-flex.items-center.px-3.rounded-full.text-3xl.font-medium.leading-5.green(class='py-0.5') {{ player.score }}
    main.flex-1.relative.z-0.overflow-y-auto.py-6(class='focus:outline-none' tabindex='0')
      .max-w-7xl.mx-auto.px-4(class='sm:px-6 md:px-8')
        .py-4
          video.mx-auto(controls='')
            source(:src='video' type='video/mp4')
  h1 {{ celebrity }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CelebrityVideo',
  props: [
    'celebrity',
    'video'
  ],
  computed: mapState(['game']),
  methods: {
    playVideo () {
      console.log('Playing!')
      const video = this.$refs.video

      video.play()
    },
    pauseVideo () {
      const video = this.$refs.video

      video.pause()
    }
  }
}

</script>
