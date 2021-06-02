<template>
    <div id="listing">
        <div id="header"><h2>Browse Warehouses</h2></div> 
        <div id="cards">
            <Card/>
            <Card/>
            <Card/>
        </div>

    </div>
    
</template>

<script>
import Card from './Card'

export default {
    components : {Card}
}
</script>

<style lang='scss' scoped>
    #listing{
        flex : 1;
        background : lemonchiffon;

        #header{
            margin : 16px 0 32px 0;
            text-align: center;
            font-size: 18px;
            line-height: 1.33;
        }

    }
</style>