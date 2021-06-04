<template>
  <div id="app">
    <div id="nav">
      <Navbar/>
    </div>
    <transition name='fade' mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>
        
<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
