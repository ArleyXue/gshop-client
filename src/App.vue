<template>
    <div>
        <router-view></router-view>
        <footer-guide v-show="$route.meta.showFooter"></footer-guide>
    </div>
</template>

<script>
import FooterGuide from "./components/footerGuide/FooterGuide";

export default {
    mounted() {
        this.$store.dispatch("getAddress");
        this.$store.dispatch("getUserInfo");
    },
    components: {
        "footer-guide": FooterGuide
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
