<template lang='pug'>
#keyboard
  .row(v-for='(row, i) in rows')
    .spacer(v-if='i === 1')
    button(v-for='key in row' :class="[key.length > 1 && 'big', letterStates[key]]" @click="$emit('key', key)")
      span(v-if="key !== 'Backspace'") {{ key }}
      svg(v-else='' xmlns='http://www.w3.org/2000/svg' height='24' viewbox='0 0 24 24' width='24')
        path(fill='currentColor' d='M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z')
    .spacer(v-if='i === 1')
</template>

<script>
export default {
  name: 'Keyboard',
  props: {
    letterStates: Object
  },
  data () {
    return {
      rows: [
        'qwertyuiop'.split(''),
        'asdfghjkl'.split(''),
        ['Enter', ...'zxcvbnm'.split(''), 'Backspace']
      ]
    }
  }
}
</script>

<style scoped>
#keyboard .correct,
#keyboard .present,
#keyboard .absent {
  color: #fff !important;
}

#keyboard .correct {
  background-color: #6aaa64 !important;
}

#keyboard .present {
  background-color: #c9b458 !important;
}

#keyboard .absent {
  background-color: #787c7e !important;
}
#keyboard {
  margin: 30px 8px 0;
  user-select: none;
}

.row {
  display: flex;
  width: 100%;
  margin: 0 auto 8px;
  touch-action: manipulation;
}

.spacer {
  flex: 0.5;
}

button {
  font-family: inherit;
  font-weight: bold;
  border: 0;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  background-color: #d3d6da;
  color: #1a1a1b;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  transition: all 0.2s 1.5s;
}

button:last-of-type {
  margin: 0;
}

button.big {
  flex: 1.5;
}
</style>
