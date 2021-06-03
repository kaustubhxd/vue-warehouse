import Vue from 'vue'
import Vuex from 'vuex'
import data from './data.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: data,
  mutations: {
  },
  getters: {
    warehouseNames: state => {
      return reformatUniqueData(state,'name')
    },
    cityNames: state => {
      return reformatData(state,'city')
    },
    clusterNames: state => {
      return reformatData(state, 'cluster')
    },
    availSpaceRange: state => {
      return getMinMax(state)
    }
  },
  actions: {
  },
  modules: {
  }
})

// formattion data to output an array of objects including warehouse id and any other property we want 
function reformatUniqueData(state, property){
  let names = []
      Object.entries(state).map(obj => [obj[1]['id'],obj[1][property]] )
        .forEach(element => names.push( { id : element[0], value : element[1] }));
    return names
}

function reformatData(state, property){
      return [...new Set(Object.entries(state).map(obj => obj[1][property]))] 
    
}

function getMinMax(state) {
  var availSpace =  Object.entries(state).map(obj => obj[1]['space_available'] )
  return availSpace.reduce(({min, max}, v) => ({
    min: min < v ? min : v,
    max: max > v ? max : v,
  }), { min: availSpace[0], max: availSpace[0] });
}


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