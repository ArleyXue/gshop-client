<template>
    <div class="msite">
        <!--首页头部-->
        <header-top :title="address.name">
            <slot slot="left">
                <router-link to="/search" class="header_search">
                    <i class="iconfont icon-sousuo"></i>
                </router-link>
            </slot>
            <slot slot="right">
                <span class="header_login" v-if="!userInfo._id">
                    <span class="header_login_text">登录|注册</span>
                </span>
                <span class="header_login" v-else>
                    <router-link to="/profile" class="header_login_text">
                        <i class="iconfont icon-person"></i>
                    </router-link>
                </span>
            </slot>
        </header-top>
        <!--首页导航-->
        <nav class="msite_nav">
            <div class="swiper-container" v-if="foodTypeList.length > 0">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(foodTypeList, index) in foodTypeListArr" :key="index">
                        <a href="javascript:" class="link_to_food" v-for="(foodType, index) of foodTypeList" :key="index">
                            <div class="food_container">
                                <img v-lazy="imgBaseUrl + foodType.image_url">
                            </div>
                            <span>{{foodType.title}}</span>
                        </a>
                    </div>
                </div>>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
            <div v-else>
                <img src="./images/msite_back.svg" alt="back" />
            </div>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
            <div class="shop_header">
                <i class="iconfont icon-xuanxiang"></i>
                <span class="shop_header_title">附近商家</span>
            </div>
            <shop-list/>
        </div>
    </div>
</template>


<script>
    import "swiper/dist/css/swiper.min.css";

    import Swiper from "swiper";
    import HeaderTop from "../../components/headerTop/HeaderTop";
    import ShopList from "../../components/shopList/ShopList";
    import {mapState} from "vuex"


    export default {
        data () {
            return {
                imgBaseUrl: "https://fuss10.elemecdn.com"
            }
        },
        mounted() {
            this.$store.dispatch("listFoodType");
            this.$store.dispatch("listShop");
        },
        computed: {
            ...mapState(['address', 'foodTypeList', 'userInfo']),
            foodTypeListArr () {
                const foodTypeList = this.foodTypeList;
                const foodTypeListArr = [];
                let minArr = [];
                foodTypeList.forEach(f => {
                    minArr.push(f);
                    if (minArr.length === 8) {
                        foodTypeListArr.push(minArr);
                        minArr = [];
                    }
                });
                return foodTypeListArr;
            }
        },
        watch: {
            foodTypeList(value) {
                this.$nextTick(() => { // 页面数据填充后生成Swiper对象
                    new Swiper('.swiper-container', {
                        loop: true, // 循环模式选项
                        pagination: { // 如果需要分页器
                            el: '.swiper-pagination',
                        }
                    });
                })
            }
        },
        components: {
            "header-top": HeaderTop,
            "shop-list": ShopList
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl";

    .msite  //首页
        width 100%
        .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
                width 100%
                height 100%
                .swiper-wrapper
                    width 100%
                    height 100%
                    .swiper-slide
                        display flex
                        justify-content center
                        align-items flex-start
                        flex-wrap wrap
                        .link_to_food
                            width 25%
                            .food_container
                                display block
                                width 100%
                                text-align center
                                padding-bottom 10px
                                font-size 0
                                img
                                    display inline-block
                                    width 50px
                                    height 50px
                            span
                                display block
                                width 100%
                                text-align center
                                font-size 13px
                                color #666
                .swiper-pagination
                    >span.swiper-pagination-bullet-active
                        background #02a774
        .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
                padding 10px 10px 0
                .shop_icon
                    margin-left 5px
                    color #999
                .shop_header_title
                    color #999
                    font-size 14px
                    line-height 20px

</style>
