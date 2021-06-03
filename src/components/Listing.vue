<template>
    <div id="listing">
        <div id="header"><h3>Browse Warehouses</h3></div> 
        <div id="cards" v-for='(listing,id) in listings' :key='id' >
            <Card :id='id' :listing="listing"/>
        </div>

    </div>
    
</template>

<script>
import Card from './Card'
// import {mapGetters} from 'vuex'

export default {
    components : {Card},
    computed: {
        listings() { return this.$store.state }
    }
}
</script>

<style lang='scss' scoped>
    #listing{
        flex : 1;
        overflow-y: auto;
        height : 100vh;

        #header{
            margin : 16px 0 32px 0;
            text-align: center;
            font-size: 18px;
            line-height: 1.33;
        }

    }
</style>