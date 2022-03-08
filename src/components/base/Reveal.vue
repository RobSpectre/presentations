<template lang="pug">
.reveal(class='theater' ref='presentation')
  slot
</template>

<script>
import Reveal from 'reveal.js'

export default {
  name: 'Reveal',
  data: function () {
    return {
      deck: undefined
    }
  },
  mounted () {
    this.presentation = this.$refs.presentation

    this.waitToRenderReveal()
  },
  methods: {
    waitToRenderReveal () {
      if (!(this.presentation.parentElement.clientWidth > 0)) {
        setTimeout(window.requestAnimationFrame(this.waitToRenderReveal),
          500)
      } else {
        this.renderReveal()
      }
    },
    renderReveal () {
      this.deck = new Reveal({
        controls: false,
        progress: true,
        history: true,
        overview: false,
        loop: false,
        transition: 'none',
        embedded: true,
        margin: 0,
        width: '100%',
        height: '100%'
      })

      this.deck.initialize().then(() => {
        this.deck.layout()
        this.$emit('reveal-rendered', this.deck)
      })
    }
  }
}
</script>

<style src="@/../node_modules/reveal.js/dist/reveal.css"></style>
<style lang="scss" src="../../assets/styles/reveal_theme.scss"></style>
<style lang="scss">
.theater {
  @apply h-screen w-full;
}

section {
  @apply h-full;
}
</style>
