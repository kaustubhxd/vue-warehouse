<template>
  <div>
        <div class="labels">
            <p class="search-label">Filter by status</p>
            <p class='clear-search' v-show="filters.is_registered || filters.is_live" v-on:click="clearBothFilters()">Clear</p>
        </div>
        <div id='pill-filters'>
            <div class="pill available noselect" :class="{ 'pill-select' : filters.is_registered}" 
                @click="updateFilterAction({value : !filters.is_registered,searchBy : 'is_registered'})">Registered</div>
            <div class="pill live noselect" :class="{ 'pill-select' : filters.is_live}" 
                 @click="updateFilterAction({value : !filters.is_live,searchBy : 'is_live'})">Live</div>
        </div>
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
export default {
    data() {
        return {
            pillSelected: {
                is_registered   : false,
                is_live         : false,
            }
        }
    },
    computed : {
        ...mapGetters({
        filters: "filtersMod/getFilters"
      })
    },
    methods :{
        ...mapActions( 'filtersMod', ['updateFilterAction', 'clearFilterAction']),
        clearBothFilters(){
            this.clearFilterAction('is_live')
            this.clearFilterAction('is_registered')
        }
        // toggleEditMode(){
        //     this.editMode = !this.editMode
        // },
    }
}
</script>

<style lang='scss' scoped>
        .labels{
                margin-top: 10px;
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

        
        #pill-filters{

            display: flex;
            margin-top: 7px;
                .pill{
                    padding: 6px 12px;
                    border-radius: 14px;
                    font-size: 14px;
                    color: #666;
                    line-height: 16px;
                    margin-right: 8px;
                    cursor : pointer;
                }

                .available{
                    background: lightcyan;
                }

                .live{
                    background: lavender;
                }
        }

.pill-select{
    border : 2px solid $stockarea-red;
}
</style>