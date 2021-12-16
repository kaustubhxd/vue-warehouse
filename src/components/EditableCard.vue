<template>
  <div id="card">
    <div id="card-header">
      <div>
        <EditableText
          v-on:newValue="pushNewValue"
          :value="listing['w_name']"
          :origin="{ id, type: 'w_name' }"
          :isEditable="editMode"
          inputWidth="200px"
          :customStyle="{ color: '#484848', 'font-size': '18px', 'margin-bottom': '5px', 'font-weight': '700' }"
        />
        <EditableText
          v-on:newValue="pushNewValue"
          :value="listing.city"
          :origin="{ id, type: 'city' }"
          :isEditable="editMode"
          inputWidth="130px"
          :customStyle="{ color: '#8A8A8A', 'font-size': '14px', 'font-weight': '700' }"
        />
      </div>
      <div>
        <a id="text-prompt" class="red-link" @click="toggleEditMode()">
          {{ editMode ? "Finish Editing" : "Edit Info" }}</a
        >
        <a
          id="text-prompt"
          class="red-link"
          v-confirm="{
            html: true,
            type: 'hard',
            ok: deleteWarehouse,
            cancel: () => null,
            message: `Warehouse entry will be <p style='display:inline-block;color:red'>permanantly</p> deleted. Are you sure?`,
            okText: 'Delete Warehouse',
            reverse: true,
            cancelText: 'Cancel',
            verification: getWarehouseName(),
            verificationHelp: `Please enter warehouse name to proceed`,
          }"
        >
          Delete Warehouse</a
        >
      </div>
    </div>
    <div id="details-row">
      <div class="detail">
        <div class="detail-header">Type</div>
        <EditableText
          v-on:newValue="pushNewValue"
          :value="listing['w_type']"
          :origin="{ id, type: 'w_type' }"
          :isEditable="editMode"
          :customStyle="{ color: '#333', 'font-size': '14px', 'line-height': '1.57143', 'font-weight': '400' }"
        />
      </div>
      <div class="detail">
        <div class="detail-header">Space Available</div>
        <EditableText
          v-on:newValue="pushNewValue"
          :value="listing.space_available"
          :origin="{ id, type: 'space_available' }"
          :isEditable="editMode"
          inputWidth="70px"
          :customStyle="{ color: '#333', 'font-size': '14px', 'line-height': '1.57143', 'font-weight': '400' }"
        />
      </div>
      <div class="detail">
        <div class="detail-header">Cluster</div>
        <EditableText
          v-on:newValue="pushNewValue"
          :value="listing.cluster"
          :origin="{ id, type: 'cluster' }"
          :isEditable="editMode"
          :customStyle="{
            color: '#333',
            'font-size': '14px',
            'line-height': '1.57143',
            'font-weight': '400',
            'text-transform': 'uppercase',
          }"
        />
      </div>
      <div class="detail">
        <div class="detail-header">Code</div>
        <EditableText
          v-on:newValue="pushNewValue"
          :value="listing.code"
          :origin="{ id, type: 'code' }"
          :isEditable="editMode"
          :customStyle="{ color: '#333', 'font-size': '14px', 'line-height': '1.57143', 'font-weight': '400' }"
        />
      </div>
    </div>
    <div id="footer-row">
      <div class="pills">
        <div
          class="pill available noselect"
          :class="{ 'pill-edit': editMode, 'pill-deselect': !listing.is_registered }"
          v-if="listing.is_registered || editMode"
          @click="pillToggle('is_registered')"
        >
          Registered
        </div>
        <div
          class="pill live noselect"
          :class="{ 'pill-edit': editMode, 'pill-deselect': !listing.is_live }"
          v-if="listing.is_live || editMode"
          @click="pillToggle('is_live')"
        >
          Live
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import EditableText from "@/components/EditableText.vue";
import { mapActions } from "vuex";
import { dbDeleteWarehouse, dbUpdateWarehouse } from "../scripts/sql/db_operations";

export default {
  components: { EditableText },
  props: ["id", "listing"],
  data() {
    return {
      editMode: false,
      edited: false,
      edits: {},
    };
  },
  methods: {
    ...mapActions(["setUserValueAction"]),
    toggleEditMode() {
      this.editMode = !this.editMode;
      if (this.editMode) {
        this.edited = true;
      }
      if (!this.editMode && this.edited) {
        console.log("edited!");
        if (Object.entries(this.edits).length > 0) {
          console.log(this.edits);
          dbUpdateWarehouse(this.listing.code, this.edits);
        }
        this.edited = false;
      }
    },
    pillToggle(type) {
      if (this.editMode) {
        // // console.log(type)
        // // console.log('pill clicked')
        this.pushNewValue({ type, value: !this.listing[type] });
        this.setUserValueAction({ id: this.id, type, value: !this.listing[type] });
      }
    },
    getWarehouseName() {
      return this.id;
    },
    deleteWarehouse() {
      const code = this.listing.code;
      console.log(code);
      console.log("delete warehouse");
      dbDeleteWarehouse(code);
    },
    pushNewValue({ type, value }) {
      console.log({ type, value });
      this.edits[type] = value;
    },
  },
};
</script>

<style lang="scss" scoped>
#card {
  background: #fff;
  padding: 23px;
  margin-bottom: 24px;
  border: 1px solid #eee;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  margin: 16px;

  #card-header {
    display: flex;
    justify-content: space-between;

    #text-prompt {
      margin: 0 5px;
      font-size: 16px;
      font-weight: 700;
    }
  }

  #details-row {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .detail {
      margin: 0 32px 0 0;

      .detail-header {
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        color: #8a8a8a;
        font-weight: 600;
      }
    }
  }

  #footer-row {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .pills {
      display: flex;

      .pill {
        padding: 6px 12px;
        border-radius: 14px;
        font-size: 14px;
        color: #666;
        line-height: 16px;
        margin-right: 8px;
      }

      .available {
        background: lightcyan;
      }

      .live {
        background: lavender;
      }
    }

    #view-details {
      text-decoration: none;
      color: #008bdc;
      cursor: pointer;
      line-height: 1.14285714;
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 0.2px;
      align-self: flex-end;

      &:hover,
      &:active {
        color: #186795;
      }
    }
  }
}

.pill-edit {
  border: 2px solid black;
  cursor: pointer;
}

.pill-deselect {
  background: white !important;
}

@media only screen and (max-width: 450px) {
  #card-header {
    flex-direction: column;

    #text-prompt {
      margin-top: 5px;
    }
  }
}
</style>
