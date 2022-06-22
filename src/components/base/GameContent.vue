<template lang='pug'>
.flex.flex-grow.overflow-y-auto(class='focus:outline-none' tabindex='0')
  .flex-col.items-center.w-full
    .flex-none.bg-blue
      slot(name='header')
    .flex-grow.items-center.justify-center
      slot(name='content')
      slot(name='footer')
</template>

<script>
export default {
  name: 'GameContent'
}
</script>
