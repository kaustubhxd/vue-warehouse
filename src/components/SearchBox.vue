<template>
<div id="search-box">
    <div class="labels">
     <p class="search-label">{{label}}</p>
     <p class='clear-search' v-show="filters[searchBy].length > 0" v-on:click="clearFilterAction(searchBy)">Clear</p>
    </div>
    <Multiselect v-if="type =='single'" :value='filters[searchBy]' :options="options" :searchable="true" 
      :close-on-select="true" :show-labels="false" placeholder="" @select="updateFilterAction({value : $event,searchBy})"></Multiselect>
    <Multiselect v-else :value='filters[searchBy]' tag-placeholder="Add this as new tag" placeholder="" 
      label="value" track-by="id" :options="options" :multiple="true" :taggable="true" @select="updateFilterAction({value : $event,searchBy})" @remove="updateFilterAction({value : $event,searchBy})"></Multiselect>
</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import  { mapActions, mapGetters } from 'vuex'

export default {
    props : ['searchBy','options','label','type'],
    components: {
        Multiselect
    },
    // data: function(){
    //     return{
    //         localValue: '',
    //     }
    // },
    computed : {
        ...mapGetters({
        filters: 'filtersMod/getFilters'
      })
    },
    methods: {
        ...mapActions( 'filtersMod', ['updateFilterAction', 'clearFilterAction']),
    },
    // mounted: function() {
    //    if (this.filters){
    //       this.localValue = this.filters[this.searchBy]
    //    }
    // }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>

#search-box{
    margin: 20px 0;

    .labels{
            display: flex;
            justify-content: space-between;

        .search-label, .clear-search{
            font-weight: 700;
            font-size: 14px;
            color: #333;
            margin-bottom: 6px;    
        }

        .clear-search{
            cursor: pointer;
            color: $stockarea-red;

            &:hover, &:active, &:focus {
                color : $stockarea-red-deep;
            }
        }
    }
}
</style>