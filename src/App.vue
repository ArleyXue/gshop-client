<template>
    <div>
        <router-view></router-view>
        <footer-guide></footer-guide>
    </div>
</template>

<script>
import FooterGuide from "./components/footerGuide/FooterGuide";

    export default {
        components: {
            "footer-guide": FooterGuide,
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>