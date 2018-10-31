/*
基于state getter计算属性的对象
 */

export default {
    totalCount(state) { // 计算数量
        return state.cartFoods.reduce((preTotal, food) => preTotal + food.count , 0);
    },
    totalPrice(state) { // 计算总价格
        return state.cartFoods.reduce((preTotal, food) => preTotal + (food.count * food.price) , 0);
    },
    positiveSize(state) { // 计算满意的数量
        return state.shopRatings.reduce((preTotal, rating) => preTotal + (rating.rateType === 0 ? 1 : 0) , 0);
    }
}
