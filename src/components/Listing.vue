<template>
    <div id="listing">
        <div id="header"><h3>Browse Warehouses</h3></div> 
        <div id='total-results'>{{totalResults}} {{totalResults === 1 ? 'result' : 'results'}} found</div>

        <div v-if="totalResults > 0">
            <div id="cards"  v-for='(listing,id) in listings' :key='id' >
                <Card :id='id' :listing="listing"/>
            </div>
        </div>
        <div v-else>
            <NoListingFound/>
        </div>
    </div>
</template>

<script>
import Card from './Card'
import NoListingFound from './NoListingFound'
import { mapGetters} from 'vuex'

export default {
    components : {Card, NoListingFound},
    data(){
        return {
            listings: '',
            appliedFilters : {
                warehouse : [],
                city : '',
                cluster : '',
                availSpace : '',
                is_live : false,
                is_registered : false
            }
        }
    },
    computed: {
        ...mapGetters(['getData','getFilters']),
         totalResults() { return Object.keys(this.listings).length }
        
    },
      watch: {
        '$store.state.filters': {
                immediate: true,
                deep : true,
                handler() {
                // update locally relevant data
                // this.someLocalValue = this.$store.state.data.someKey;
                var {warehouse, city, cluster,availSpace,availSpaceReset, is_live,is_registered} = this.getFilters
                console.log(warehouse.length === 0,!city,!cluster,availSpaceReset )

                // check if filters have been cleared
                if( warehouse.length === 0 && !city && !cluster && availSpaceReset && !is_live && !is_registered){
                    console.log('filters cleared')
                    this.listings = this.getData
                    this.appliedFilters = { warehouse : [], city : '', cluster : '', availSpace : '',is_live : false, is_registered : false } 
                }else{
                    console.log('filters applied')
                    this.listings = this.getData
                    // check if warehouse filter is applied
                    if(warehouse.length){
                        var warehouses = warehouse.map(x => x.value)
                        console.log(warehouses)
                        this.listings = Object.fromEntries(Object.entries(this.getData).filter(([key]) => {
                            // console.log(this.getData[key].name)
                            return warehouses.includes(this.getData[key].name)
                        }))
                    }else {
                        var {xwarehouse,xcity,xcluster ,xavailSpace} = this.appliedFilters
                        this.appliedFilters = {  xwarehouse : xwarehouse,
                                                city : xcity === city ? city : '',
                                                 cluster : xcluster === cluster ? cluster : '', 
                                                 availSpace : JSON.stringify(xavailSpace) === JSON.stringify(availSpace) ? availSpace : []  
                                            } 
                        // check if city filter is applied
                        if(city && this.appliedFilters['city'] !== city){
                            this.listings = Object.fromEntries(Object.entries(this.listings).filter(([key]) => {
                                // console.log(this.getData[key].name)
                                return (this.getData[key]['city']) == city 
                            }))
                            this.appliedFilters['city'] = city
                        // check if cluster filter is applied
                        }
                        if(cluster && this.appliedFilters['cluster'] !== cluster){
                            this.listings = Object.fromEntries(Object.entries(this.listings).filter(([key]) => {
                                    // console.log(this.getData[key].name)
                                    return (this.getData[key]['cluster']) == cluster
                            }))
                            this.appliedFilters['cluster'] = cluster
                        }
                        if (!availSpaceReset && JSON.stringify(this.appliedFilters.availSpace) !== JSON.stringify(availSpace)){
                            console.log('slider slided')
                            this.listings = Object.fromEntries(Object.entries(this.listings).filter(([key]) => {
                                    // console.log(this.getData[key].name)
                                    return  availSpace[0] <= (this.getData[key]['space_available']) &&  
                                                availSpace[1] >= (this.getData[key]['space_available'])
                            }))
                        }
                        if(is_live && this.appliedFilters['is_live'] !== is_live){
                            this.listings = Object.fromEntries(Object.entries(this.listings).filter(([key]) => {
                                    // console.log(this.getData[key].name)
                                    return (this.getData[key]['is_live']) == is_live
                            }))
                            this.appliedFilters['is_live'] = is_live
                        }
                        if(is_registered && this.appliedFilters['is_registered'] !== is_registered){
                            this.listings = Object.fromEntries(Object.entries(this.listings).filter(([key]) => {
                                    // console.log(this.getData[key].name)
                                    return (this.getData[key]['is_registered']) == is_registered
                            }))
                            this.appliedFilters['is_registered'] = is_registered
                        }
                    }
                }
            }
        }
    },
    mounted: function() {
       this.listings = this.getData
    }
}
</script>

<style lang='scss' scoped>
    #listing{
        flex : 1;
        overflow-y: auto;
        height : 88vh;

        #header{
            margin : 16px 0 32px 0;
            text-align: center;
            font-size: 18px;
            line-height: 1.33;
        }

        #total-results{
            text-align: right;
                margin-right: 16px;
                font-size: 12px;
                line-height: 16px;
                letter-spacing: .2px;
                text-transform: uppercase;
                color: #8A8A8A;
                font-weight: 600;
        }

    }
</style>