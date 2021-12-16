import Vue from "vue";
import Vuex from "vuex";
import { filtersMod } from "./filters";
import { dbFetchEverything } from "../scripts/sql/db_operations";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: { data: {}, isFetchingData: true, listingScrollTop: 0 },
  getters: {
    getData: (state) => state.data,
    getIsFetchingData: (state) => state.isFetchingData,
    warehouseNames: (state) => {
      return reformatDataAsArrayObject(state, "w_name");
    },
    cityNames: (state) => {
      return reformatDataAsArray(state, "city");
    },
    clusterNames: (state) => {
      return reformatDataAsArray(state, "cluster");
    },
    availSpaceRange: (state) => {
      return getMinMax(state, "space_available");
    },
  },
  mutations: {
    setSliderMinMax(state, { min, max }) {
      console.log("setting slider min max", min, max);

      state.filtersMod.filters.availSpaceDefault = [min, max];
      state.filtersMod.filters.availSpace = [min, max];
    },
    setUserValue(state, { id, type, value }) {
      state.data[id][type] = value;
    },
    setListingScrollTop(state, { scrollTop }) {
      state.listingScrollTop = scrollTop;
    },
    setWarehouseData(state, warehouses) {
      state.data = warehouses;
    },
    setIsFetchingData(state, isFetching) {
      state.isFetchingData = isFetching;
    },
  },
  actions: {
    setSliderMinMaxAction({ commit, getters }) {
      commit("setSliderMinMax", getters.availSpaceRange);
    },
    setUserValueAction({ commit }, payload) {
      // // console.log(payload)
      commit("setUserValue", payload);
    },
    setListingScrollTopAction({ commit }, payload) {
      commit("setListingScrollTop", payload);
    },
    setWarehouseDataAction({ commit }, payload) {
      commit("setWarehouseData", payload);
    },
    setIsFetchingDataAction({ commit }, payload) {
      commit("setIsFetchingData", payload);
    },
  },
  modules: {
    filtersMod,
  },
});

// formattion data to output an array of objects including warehouse id and any other property we want
function reformatDataAsArrayObject({ data }, property) {
  let names = [];
  Object.entries(data)
    .map((obj) => [obj[1].id, obj[1][property]])
    .forEach((element) => names.push({ id: element[0], value: element[1] }));
  return names;
}

function reformatDataAsArray({ data }, property) {
  return [...new Set(Object.entries(data).map((obj) => obj[1][property]))];
}

function getMinMax({ data }, property) {
  console.log("getting min max");
  var availSpace = Object.entries(data).map((obj) => obj[1][property]);
  return availSpace.reduce(
    ({ min, max }, v) => ({
      min: min < v ? min : v,
      max: max > v ? max : v,
    }),
    { min: availSpace[0], max: availSpace[0] }
  );
}

store.dispatch("setSliderMinMaxAction");
dbFetchEverything();

export default store;
