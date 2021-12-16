import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FullpageModal from "vue-fullpage-modal";
import Vuebar from "vuebar";
import VuejsDialog from "vuejs-dialog";
import "vuejs-dialog/dist/vuejs-dialog.min.css";

Vue.config.productionTip = false;
Vue.use(FullpageModal)
  .use(Vuebar)
  .use(VuejsDialog);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
