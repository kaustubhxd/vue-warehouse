<template>
  <div id="home">
    <div id="filter">Filter</div>
    <Listing/>
  </div>
</template>

<script>
import Listing from '@/components/Listing.vue'

export default {
  name: 'Home',
  components: {
    Listing
  }
}
</script>

<style lang="scss" scoped>
  #home{
    display: flex;


    #filter{
      width : 300px;
      background: pink;
    }
  }
</style>
