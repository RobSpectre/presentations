<template lang="pug">
  Reveal
    .slides
      Title
      Slide(heading='Test')
        h2 Is this
        h2 working?
      Slide
        h2 No heading.
      PlayerBoard(:addPlayersAllowed='false')
</template>

<script>
import PlayerBoard from '@/components/Players/PlayerBoard.vue'

export default {
  name: 'Home',
  components: {
    PlayerBoard
  }
}
</script>
