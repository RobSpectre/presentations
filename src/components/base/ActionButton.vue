<template lang='pug'>
button.actionButton(
  @click='click'
) {{ label }}

</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    label: String
  },
  methods: {
    click () {
      this.$emit('clicked')
    }
  }
}
</script>

<style lang="scss">
.actionButton {
  @apply inline-flex justify-center px-6 py-3 border border-transparent leading-6 font-medium rounded-md text-white text-2xl uppercase bg-darkgray transition ease-in-out duration-150 my-2 hover:bg-slate-300 focus:outline-none focus:border-slate-300 active:bg-slate-300;
}
</style>
