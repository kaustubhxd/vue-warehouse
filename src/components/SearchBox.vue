<template>
<div id="search-box">
    <div class="labels">
     <p class="search-label">{{label}}</p>
     <p class='clear-search' v-show="value.length > 0" v-on:click="clearValue()">Clear</p>
    </div>
    <Multiselect v-if="type =='single'" v-model="value" :options="options" :searchable="false" 
      :close-on-select="true" :show-labels="false" placeholder=""></Multiselect>
    <Multiselect v-else v-model="value" tag-placeholder="Add this as new tag" placeholder="" 
      label="value" track-by="id" :options="options" :multiple="true" :taggable="true" @tag="addTag"></Multiselect>
</div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
    props : ['options','label','type'],
    components: {
        Multiselect
    },
    data: function(){
        return{
            value: [],
        }
    },
    methods: {
    addTag (newTag) {
        const tag = {
            name: newTag,
            code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.options.push(tag)
        this.value.push(tag)
    },
    clearValue(){
        this.value = []
    }
}
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
            color: lightcoral;

            &:hover {
                color : coral;
            }
        }
    }
}
</style>