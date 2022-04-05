<template lang='pug'>
.hidden(class='md:flex md:flex-shrink-0')
  .flex.flex-col.w-64
    .flex.h-24.py-4.green
      img.pl-3(src='/images/hackparty_logo.png')
    .h-0.flex-1.flex.flex-col.overflow-hidden
      nav.flex-1.px-2.py-4.bg-gray-800
        .mt-1.group.flex.items-center.px-2.py-2.text-base.leading-6.font-medium.rounded-md.text-white.transition.ease-in-out.duration-150(v-for='player in players' :key='player.name' class='hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700')
          .font-semibold.text-3xl.w-48 {{ player.name }}
          PointsController(
            :playerName='player.name'
            :darkBackground='true'
          )
          .inline-flex.items-center.px-3.py-2.rounded-full.text-sm.font-medium.leading-5.text-3xl.green {{ player.value }}
</template>

<script>
import PointsController from '@/components/Players/PointsController.vue'

export default {
  name: 'PlayersSidebar',
  components: {
    PointsController
  },
  props: [
    'players'
  ]
}
</script>
