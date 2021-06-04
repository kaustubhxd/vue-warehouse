import Vue from 'vue'
import Vuex from 'vuex'
import data from './data.js'
import {filtersMod} from './filters'  

Vue.use(Vuex)

const store = new Vuex.Store({
  strict : true,
  state: {  data,
            listingScrollTop : 0,
  },
  getters: {
    getData: state => state.data,
    warehouseNames: state => {
      return reformatDataAsArrayObject(state,'name')
    },
    cityNames: state => {
      return reformatDataAsArray(state,'city')
    },
    clusterNames: state => {
      return reformatDataAsArray(state, 'cluster')
    },
    availSpaceRange: state => {
      return getMinMax(state,'space_available')
    },
  },
  mutations: {
    setSliderMinMax (state, {min,max}){
      state.filtersMod.filters.availSpaceDefault = [min,max]
      state.filtersMod.filters.availSpace = [min,max]
    },
    setUserValue(state,{id,type,value}){
      state.data[id][type] = value
    },
    setListingScrollTop(state,{scrollTop}){
      state.listingScrollTop = scrollTop
    },
  },
  actions: {
    setSliderMinMaxAction({commit,getters}){
      commit('setSliderMinMax', getters.availSpaceRange )
    },
    setUserValueAction({ commit}, payload){
      // // console.log(payload)
      commit('setUserValue',payload)
    },
    setListingScrollTopAction({ commit}, payload){
      commit('setListingScrollTop',payload)
    },
  },
  modules : {
    filtersMod
  }
})

// formattion data to output an array of objects including warehouse id and any other property we want 
function reformatDataAsArrayObject({data}, property){
  let names = []
      Object.entries(data).map(obj => [obj[1].id,obj[1][property]] )
        .forEach(element => names.push( { id : element[0], value : element[1] }));
    return names
}

function reformatDataAsArray({data}, property){
      return [...new Set(Object.entries(data).map(obj => obj[1][property]))] 
}

function getMinMax({data},property) {
  var availSpace =  Object.entries(data).map(obj => obj[1][property] )
  return availSpace.reduce(({min, max}, v) => ({
    min: min < v ? min : v,
    max: max > v ? max : v,
  }), { min: availSpace[0], max: availSpace[0] });
}

store.dispatch('setSliderMinMaxAction')

export default store