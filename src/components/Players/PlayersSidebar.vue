<template lang='pug'>
.hidden(class='md:flex md:flex-shrink-0')
  .flex.flex-col.w-64
    .flex.items-center.h-16.flex-shrink-0.px-4.green
      img.h-8.mx-auto(src='@/assets/images/cameo_price_is_right.png')
    .h-0.flex-1.flex.flex-col.overflow-hidden
      nav.flex-1.px-2.py-4.bg-gray-800
        .mt-1.group.flex.items-center.px-2.py-2.text-base.leading-6.font-medium.rounded-md.text-gray-300.transition.ease-in-out.duration-150(v-for='player in players' :key='player.name' class='hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700')
          .font-semibold.text-3xl.w-48 {{ player.name }}
          .inline-flex.items-center.px-3.rounded-full.text-sm.font-medium.leading-5.text-3xl.green(class='py-2') {{ player.value }}
</template>

<script>
export default {
  name: 'PlayersSidebar',
  props: [
    'players'
  ]
}
</script>
