<template>
  <div class="home">
    <HelloWorld/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Element from 'element-ui'
export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>