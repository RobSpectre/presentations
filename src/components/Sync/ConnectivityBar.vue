<template lang="pug">
.fixed.bottom-0.inset-x-0.pb-2(class='sm:pb-5')
  .max-w-screen-xl.mx-auto.px-2(class='sm:px-6 lg:px-8')
    .p-1.rounded-lg.bg-indigo-600.shadow-lg(class='sm:p-1')
      .flex.items-center.justify-between.flex-wrap
        .w-0.flex-1.flex.pl-2.items-center
          span.flex.p-2.rounded-lg.bg-red-500(v-if='sync.error')
            svg.h-3.w-3.text-white(fill='currentColor' viewbox='0 0 24 24' width='24' height='24')
              path(d='M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.54a5 5 0 0 1 7.08 0 1 1 0 0 1-1.42 1.42 3 3 0 0 0-4.24 0 1 1 0 0 1-1.42-1.42zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z')
          span.flex.p-2.rounded-lg.bg-green(v-else-if='sync.connected')
            svg.h-3.w-3.text-white(fill='currentColor' viewbox='0 0 24 24' width='24' height='24')
              path(d='M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z')
          span.flex.p-2.rounded-lg.bg-orange(v-else='')
            svg.h-3.w-3.text-white(fill='currentColor' viewbox='0 0 24 24' width='24' height='24')
              path(d='M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.54a5 5 0 0 1 7.08 0 1 1 0 0 1-1.42 1.42 3 3 0 0 0-4.24 0 1 1 0 0 1-1.42-1.42zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z')
          p.pl-3.text-white.text-sm.truncate.font-semibold
            span
              | {{ sync.message }}
</template>

<script>
export default {
  name: 'ConnectivityBar'
}
</script>
