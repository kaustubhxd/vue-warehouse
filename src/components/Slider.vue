<template>
    <div>
        <div class="labels">
            <p class="search-label">{{label}}</p>
            <p class='clear-search' v-show="userMinMax[0] != range.min || userMinMax[1] != range.max" v-on:click="clearRange()">Clear</p>
        </div>        
        <VueSlider v-model="userMinMax" :min="range.min" :max="range.max"></VueSlider>
        <div class="ranges">
            <p>{{userMinMax[0]}}</p>
            <p>{{userMinMax[1]}}</p>
        </div>

    </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
export default {
    props: ['range','label'],
    data(){
        return {
            userMinMax: [this.range.min,this.range.max]
        }
    },
    components: {
        VueSlider
    },
    methods : {
        clearRange(){
            this.userMinMax = [this.range.min,this.range.max]
        }
    }
}
</script>

<style src='vue-slider-component/theme/default.css'></style>

<style lang="scss" scoped>
.ranges{
    display: flex;
    justify-content: space-between;
}
p{
        font-weight: 700;
        font-size: 14px;
        color: #333;
        margin-bottom: 6px; 
}

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
        color: lightcoral;

        &:hover {
            color : coral;
        }
    }
}
</style>