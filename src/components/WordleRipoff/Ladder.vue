<template lang='pug'>
.ladder
  .ladder-item.font-medium.text-white(
    v-for='item in items'
    class='hover:bg-stone-500 hover:text-white bg-stone-500'
    :class='{ active: item.active, winner: item.winner }'
  )
    .font-semibold.uppercase.py-2.grow {{ item.name }}
</template>

<script>
export default {
  name: 'Ladder',
  props: {
    items: Array
  }
}
</script>

<style lang='scss' scoped>
.ladder {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  --height: min(1200px, calc(var(--vh, 100vh) - 310px));
  height: var(--height);
  width: min(650px, calc(var(--height) / 6 * 5));
  margin: 0;
}

.ladder-item {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 5px;
  width: 100%;
  font-weight: bold;
  vertical-align: middle;
  text-transform: uppercase;
  justify-content: center;
  align-items: center;
  @apply text-4xl;
}

.active {
  @apply bg-orange;
}

.winner {
  @apply bg-[#6aaa64];
}
</style>
