<template lang="pug">
section
  AddPlayersBar(
    :addPlayersAllowed='addPlayersAllowed'
    :addTeamsAllowed='addTeamsAllowed'
  )
  DisplayPlayers
  slot
</template>

<script>
import AddPlayersBar from '@/components/Players/AddPlayersBar.vue'
import DisplayPlayers from '@/components/Players/DisplayPlayers.vue'

export default {
  name: 'PlayerBoard',
  components: {
    AddPlayersBar,
    DisplayPlayers
  },
  props: {
    addPlayersAllowed: {
      type: Boolean,
      default: true
    },
    addTeamsAllowed: {
      type: Boolean,
      default: true
    }
  }
}
</script>
