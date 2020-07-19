<template lang="pug">
  #app(class='flex flex-col')
    div(class='flex-grow border-dashed border-black rounded-lg')
      router-view
</template>

<script>
export default {
  name: 'hack.party'
}
</script>
