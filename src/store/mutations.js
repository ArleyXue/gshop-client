/*
直接更新state的多个方法
 */

import * as types from "./mutation-type"
import {RECEIVE_SHOP_INFO} from "./mutation-type";
import {RECEIVE_SHOP_RATINGS} from "./mutation-type";
import {RECEIVE_SHOP_GOODS} from "./mutation-type";

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
    [RECEIVE_SHOP_INFO](state, {shopInfo}) {
        state.shopInfo = shopInfo
    },
    [RECEIVE_SHOP_RATINGS](state, {shopRatings}) {
        state.shopRatings = shopRatings
    },
    [RECEIVE_SHOP_GOODS](state, {shopGoods}) {
        state.shopGoods = shopGoods
    },
}
