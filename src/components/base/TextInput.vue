<template lang='pug'>
div
  label.text-sm.font-medium.leading-5.text-gray-700(for='inputText')
  .my-2.bg-white.flex.rounded-md.shadow-sm.mx-20
    .relative.flex-grow(class='focus-within:z-10')
      .absolute.inset-y-0.left-0.pl-3.flex.items-center.pointer-events-none
        ChatAltIcon.h-5.w-5.text-gray-400
      input.my-2.outline-none.form-input.block.w-full.rounded-none.pl-10.transition.ease-in-out.duration-150(
        class='sm:text-sm sm:leading-5'
        :placeholder='placeholder'
        v-model='inputText'
        v-on:keydown.enter='emitInput(inputText)'
      )
    button.rounded-r-md.flex.items-center.justify-center.border-2.text-white.px-5(
      v-on:click='emitInput(inputText)'
      :style='backgroundColor'
    )
      SaveIcon.h-5.w-5
</template>

<script>
import { SaveIcon, ChatAltIcon } from '@heroicons/vue/solid'

export default {
  name: 'TextInput',
  components: {
    SaveIcon,
    ChatAltIcon
  },
  props: {
    placeholder: {
      type: String,
      default: 'Input text here...'
    },
    buttonColor: {
      type: String,
      default: '#00b1e1'
    }
  },
  data () {
    return {
      inputText: ''
    }
  },
  computed: {
    backgroundColor () {
      return { backgroundColor: this.buttonColor }
    }
  },
  methods: {
    emitInput (input) {
      this.$emit('inputEvent', { text: input })
    }
  }
}
</script>
