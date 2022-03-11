<template lang="pug">
section
  AddPlayersBar(
    :addPlayersAllowed='addPlayersAllowed'
    :addTeamsAllowed='addTeamsAllowed'
  )
  DisplayPlayers
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import AddPlayersBar from '@/components/Players/AddPlayersBar'
import DisplayPlayers from '@/components/Players/DisplayPlayers'

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
  },
  computed: {
    ...mapState(['game', 'sync']),
    ...mapGetters(['teamsWithPlayers'])
  }
}
</script>
