import Vue from 'vue'
import Vuex from 'vuex'
import data from './data.js'

Vue.use(Vuex)

  // const moduleA = {
  //   state: () => ({ namex : 'hehe' }),
  // }

const store = new Vuex.Store({
  strict : true,
  state: {  data, 
            filters : {
              warehouse : [],
              city      : '',
              cluster   : '',
              availSpace: [],
              availSpaceDefault : [],
              availSpaceReset : true,
              is_live : false,
              is_registered : false,
        }
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
    getFilters: state => {
      return {
        warehouse : state.filters.warehouse,
        city      : state.filters.city,
        cluster   : state.filters.cluster,
        availSpace : state.filters.availSpace,
        availSpaceReset : state.filters.availSpaceReset,  
        is_live : state.filters.is_live,
        is_registered : state.filters.is_registered,
      }
    }
  },
  mutations: {
    setSliderMinMax (state, {min,max}){
      state.filters.availSpaceDefault = [min,max]
      state.filters.availSpace = [min,max]
    },
    updateFilter (state, {searchBy, value}) {
      console.log(state.filters[searchBy])
      console.log(value)
      if (searchBy === 'warehouse'){
        state.filters.city = ''
        state.filters.cluster = ''
        state.filters.availSpace = state.filters.availSpaceDefault
        if (state.filters[searchBy].includes(value)){
          state.filters[searchBy].pop(value)
        }else{
          state.filters[searchBy].push(value)
        }
      }else{
        state.filters.warehouse = []
        state.filters[searchBy] = value
      }
    },
    clearFilter (state, searchBy) {
      state.filters[searchBy] = (searchBy === 'warehouse' ? [] : '')
    },
    clearAllFilters (state) {
      state.filters.warehouse = [],
      state.filters.city      = ''
      state.filters.cluster   = ''
      state.filters.availSpace= []
      state.filters.availSpaceDefault = []
      state.filters.availSpaceReset = true
      state.filters.is_live = false
      state.filters.is_registered = false
    },
    updateSlider(state, {range}){
      console.log(range, state.filters.availSpaceDefault)
      state.filters.availSpace = range
      if(JSON.stringify(range) === JSON.stringify(state.filters.availSpaceDefault)){
        // console.log('clearing slider')
        state.filters.availSpaceReset = true
      }else{
        state.filters.availSpaceReset = false
      }
    },
    clearSlider(state,{min,max}) { 
      state.filters.availSpace = [min,max]
      state.filters.availSpaceReset = true
    },
    setUserValue(state,{id,type,value}){
      state.data[id][type] = value
    }
  },
  actions: {
    setSliderMinMaxAction({commit,getters}){
      commit('setSliderMinMax', getters.availSpaceRange )
    },
    updateFilterAction ({ commit }, payload) {
      console.log(payload)
      
      commit('updateFilter', payload)
    },
    clearFilterAction({ commit }, searchBy) {
      // console.log(searchBy)
      commit('clearFilter', searchBy)
    },
    clearAllFiltersAction({ commit }) {
      commit('clearAllFilters')
    },
    updateSliderAction ({ commit }, payload) {
      // console.log(payload)
  
      commit('updateSlider', payload)
    },
    clearSliderAction({ commit}, defaultRange ) {
      // console.log(defaultRange)
      commit('clearSlider',defaultRange)
    },
    setUserValueAction({ commit}, payload){
      console.log(payload)
      commit('setUserValue',payload)
    }
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

// computed:{
//   filteredItems:function(){
//     var self=this;
//     return self.items.filter(function(val){
//       return val.indexOf(self.query)!== -1;
//     })
//   }
// }

// Object.entries(streamers.value).slice(6, ).filter(([key, info]) => info.isLive == true)

// Object.entries(data).map(a => a[1]['name'])