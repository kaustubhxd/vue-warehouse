<template>
  <div id="home">
    <Filters/>
    <Listing/>
  </div>
</template>

<script>
import Listing from '@/components/Listing.vue'
import Filters from '@/components/Filters.vue'

export default {
  name: 'Home',
  components: { Listing, Filters }
}
</script>

<style lang="scss" scoped>
  #home{
    display: flex;
    background-color : #fafafa;
  }
</style>
