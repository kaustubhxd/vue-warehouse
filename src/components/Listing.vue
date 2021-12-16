<template>
  <div v-bar style="width : 100%">
    <div id="listing" @scroll="handleScroll">
      <div id="header"><h3>Browse Warehouses</h3></div>

      <div id="listing-options">
        <a id="filter-button" class="red-link" @click="openModal">Filter</a>
        <div id="total-results">{{ totalResults }} {{ totalResults === 1 ? "result" : "results" }} found</div>
      </div>
      <div v-if="totalResults > 0 && !isFetchingData" ref="listRef">
        <div id="cards" v-for="(listing, id) in listings" :key="id">
          <Card :id="listing.w_name" :listing="listing" />
        </div>
      </div>
      <div v-else-if="isFetchingData">
        Loading
      </div>
      <div v-else>
        <NoListingFound />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card";
import NoListingFound from "./NoListingFound";
import { mapActions, mapGetters } from "vuex";
import Filters from "./Filters";

export default {
  components: { Card, NoListingFound },
  data() {
    return {
      listings: "",
      listRef: null,
      appliedFilters: {
        warehouse: [],
        city: "",
        cluster: "",
        availSpace: [],
        is_live: false,
        is_registered: false,
      },
    };
  },
  methods: {
    ...mapActions(["setListingScrollTopAction", "setSliderMinMaxAction"]),
    openModal() {
      this.$FModal.show({ component: Filters });
    },
    handleScroll(e) {
      this.setListingScrollTopAction({ scrollTop: e.target.scrollTop });
    },
    onScrolledBottom() {
      if (this.listRef.getBoundingClientRect().bottom < window.innerHeight) {
        console.log("reached end");
      }
    },
  },
  computed: {
    ...mapGetters({ getData: "getData", isFetchingData: "getIsFetchingData", getFilters: "filtersMod/getFilters" }),
    totalResults() {
      return Object.keys(this.listings).length;
    },
  },
  watch: {
    "$store.state.isFetchingData": {
      immediate: true,
      handler() {
        if (!this.isFetchingData) {
          this.listings = this.getData;
          this.setSliderMinMaxAction();
        }
      },
    },
    "$store.state.filtersMod.filters": {
      immediate: true,
      deep: true,
      handler() {
        console.log("in filter watcher");
        // update locally relevant data
        // this.someLocalValue = this.$store.state.data.someKey;
        console.log(this.getFilters);
        var { warehouse, city, cluster, availSpace, availSpaceReset, is_live, is_registered } = this.getFilters;
        // // console.log(warehouse.length === 0,!city,!cluster,availSpaceReset )

        // check if filters have been cleared
        if (warehouse.length === 0 && !city && !cluster && availSpaceReset && !is_live && !is_registered) {
          console.log("filters cleared");
          console.log(availSpace);
          this.listings = this.getData;
          this.appliedFilters = {
            warehouse: [],
            city: "",
            cluster: "",
            availSpace: availSpace,
            is_live: false,
            is_registered: false,
          };
        } else {
          // console.log('filters applied')
          this.listings = this.getData;
          // check if warehouse filter is applied
          if (warehouse.length) {
            var warehouses = warehouse.map((x) => x.value);
            // // console.log(warehouses)
            this.listings = Object.fromEntries(
              Object.entries(this.getData).filter(([key]) => {
                // // console.log(this.getData[key].name)
                return warehouses.includes(this.getData[key]["w_name"]);
              })
            );
          } else {
            var { xwarehouse, xcity, xcluster, xavailSpace } = this.appliedFilters;
            this.appliedFilters = {
              xwarehouse: xwarehouse,
              city: xcity === city ? city : "",
              cluster: xcluster === cluster ? cluster : "",
              availSpace: JSON.stringify(xavailSpace) === JSON.stringify(availSpace) ? availSpace : [],
            };
            // check if city filter is applied
            if (city && this.appliedFilters["city"] !== city) {
              this.listings = Object.fromEntries(
                Object.entries(this.listings).filter(([key]) => {
                  // // console.log(this.getData[key].name)
                  return this.getData[key]["city"] == city;
                })
              );
              this.appliedFilters["city"] = city;
              // check if cluster filter is applied
            }
            if (cluster && this.appliedFilters["cluster"] !== cluster) {
              this.listings = Object.fromEntries(
                Object.entries(this.listings).filter(([key]) => {
                  // // console.log(this.getData[key].name)
                  return this.getData[key]["cluster"] == cluster;
                })
              );
              this.appliedFilters["cluster"] = cluster;
            }
            if (!availSpaceReset && JSON.stringify(this.appliedFilters.availSpace) !== JSON.stringify(availSpace)) {
              // // console.log('slider slid')
              this.listings = Object.fromEntries(
                Object.entries(this.listings).filter(([key]) => {
                  // // console.log(this.getData[key].name)
                  return (
                    availSpace[0] <= this.getData[key]["space_available"] &&
                    availSpace[1] >= this.getData[key]["space_available"]
                  );
                })
              );
            }
            if (is_live && this.appliedFilters["is_live"] !== is_live) {
              this.listings = Object.fromEntries(
                Object.entries(this.listings).filter(([key]) => {
                  // // console.log(this.getData[key].name)
                  return this.getData[key]["is_live"] == is_live;
                })
              );
              this.appliedFilters["is_live"] = is_live;
            }
            if (is_registered && this.appliedFilters["is_registered"] !== is_registered) {
              this.listings = Object.fromEntries(
                Object.entries(this.listings).filter(([key]) => {
                  // // console.log(this.getData[key].name)
                  return this.getData[key]["is_registered"] == is_registered;
                })
              );
              this.appliedFilters["is_registered"] = is_registered;
            }
          }
        }
      },
    },
  },
  mounted: function() {
    console.log("mounted");
    // console.log(this.$refs.listingRef);
    if (!this.listRef) return;
    this.listRef = this.$refs.listRef;
    this.listRef.addEventListener("wheel", this.onScrolledBottom);

    var listingDiv = this.$el.querySelector("#listing");
    this.$nextTick(() => {
      listingDiv.scrollTop = this.$store.state.listingScrollTop;
    });
    this.listings = this.getData;
    console.log(this.$FModal);
  },
  unmounted() {
    this.listRef.removeEventListener("wheel", this.onScrolledBottom);
  },
};
</script>

<style lang="scss" scoped>
#listing {
  flex: 1;
  overflow-y: auto;
  height: 92vh !important;

  #header {
    margin: 16px 0 32px 0;
    text-align: center;
    font-size: 18px;
    line-height: 1.33;
  }

  #listing-options {
    display: flex;
    justify-content: flex-end;

    #filter-button {
      display: none;
      margin-left: 20px;
      margin-bottom: 5px;
      font-size: 18px;
      font-weight: 700;
    }

    #total-results {
      text-align: right;
      margin-right: 16px;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.2px;
      text-transform: uppercase;
      color: #8a8a8a;
      font-weight: 600;
    }
  }
}

@media only screen and (max-width: 800px) {
  #listing-options {
    justify-content: space-between !important;
    #filter-button {
      display: block !important;
    }
  }
}
</style>
