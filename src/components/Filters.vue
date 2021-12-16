<template>
  <div id="filters">
    <div id="header"><h3>Filters</h3></div>
    <SearchBox searchBy="warehouse" :options="warehouseNames" label="Search by Warehouse Name" type="multi" />
    <SearchBox searchBy="city" :options="cityNames" label="Filter by City" type="single" />
    <SearchBox searchBy="cluster" :options="clusterNames" label="Filter by Cluster" type="single" />
    <!-- <Slider searchBy="availSpace" :range="availSpaceRange" label="Filter by Available Space" /> -->
    <StatusFilter />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchBox from "./SearchBox";
// import Slider from "./Slider";
import StatusFilter from "./StatusFilter";

export default {
  components: {
    SearchBox,
    // Slider,
    StatusFilter,
  },
  data: function() {
    return {};
  },
  computed: {
    ...mapGetters(["availSpaceRange", "warehouseNames", "cityNames", "clusterNames"]),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
#filters {
  min-width: 300px;
  width: 300px;
  height: 90vh;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 23px;
  padding-top: 0;
  padding-top: 16px;
  margin-top: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  overflow: visible;

  #header {
    margin: 16px 0 32px 0;
    text-align: center;
    font-size: 18px;
    line-height: 1.33;
  }

  .search {
    .search-label {
      font-weight: 700;
      font-size: 14px;
      color: #333;
      margin-bottom: 4px;
    }

    .search-box {
      display: flex;
      flex-wrap: wrap;
      padding: 3px 11px;
      width: 250px;
    }
  }
}

@media only screen and (max-width: 800px) {
  #filters {
    width: auto;
    height: 100%;
  }
}
</style>
