<template>
  <div id="card">
    <div id="name">{{ listing["w_name"] }}</div>
    <div id="city">{{ listing.city }}</div>
    <div id="details-row">
      <div class="detail">
        <div class="detail-header">Type</div>
        <div class="detail-value">{{ listing["w_type"] }}</div>
      </div>
      <div class="detail">
        <div class="detail-header">Space Available</div>
        <div class="detail-value">{{ listing.space_available }}</div>
      </div>
      <div class="detail">
        <div class="detail-header">Cluster</div>
        <div class="detail-value">{{ listing.cluster.toUpperCase() }}</div>
      </div>
      <div class="detail">
        <div class="detail-header">Code</div>
        <div class="detail-value">{{ listing.code }}</div>
      </div>
    </div>
    <div id="footer-row">
      <div class="pills">
        <div class="pill available noselect" v-if="listing.is_registered">Registered</div>
        <div class="pill live noselect" v-if="listing.is_live">Live</div>
      </div>
      <router-link :to="id">
        <a id="view-details" class="red-link">View Details ></a>
      </router-link>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["id", "listing"],
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
  transition: box-shadow 0.2s ease-in-out;

  &:hover,
  &:active,
  &:focus {
    box-shadow: 0 8px 10px rgba(45, 48, 71, 0.1);
  }

  #name {
    font-size: 18px;
    font-weight: 700;
    color: $color-header-light;
    margin-bottom: 5px;
  }

  #city {
    font-size: 14px;
    font-weight: 700;
    color: #8a8a8a;
  }

  #details-row {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .detail {
      margin: 5px 32px 5px 0;

      .detail-header {
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        color: #8a8a8a;
        font-weight: 600;
      }

      .detail-value {
        color: #333;
        font-size: 14px;
        line-height: 1.57142857;
        font-weight: 400;
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
      color: $stockarea-red;
      cursor: pointer;
      line-height: 1.14285714;
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 0.2px;
      align-self: flex-end;

      &:hover,
      &:active {
        color: $stockarea-red-deep;
      }
    }
  }
}
</style>
