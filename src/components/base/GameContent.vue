<template lang='pug'>
.flex.flex-grow.overflow-y-auto.w-full(class='focus:outline-none')
  .flex-col.items-center.w-full
    .flex-none.bg-blue
      slot(name='header')
    .flex.flex-grow.items-center.justify-center
      slot(name='content')
    slot(name='footer')
</template>

<script>
export default {
  name: 'GameContent'
}
</script>
