<template lang='pug'>
.rounded-lg.bg-blue.text-white
  .text-sm.uppercase.font-semibold {{ label }}
  .text-6xl.counter {{ counter }}
</template>

<script>
export default {
  name: 'CounterBox',
  props: {
    counter: Number,
    label: {
      type: String,
      default: 'Total'
    }
  }
}
</script>

<style lang='scss' scoped>
@import url('https://fonts.googleapis.com/css2?family=Bungee&display=swap');

.counter {
  font-family: 'Bungee', cursive;
}
</style>
