<template>
  <div id='not-found'>
        <div id="meow-header"><p>Currently, we have no listings matching your filter. <span id='clear-filter' @click="clearAllFiltersAction">Clear filter?</span></p></div>
        <div v-show="meoURL != ''">
            <img id='cat-image' :src="meoURL" alt="" @click='fetchMeow'>
            <div id="meow-footer"> <p>Meanwhile, here's a cat for you ❤</p> </div> 
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            meoURL : ''
        }
    },
  methods : {
    ...mapActions('filtersMod',['clearAllFiltersAction']),
    fetchMeow : function () {
        axios
        .get(`https://robohash.org/${Math.random()}?set=set4`, {responseType:'blob'})
            .then(response => response.data)
            .then( blob => this.meoURL = URL.createObjectURL(blob) )
    }
  },
    mounted: function() {
        this.fetchMeow()
    }
}
</script>

<style lang='scss' scoped>
#not-found{
    margin-top: 50px;
    text-align: center;

    #clear-filter{
        color : $stockarea-red;
        cursor: pointer;

        &:hover{
            color : $stockarea-red-deep
        }
    }
}

p{
    font-weight: 700;
    font-size: 16px;
    color: #333;
    margin-bottom: 6px;
    margin : 10px 0;
}

img{
    width : 200px;
    cursor : pointer;
}


</style>