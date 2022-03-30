<template lang='pug'>
section
  .h-screen.flex.overflow-hidden
    .hidden(class='md:flex md:flex-shrink-0')
      .flex.flex-col.w-64
        .flex.items-center.h-16.flex-shrink-0.px-4.green
          img.h-8.mx-auto(src='@/assets/images/cameo_price_is_right.png')
        .h-0.flex-1.flex.flex-col.overflow-hidden
          nav.flex-1.px-2.py-4.bg-gray-800
            .mt-1.group.flex.items-center.px-2.py-2.text-base.leading-6.font-medium.rounded-md.text-gray-300.transition.ease-in-out.duration-150(v-for='player in game.players' :key='player.name' class='hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700')
              .font-semibold.text-3xl.w-48 {{ player.name }}
              .inline-flex.items-center.px-3.rounded-full.text-sm.font-medium.leading-5.text-3xl.green(class='py-2') {{ player.score }}
    main.flex-1.relative.z-0.overflow-y-auto.py-6(class='focus:outline-none' tabindex='0')
      .max-w-7xl.mx-auto.px-4(class='sm:px-6 md:px-8')
        .py-4.grid.grid-rows-3.grid-flow-col.gap-4
          .row-span-1.col-span-2.border-4.border-dashed.border-gray-200.rounded-lg.w-.cluse
            h4.fragment {{ hint1 }}
            h4.fragment {{ hint2 }}
            h4.fragment {{ hint3 }}
          .row-span-2.col-span-2
            img.fragment.m-0(style='margin: auto;' :src='image')
  h1.fragment {{ celebrity }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CelebrityIntro',
  props: [
    'celebrity',
    'hint1',
    'hint2',
    'hint3',
    'image'
  ],
  computed: mapState(['game'])
}

</script>
