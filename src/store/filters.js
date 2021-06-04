

export const filtersMod = {
    namespaced : true,
    state: () => ({
      filters : {
        warehouse : [],
        city      : '',
        cluster   : '',
        availSpace: [],
        availSpaceDefault : [],
        availSpaceReset : true,
        is_live : false,
        is_registered : false,
      },
    }),
    getters: {
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
      },
      availSpaceRange: state => {
        return getMinMax(state,'space_available')
      },
    },
    mutations: {
      updateFilter (state, {searchBy, value}) {
        // console.log(state.filters[searchBy])
        // console.log(value)
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
        // console.log(range, state.filters.availSpaceDefault)
        state.filters.availSpace = range
        if(JSON.stringify(range) === JSON.stringify(state.filters.availSpaceDefault)){
          // // console.log('clearing slider')
          state.filters.availSpaceReset = true
        }else{
          state.filters.availSpaceReset = false
        }
      },
      clearSlider(state,{min,max}) { 
        state.filters.availSpace = [min,max]
        state.filters.availSpaceReset = true
      },
    },
    actions: {
      updateFilterAction ({ commit }, payload) {
        // console.log(payload)
        
        commit('updateFilter', payload)
      },
      clearFilterAction({ commit }, searchBy) {
        // // console.log(searchBy)
        commit('clearFilter', searchBy)
      },
      clearAllFiltersAction({ commit }) {
        commit('clearAllFilters')
      },
      updateSliderAction ({ commit }, payload) {
        // // console.log(payload)
    
        commit('updateSlider', payload)
      },
      clearSliderAction({ commit}, defaultRange ) {
        // // console.log(defaultRange)
        commit('clearSlider',defaultRange)
      },
    },
  }
  

function getMinMax({data},property) {
    var availSpace =  Object.entries(data).map(obj => obj[1][property] )
    return availSpace.reduce(({min, max}, v) => ({
      min: min < v ? min : v,
      max: max > v ? max : v,
    }), { min: availSpace[0], max: availSpace[0] });
}