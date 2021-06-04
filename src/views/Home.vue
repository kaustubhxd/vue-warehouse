<template>
  <div id="home">
    <div id="filters-container"><Filters/></div>
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
    ...mapActions({clearAllFiltersAction : 'filtersMod/clearAllFiltersAction'})
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

@media only screen and (max-width: 800px) {
  #filters-container{
    display: none;
  }
}
</style>
