import Vue from "vue";
import Router from "vue-router";
import Msite from "./pages/msite/Msite";
import Order from "./pages/order/Order";
import Profile from "./pages/profile/Profile";
import Search from "./pages/search/Search";
import Login from "./pages/login/Login";

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
            component: Msite,
            meta: {
                showFooter: true
            }
        },
        {
            path: "/order",
            name: "order",
            component: Order,
            meta: {
                showFooter: true
            }
        },
        {
            path: "/profile",
            name: "profile",
            component: Profile,
            meta: {
                showFooter: true
            }
        },
        {
            path: "/search",
            name: "search",
            component: Search,
            meta: {
                showFooter: true
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login
        }
    ]
});
