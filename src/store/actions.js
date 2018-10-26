/*
通过mutation间接更新state的多个方法
 */

import * as types from './mutation-type'
import {
    reqAddress,
    reqFoodTypeList,
    reqShopList,
    reqUserInfo,
    reqLogout
} from "../api"

export default {
    // 异步获取地址
    async getAddress({commit, state}) {
        // 发送异步ajax请求
        const geohash = state.latitude + "," + state.longitude;
        const result = await reqAddress(geohash);
        // 提交一个mutation
        if (result.code === 0) {
            const address = result.data;
            commit(types.RECEIVE_ADDRESS, {address});
        }
    },

    // 异步食品分类数组
    async listFoodType({commit}) {
        // 发送异步ajax请求
        const result = await reqFoodTypeList();
        // 提交一个mutation
        if (result.code === 0) {
            const foodTypeList = result.data;
            commit(types.RECEIVE_FOOD_TYPE_LIST, {foodTypeList});
        }
    },

    // 异步商家列表
    async listShop({commit, state}) {
        // 发送异步ajax请求
        const {longitude, latitude} = state;
        const result = await reqShopList(longitude, latitude);
        // 提交一个mutation
        if (result.code === 0) {
            const shopList = result.data;
            commit(types.RECEIVE_SHOP_List, {shopList});
        }
    },

    // 同步保存用户信息
    saveUserInfo({commit}, userInfo) {
        commit(types.RECEIVE_USER_INFO, {userInfo});
    },

    // 异步获取用户信息
    async getUserInfo({commit}) {
        const result = await reqUserInfo();
        if (0 === result.code) {
            const userInfo = result.data;
            commit(types.RECEIVE_USER_INFO, {userInfo});
        }
    },

    // 异步退出登录
    async logout({commit}) {
        const result = await reqLogout();
        if (0 === result.code) {
            const userInfo = {}; // 重置用户信息

            commit(types.RECEIVE_USER_INFO, {userInfo});
        }
    }
}
