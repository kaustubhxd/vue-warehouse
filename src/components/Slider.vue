<template>
    <div>
        <div class="labels">
            <p class="search-label">{{label}}</p>
            <p class='clear-search' v-show="userMinMax[0] != range.min || userMinMax[1] != range.max" @click="clearRange()">Clear</p>
        </div>        
        <VueSlider v-model="userMinMax" :lazy='true' :min="range.min" :max="range.max"
            @change="updateSliderAction({range : $event})">
        </VueSlider>
        <div class="ranges">
            <p>{{userMinMax[0]}}</p>
            <p>{{userMinMax[1]}}</p>
        </div>
        <!-- {{range}}
    {{userMinMax}} -->
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import { mapActions } from 'vuex'
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
            this.clearSliderAction(this.range)
        },
        ...mapActions('filtersMod',['updateSliderAction','clearSliderAction'])

        

    },
    
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
        color: $stockarea-red;

        &:hover, &:active, &:focus {
            color : $stockarea-red-deep;
        }
    }
}
</style>