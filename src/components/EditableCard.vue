<template>
  <div id="card">
      <div id='card-header'>
        <div>
            <EditableText :value="listing.name" :origin="{id,type: 'name'}"  :isEditable='editMode' inputWidth='200px'  
                :customStyle="{'color' : '#484848', 'font-size':'18px', 'margin-bottom':'5px', 'font-weight':'700'}" />
            <EditableText :value="listing.city" :origin="{id,type: 'city'}"  :isEditable='editMode' inputWidth='130px'  
                :customStyle="{'color' : '#8A8A8A', 'font-size':'14px','font-weight':'700'}" />
        </div>
        <a id='edit-text-prompt' class='red-link' @click="toggleEditMode()"> {{ editMode? 'Finish Editing' : 'Edit Info' }}</a>
      </div>
      <div id="details-row">
            <div class="detail">
                <div class="detail-header">Type</div>
                <EditableText :value="listing.type" :origin="{id,type: 'type'}"  :isEditable='editMode' 
                    :customStyle="{'color' : '#333', 'font-size':'14px', 'line-height':'1.57143', 'font-weight':'400'}" />
            </div>
            <div class="detail">
                <div class="detail-header">Space Available</div>
                <EditableText :value="listing.space_available" :origin="{id,type: 'space_available'}" :isEditable='editMode'
                     inputWidth='70px'  :customStyle="{'color' : '#333', 'font-size':'14px', 'line-height':'1.57143', 'font-weight':'400'}" />
            </div>
            <div class="detail">
                <div class="detail-header">Cluster</div>
                <EditableText :value="listing.cluster" :origin="{id,type: 'cluster'}"  :isEditable='editMode' 
                    :customStyle="{'color' : '#333', 'font-size':'14px', 'line-height':'1.57143', 'font-weight':'400', 'text-transform': 'uppercase'}" />
            </div>
            <div class="detail">
              <div class="detail-header">Code</div>
                <EditableText :value="listing.code" :origin="{id,type: 'code'}"  :isEditable='editMode'  
                    :customStyle="{'color' : '#333', 'font-size':'14px', 'line-height':'1.57143', 'font-weight':'400'}" />
            </div>
      </div>
      <div id="footer-row">
          <div class="pills">
            <div class="pill available noselect" :class="{ 'pill-edit' : editMode, 'pill-deselect' : !listing.is_registered}" v-if="listing.is_registered || editMode" @click="pillToggle('is_registered')">Registered</div>
            <div class="pill live noselect" :class="{ 'pill-edit' : editMode, 'pill-deselect' : !listing.is_live}" v-if="listing.is_live || editMode" @click="pillToggle('is_live')">Live</div>
          </div>
        </div>
        <slot></slot>
  </div>
</template>

<script>
import EditableText from '@/components/EditableText.vue'
import { mapActions } from 'vuex'

export default {
    components: {EditableText},
    props: ['id','listing'],
    data(){
        return{
            editMode : false,
        }
    },
    methods :{
        ...mapActions(['setUserValueAction']),
        toggleEditMode(){
            this.editMode = !this.editMode
        },
        pillToggle(type){
            if(this.editMode){
                // // console.log(type)
                // // console.log('pill clicked')
                this.setUserValueAction({ id: this.id,type, value: !this.listing[type]})
            }
        }
    }

}
</script>

<style lang="scss" scoped>
    #card{
        background: #fff;
        padding: 23px;
        margin-bottom: 24px;
        border: 1px solid #EEE;
        box-shadow: 0 1px 2px rgba(0,0,0,.08);
        border-radius: 6px;
        margin : 16px;

        #card-header{
            display: flex;
            justify-content: space-between;


            #edit-text-prompt{
                font-size: 16px;
                font-weight: 700;
            }
        }

        #details-row{
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;

            .detail{
                margin: 0 32px 0 0;

                    .detail-header{
                        font-size: 12px;
                        line-height: 16px;
                        letter-spacing: .5px;
                        text-transform: uppercase;
                        color: #8A8A8A;
                        font-weight: 600;
                    }

            }

        }

        #footer-row{
            margin-top : 20px;
            display: flex;
            justify-content: space-between;


            .pills{
                display: flex;

                .pill{
                    padding: 6px 12px;
                    border-radius: 14px;
                    font-size: 14px;
                    color: #666;
                    line-height: 16px;
                    margin-right: 8px;
                }

                .available{
                    background: lightcyan;
                }

                .live{
                    background: lavender;
                }
            }

            #view-details{
                text-decoration: none;
                color: #008BDC;
                cursor: pointer;
                line-height: 1.14285714;
                font-size: 14px;
                font-weight: bold;
                letter-spacing: .2px;
                align-self: flex-end;

                &:hover,&:active{
                    color: #186795
                }
            }

        }
    }

.pill-edit{
    border : 2px solid black;
    cursor: pointer;
}

.pill-deselect{
    background: white !important;
}

@media only screen and (max-width: 450px) {

    #card-header{
        flex-direction: column;

        #edit-text-prompt {
            margin-top: 5px;
        }
    }
}
</style>
