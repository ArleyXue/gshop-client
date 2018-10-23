<template>
    <div>
        <router-view></router-view>
        <footer-guide v-show="$route.meta.showFooter"></footer-guide>
    </div>
</template>

<script>
import FooterGuide from "./components/footerGuide/FooterGuide";
import {reqFoodTypeList} from "./api";
export default {
    mounted() {
        const result =  reqFoodTypeList();
        console.log(result);
    },
    components: {
        "footer-guide": FooterGuide
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
