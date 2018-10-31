/*
入口js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {Button} from "mint-ui";
import VueLazyload from 'vue-lazyload'
import "./mock/mockServer";

import "../src/assets/css/reset.css";
import "./filters/filter";
import loading from './common/img/loading.gif'

Vue.config.productionTip = false;
Vue.component(Button.name, Button); // 全局mint-ui按钮
Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: loading,
    error: loading,
    attempt: 1
})

new Vue({
  router, // 使用路由 vue-router
  store, // 使用vuex

  render: h => h(App)
}).$mount("#app");
