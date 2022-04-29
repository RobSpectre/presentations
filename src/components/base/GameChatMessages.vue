<template lang='pug'>
GameSlide
  PlayersSidebar(:players='players')
  GameContent
    template(v-slot:content)
      .h-screen.flex.items-center.justify-center(class='w-4/6')
        ChatWindow(
          :current-user-id='currentUser'
          :rooms='rooms'
          :messages='processedMessages'
          :rooms-loaded='true'
          :messages-loaded='true'
          height='1200px'
        )
</template>

<script>
import { mapGetters } from 'pinia'
import { useGameStore } from '@/store'

import ChatWindow from 'vue-advanced-chat'

import GameSlide from '@/components/base/GameSlide.vue'
import GameContent from '@/components/base/GameContent.vue'
import PlayersSidebar from '@/components/Players/PlayersSidebar.vue'

export default {
  name: 'GameChatMessages',
  components: {
    ChatWindow,
    GameSlide,
    GameContent,
    PlayersSidebar
  },
  props: {
    currentUser: String,
    messages: Array
  },
  computed: {
    ...mapGetters(useGameStore, ['getPlayersByScore']),
    players () {
      const players = this.getPlayersByScore

      players.forEach((player) => {
        player.value = player.score
      })

      return players
    },
    processedMessages () {
      const messages = []

      this.messages.forEach((message, index) => {
        messages.push({
          _id: index,
          content: message.content,
          senderId: message.username,
          username: message.username
        })
      })

      return messages
    },
    rooms () {
      return [{ roomId: 1, roomName: 'Alice' }]
    }
  }
}
</script>

<style lang='scss'>
@import url('/node_modules/vue-advanced-chat/dist/vue-advanced-chat.css');

.vac-chat-container {
  --chat-message-bg-color: theme('colors.green');
  --chat-message-color: theme('colors.white');
  --chat-message-bg-color-me: theme('colors.blue');
  --chat-color: theme('colors.green');
  --chat-sidemenu-bg-color-active: theme('colors.darkgray');
  --chat-room-color-username: theme('colors.white');
}

.vac-message-wrapper span {
  @apply text-2xl;
}

.vac-room-header .vac-room-name {
  @apply text-2xl;
}
</style>
