import Vue from "vue";
import Router from "vue-router";
import Msite from "./pages/msite/Msite";
import Order from "./pages/order/Order";
import Profile from "./pages/profile/Profile";
import Search from "./pages/search/Search";
import Login from "./pages/login/Login";
import Shop from "./pages/shop/Shop";
import ShopGoods from "./pages/shop/shopGoods/ShopGoods";
import ShopRatings from "./pages/shop/shopRatings/ShopRatings";
import ShopInfo from "./pages/shop/shopInfo/ShopInfo";


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
        },
        {
            path: "/shop",
            name: "shop",
            component: Shop,
            children: [
                {
                    path: "",
                    redirect: "/shop/goods"
                },
                {
                    path: "/shop/goods",
                    name: "shopGoods",
                    component: ShopGoods
                },
                {
                    path: "/shop/ratings",
                    name: "shopRatings",
                    component: ShopRatings
                },
                {
                    path: "/shop/info",
                    name: "shopInfo",
                    component: ShopInfo
                }
            ]
        }
    ]
});
