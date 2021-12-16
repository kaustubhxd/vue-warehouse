<template>
  <div class="warehouse-container">
    <div id="go-back">
      <router-link to="/">
        <a class="label red-link">Back</a>
      </router-link>
    </div>
    <div class="warehouse-details">
      <p id="detail-header">{{ data.name }}</p>
      <EditableCard :id="id" :listing="data">
        <div id="about">
          <p id="about-header">About {{ data.name }}</p>
          <p id="about-content">{{ aboutContent }}</p>
        </div>
      </EditableCard>
      <!-- <p>{{data}}</p> -->
      <EditableText />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EditableText from "@/components/EditableText.vue";
import EditableCard from "@/components/EditableCard";
import axios from "axios";

export default {
  components: { EditableText, EditableCard },
  data() {
    return {
      id: this.$route.params.id,
      data: {},
      aboutContent: "",
    };
  },
  computed: {
    ...mapGetters(["getData"]),
  },
  mounted: function() {
    console.log(this.id);
    this.data = this.getData[this.id];
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?id=2`)
      .then((response) => (this.aboutContent = response.data[0].body));
  },
};
</script>

<style lang="scss" scoped>
.warehouse-container {
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;

  #go-back {
    margin-left: 20px;
    margin-top: 10px;
    font-size: 18px;
    margin-bottom: 5px;
    font-weight: 700;
    width: max-content;
    cursor: pointer;

    .router-link-active {
      text-decoration: none;
      color: $stockarea-red;

      &:hover,
      &:focus,
      &:active {
        color: $stockarea-red-deep;
      }
    }
  }

  .warehouse-details {
    max-width: 100%;
  }

  #detail-header {
    text-align: center;
    margin-bottom: 24px;
    font-size: 28px;
    line-height: 1.28571429;
    font-weight: 600;
    color: #333;
  }
}

#about {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;

  #about-header {
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 1.25;
    font-weight: 600;
    color: #333;
  }

  #about-content {
    word-break: break-word;
    font-size: 14px;
    line-height: 22px;
    color: #484848;
  }
}
</style>
