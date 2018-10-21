import Vue from "vue";
import Router from "vue-router";
import Msite from "./pages/msite/Msite";
import Order from "./pages/order/Order";
import Profile from "./pages/profile/Profile";
import Search from "./pages/search/Search";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            redirect: "/msite"
        },
        {
            path: "/msite",
            name: "msite",
            component: Msite
        },
        {
            path: "/order",
            name: "order",
            component: Order
        },
        {
            path: "/profile",
            name: "profile",
            component: Profile
        },
        {
            path: "/search",
            name: "search",
            component: Search
        }
    ]
});
