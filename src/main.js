/*
入口js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {Button} from "mint-ui";
import "./mock/mockServer";

import "../src/assets/css/reset.css";

Vue.config.productionTip = false;
Vue.component(Button.name, Button); // 全局mint-ui按钮

new Vue({
  router, // 使用路由 vue-router
  store, // 使用vuex

  render: h => h(App)
}).$mount("#app");
