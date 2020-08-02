<template lang="pug">
  div
    label.block.text-sm.font-medium.leading-5.text-gray-700(for='inputName')
    .my-2.flex.rounded-md.shadow-sm.mx-20
      .relative.flex-grow(class='focus-within:z-10')
        .absolute.inset-y-0.left-0.pl-3.flex.items-center.pointer-events-none
          UserIcon.h-5.w-5.text-gray-400
        input.form-input.block.w-full.rounded-none.rounded-l-md.pl-10.transition.ease-in-out.duration-150(class='sm:text-sm sm:leading-5' placeholder='Shrimply Pibbles' v-model='inputName' v-on:keydown.enter='addPlayer(inputName)')
      button.rounded-r-md(v-if='addPlayersAllowed && !addTeamsAllowed')
        UserAddIcon.h-5.w-5.text-gray-400
        span.ml-2(v-on:click='addPlayer(player_name)') Add
      button(v-else-if='addPlayersAllowed')
        UserAddIcon.h-5.w-5.text-gray-400
        span.ml-2(v-on:click='addPlayer(player_name)') Add
      button.rounded-r-md(v-if='addTeamsAllowed')
        UserGroupIcon.h-5.w-5.text-gray-400
        span.ml-2(v-on:click='addTeam(teamName)') Add Team
</template>

<script>
import { UserIcon, UserAddIcon, UserGroupIcon } from '@vue-hero-icons/solid'

export default {
  name: 'AddPlayersBar',
  components: {
    UserIcon,
    UserAddIcon,
    UserGroupIcon
  },
  data: function () {
    return {
      inputName: ''
    }
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
  methods: {
    addPlayer (name) {
      if (name.trim() === '') {
        return
      }

      this.$store.commit('addPlayer', { name: name })
      this.inputName = ''
    },
    addTeam (name) {
      if (name.trim() === '') {
        return
      }

      this.$store.commit('addTeam', name)
      this.inputName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  @apply -ml-px relative inline-flex items-center px-4 py-2 border
  border-gray-300 text-sm leading-5 font-medium text-gray-700 bg-gray-50
  transition ease-in-out duration-150;
}

button:hover {
  @apply bg-white text-gray-500;
}

button:focus {
  @apply border text-gray-700 outline-none shadow-outline-blue;
}

button:active {
  @apply bg-gray-100 text-gray-700;
}
</style>
