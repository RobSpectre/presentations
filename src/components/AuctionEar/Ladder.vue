<template lang='pug'>
span.text-2xl.font-semibold.uppercase.text-white.bg-green.rounded-t-md {{ ladderName }}
.rounded-b-md.bg-stone-100
  .mt-1.flex.items.center.p-2.text-4xl.leading-6.font-medium.rounded-md(
    v-for='item in orderedItems'
    class='hover:bg-stone-500 hover:text-white'
    :class='{ active: item.active, passed: item.passed}'
  )
    .font-semibold.uppercase.py-2.grow {{ item.name }}
    .flex-none.font-semibold.text-white.px-3.py-2.font-medium.blue.rounded-full {{ item.value }}
</template>

<script>
export default {
  name: 'Ladder',
  props: {
    items: Array,
    ascending: {
      type: Boolean,
      default: false
    },
    ladderName: {
      type: String,
      default: 'Bid Ladder'
    }
  },
  computed: {
    orderedItems () {
      const ordered = []

      this.items.forEach((item) => {
        ordered.push(item)
      })

      if (this.ascending === false) {
        return ordered.sort((a, b) => a.value - b.value).reverse()
      } else {
        return ordered.sort((a, b) => a.value - b.value)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.passed {
  @apply bg-stone-500 text-white;
}

.active {
  @apply bg-orange text-white;
}
</style>
