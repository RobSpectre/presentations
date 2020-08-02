<template lang="pug">
  section
    AddPlayersBar(
      :addPlayersAllowed='addPlayersAllowed'
      :addTeamsAllowed='addTeamsAllowed'
    )
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import AddPlayersBar from '@/components/Players/AddPlayersBar'

export default {
  name: 'PlayerBoard',
  components: {
    AddPlayersBar
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
