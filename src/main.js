/*
入口js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/css/reset.css";

Vue.config.productionTip = false;

new Vue({
  router, // 使用路由 vue-router
  store, // 使用vuex
  render: h => h(App)
}).$mount("#app");
