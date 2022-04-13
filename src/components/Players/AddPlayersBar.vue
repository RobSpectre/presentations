<template lang="pug">
div
  label.text-sm.font-medium.leading-5.text-gray-700(for='inputName')
  .my-2.bg-white.flex.rounded-md.shadow-sm.mx-20
    .relative.flex-grow(class='focus-within:z-10')
      .absolute.inset-y-0.left-0.pl-3.flex.items-center.pointer-events-none
        UserIcon.h-5.w-5.text-gray-400
      input.my-2.outline-none.form-input.block.w-full.rounded-none.pl-10.transition.ease-in-out.duration-150(class='sm:text-sm sm:leading-5' placeholder='Shrimply Pibbles' v-model='inputName' v-on:keydown.enter='handleAddPlayer(inputName)')
    button.rounded-r-md(v-if='addPlayersAllowed && !addTeamsAllowed'
                        v-on:click='handleAddPlayer(inputName)')
      UserAddIcon.h-5.w-5.text-gray-400
      span.ml-2 Add
    button(v-else-if='addPlayersAllowed'
           v-on:click='handleAddPlayer(inputName)')
      UserAddIcon.h-5.w-5.text-gray-400
      span.ml-2 Add
    button.rounded-r-md(v-if='addTeamsAllowed'
                        v-on:click='handleAddTeam(inputName)')
      UserGroupIcon.h-5.w-5.text-gray-400
      span.ml-2 Add Team
</template>

<script>
import { mapActions } from 'pinia'
import { useGameStore } from '@/store'

import { UserIcon, UserAddIcon, UserGroupIcon } from '@heroicons/vue/solid'

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
    handleAddPlayer (name) {
      if (name.trim() === '') {
        return
      }

      this.addPlayer(name)
      this.inputName = ''
    },
    handleAddTeam (name) {
      if (name.trim() === '') {
        return
      }

      this.addTeam(name)
      this.inputName = ''
    },
    ...mapActions(useGameStore, ['addPlayer', 'addTeam'])
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
  @apply border text-gray-700 outline-none;
}

button:active {
  @apply bg-gray-100 text-gray-700;
}
</style>
