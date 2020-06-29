<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Ctitle></Ctitle>
    <router-view />
  </div>
</template>

<script>
import Ctitle from '../src/components/title.vue'
export default {
  name: 'App',
  components: {
    Ctitle
  }
}
</script>

<style>
#app{
  margin-top: 0;
}

</style>
