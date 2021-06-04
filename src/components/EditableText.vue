<template>
    <div class="editable-text">
        <div v-if="!editing">
            <span class='text' :style="customStyle" >{{value}}</span>
            <img id='edit-text' v-show='isEditable' class='icon' src="@/assets/edit.svg" alt="Edit" @click="enableEditing">
        </div>
        <div v-if="editing">
            <input :style="{ width : inputWidth}" v-model="tempValue" ref="editable" class="input" @keyup.enter="saveEdit" />
            <img id='cancel-text' class='icon' src="@/assets/cancel.svg" alt="Cancel" @click="disableEditing">
            <!-- <button @click="disableEditing"> Cancel </button> -->
            <img id='save-text' class='icon' src="@/assets/save.svg" alt="Save" @click="saveEdit">
            <!-- <button @click="saveEdit"> Save </button> -->
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props : ['customStyle','inputWidth' ,'value','isEditable','origin'],
    data() {
        return{
            tempValue: null,
            editing: false,
            savedValue : '',
        }
  },
  methods: {
        ...mapActions(['setUserValueAction']),
        enableEditing: function(){
            this.tempValue = this.value;
            this.editing = true;
            this.focusInput()
        },
        disableEditing: function(){
            this.tempValue = null;
            this.editing = false;
        },
        saveEdit: function(){
            // However we want to save it to the database
            if(this.tempValue) { this.savedValue = this.tempValue; }
            this.setUserValueAction({ id: this.origin.id,type : this.origin.type,value : this.tempValue})
            this.disableEditing();
        },
        focusInput() {
            setTimeout(() => {
                // // console.log(this.$refs)
                this.$refs.editable.focus();
            },500)
        },
    },
    mounted : function() {
        this.savedValue = this.value
    }
}
</script>



<style scoped>

input {
    width: 130px;
    padding: 5px 5px;
    font-size: 15px;
    line-height: 1.42857143;
    color: #2c3e50;
    background-color: #ffffff;
    background-image: none;
    border: 1px solid #dce4ec;
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}

.icon{
    width : 20px;
    margin-left : 5px;
    cursor: pointer;
}

#save-text, #cancel-text{
    margin-bottom: -5px;
}
</style>