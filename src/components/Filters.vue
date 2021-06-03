<template>
    <div id="filters">
        <div id="header"><h3>Filters</h3></div> 


        <!-- <label class="typo__label">Tagging</label> -->
          <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
        <!-- {{warehouseNames}} -->
        <!-- {{warehouseNames}} -->
        <SearchBox :options='warehouseNames' label='Search by Warehouse Name' type='multi'/>
        <SearchBox :options='cityNames' label='Filter by City' type='single'/>
        <SearchBox :options='clusterNames' label='Filter by Cluster' type='single'/>
        <Slider :range='availSpaceRange' label='Filter by Available Space'/>
    </div>
</template>

<script>
import SearchBox from './SearchBox'
import Slider from './Slider'

export default {
    components: {
        SearchBox, Slider
    },
    data: function(){
        return{
            
        }
    },
    computed: {
        warehouseNames () {
            return this.$store.getters.warehouseNames
        },
        cityNames () {
            return this.$store.getters.cityNames
        },
        clusterNames () {
            return this.$store.getters.clusterNames
        },
        availSpaceRange () {
            return this.$store.getters.availSpaceRange
        }
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
    #filters {
        width : 300px;
        background: pink;
        overflow-x: hidden;
        overflow-y: auto;
        border: 1px solid #EEE;
        width: 316px;
        overflow-y: auto;
        border-radius: 6px;
        padding:  23px;
        padding-top: 0;
        background: #fff;
        max-height: 562px;
        padding-top: 16px;
        margin-top : 20px;

        #header{
            margin : 16px 0 32px 0;
            text-align: center;
            font-size: 18px;
            line-height: 1.33;
        }

        .search{
            .search-label{
                font-weight: 700;
                font-size: 14px;
                color: #333;
                margin-bottom: 4px;
            }


            .search-box{
                display: flex;
                flex-wrap: wrap;
                padding: 3px 11px;
                width: 250px;
            }
        }
    }
</style>
