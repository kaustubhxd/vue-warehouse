<template>
  <div id="home">
    <Filters/>
    <Listing/>
  </div>
</template>

<script>
import Listing from '@/components/Listing.vue'
import Filters from '@/components/Filters.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: { Listing, Filters },
  methods : {
    ...mapActions(['clearAllFiltersAction'])
  },
  mounted: function() {
    this.clearAllFiltersAction()
  }
}
</script>

<style lang="scss" scoped>
  #home{
    display: flex;
    background-color : #fbfbfb;
  }
</style>
