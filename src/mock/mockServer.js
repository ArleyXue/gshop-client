import Mock from "mockjs";
import apiData from "./data";

// 模拟商品数据
Mock.mock("/shop_goods", {code: 0, data: apiData.goods });

// 模拟评论数据
Mock.mock("/shop_ratings", {code: 0, data: apiData.ratings });

// 模拟商家数据
Mock.mock("/shop_info", {code: 0, data: apiData.info });
