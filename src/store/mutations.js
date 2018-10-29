/*
直接更新state的多个方法
 */
import Vue from "vue"
import * as types from "./mutation-type"


export default {
    [types.RECEIVE_ADDRESS] (state, {address}) {
        state.address = address;
    },
    [types.RECEIVE_FOOD_TYPE_LIST] (state, {foodTypeList}) {
        state.foodTypeList = foodTypeList;
    },
    [types.RECEIVE_SHOP_List] (state, {shopList}) {
        state.shopList = shopList;
    },
    [types.RECEIVE_USER_INFO] (state, {userInfo}) {
        state.userInfo = userInfo;
    },
    [types.RECEIVE_SHOP_INFO](state, {shopInfo}) {
        state.shopInfo = shopInfo
    },
    [types.RECEIVE_SHOP_RATINGS](state, {shopRatings}) {
        state.shopRatings = shopRatings
    },
    [types.RECEIVE_SHOP_GOODS](state, {shopGoods}) {
        state.shopGoods = shopGoods
    },

    [types.INCREMENT_FOOD_COUNT](state, {food}) {
        if (!food.count) {
            // food.count = 1;
            Vue.set(food, "count", 1);
        } else {
            food.count++;
        }
    },
    [types.DECREMENT_FOOD_COUNT](state, {food}) {
        if (food.count) {
            food.count--;
        }
    },
}
