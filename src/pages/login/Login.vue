<template>
    <section class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">硅谷外卖</h2>
                <div class="login_header_title">
                    <a href="javascript:;" :class="{on: isCodeLogin}" @click="isCodeLogin = true">短信登录</a>
                    <a href="javascript:;" :class="{on: !isCodeLogin}" @click="isCodeLogin = false">密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form @submit.prevent="login">
                    <div :class="{on: isCodeLogin}">
                        <section class="login_message">
                            <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                            <button :disabled="!rightPhone" class="get_verification"
                                    :class="{right_phone: rightPhone}" @click.prevent="sendCode">
                                {{countdown > 0 ? `${countdown} s` : '获取验证码'}}
                            </button>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="6" placeholder="验证码" v-model="code">
                        </section>
                        <section class="login_hint">
                            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <div :class="{on: !isCodeLogin}">
                        <section>
                            <section class="login_message">
                                <input type="text" maxlength="20" placeholder="手机/邮箱/用户名" v-model="name">
                            </section>
                            <section class="login_verification">
                                <input type="password" maxlength="8" placeholder="密码" v-if="!showPwd" v-model="pwd">
                                <input type="text" maxlength="8" placeholder="密码" v-else v-model="pwd">
                                <div class="switch_button" :class="showPwd ? 'on' : 'off'" @click="showPwd = !showPwd">
                                    <div class="switch_circle" :class="{right: showPwd}"></div>
                                    <span class="switch_text">{{showPwd ? 'adc' : '...'}}</span>
                                </div>
                            </section>
                            <section class="login_message">
                                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                                      @click="getCaptcha" ref="captcha">
                            </section>
                        </section>
                    </div>
                    <button class="login_submit">登录</button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>
            <a href="javascript:" class="go_back" @click="$router.back()">
                <i class="iconfont icon-jiantou2"></i>
            </a>
        </div>

        <alert-tip :alertText="alertText" v-if="alertShow" @closeTip="closeTip"></alert-tip>
    </section>
</template>

<script>
    import AlertTip from "../../components/alertTip/AlertTip"
    import {reqLoginSms, reqLoginPwd, reqSendCode} from "../../api"

    export default {
        data() {
            return {
                isCodeLogin: true, // true-短信登陆 false-密码登陆
                phone: '', // 手机号
                code: '', //
                name: '', //
                pwd: '',
                captcha: '',
                countdown: 0,
                showPwd: false,
                alertText: '',
                alertShow: false
            }
        },
        computed: {
            rightPhone() {
                return /^1\d{10}$/.test(this.phone);
            }
        },
        methods: {
            async sendCode() {
                // 如果计时器正在执行, 直接return
                if (this.countdown !== 0) {
                    return;
                }
                // 启动计时器
                this.countdown = 30;
                const intervalId = setInterval(() => {
                    this.countdown--;
                    if (this.countdown <= 0) {
                        // 停止计时器
                        clearInterval(intervalId);
                    }
                }, 1000);
                // 发送请求获取验证码
                const result = await reqSendCode(this.phone);

            },
            async login() { // 登陆
                let result;
                // 校验表单
                if (this.isCodeLogin) {
                    const {rightPhone, phone, code} = this;
                    if (!rightPhone) {
                        // 提示手机号不正确
                        this.showTip('手机号不正确');
                        return;
                    } else if (!/^\d{6}$/.test(code)) {
                        // 提示验证码不是6位
                        this.showTip('验证码不是6位');
                        return;
                    }
                    // 验证码登录
                    result = await reqLoginSms(phone, code);
                } else {
                    const {name, pwd, captcha} = this;
                    if (!name) {
                        // 提示用户名不能为空
                        this.showTip('用户名不能为空');
                        return;
                    } else if (!pwd) {
                        // 提示密码不能为空
                        this.showTip('密码不能为空');
                        return;
                    } else if (!captcha) {
                        // 提示验证码不能为空
                        this.showTip('验证码不能为空');
                        return;
                    }
                    // 密码登录
                    result = await reqLoginPwd({name, pwd, captcha});
                }
                if (result.code === 0) {
                    // 成功
                    const user = result.data;
                    // 保存用户信息
                    this.$store.dispatch("saveUserInfo", user);
                    // 跳转到我的页面
                    this.$router.replace("/profile");
                } else {
                    // 失败
                    const msg = result.msg;
                    // 刷新验证码
                    this.getCaptcha();
                    // 提示消息
                    this.showTip(msg);
                }
            },
            showTip(alertText) { // 显示弹出框
                this.alertShow = true;
                this.alertText = alertText;
            },
            closeTip() { // 关闭弹出框
                this.alertShow = false;
                this.alertText = '';
            },
            getCaptcha() {
                this.$refs.captcha.src = "http://localhost:4000/captcha?time" + Date.now();
            }
        },
        components: {
            "alert-tip": AlertTip
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl";

    .loginContainer
        width 100%
        height 100%
        background #fff
        .loginInner
            padding-top 60px
            width 80%
            margin 0 auto
            .login_header
                .login_logo
                    font-size 40px
                    font-weight bold
                    color #02a774
                    text-align center
                .login_header_title
                    padding-top 40px
                    text-align center
                    >a
                        color #333
                        font-size 14px
                        padding-bottom 4px
                        &:first-child
                            margin-right 40px
                        &.on
                            color #02a774
                            font-weight 700
                            border-bottom 2px solid #02a774
            .login_content
                >form
                    >div
                        display none
                        &.on
                            display block
                        input
                            width 100%
                            height 100%
                            padding-left 10px
                            box-sizing border-box
                            border 1px solid #ddd
                            border-radius 4px
                            outline 0
                            font 400 14px Arial
                            &:focus
                                border 1px solid #02a774
                        .login_message
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff
                            .get_verification
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                border 0
                                color #ccc
                                font-size 14px
                                background transparent
                                &.right_phone
                                    color black
                        .login_verification
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff
                            .switch_button
                                font-size 12px
                                border 1px solid #ddd
                                border-radius 8px
                                transition background-color .3s,border-color .3s
                                padding 0 6px
                                width 30px
                                height 16px
                                line-height 16px
                                color #fff
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                &.off
                                    background #fff
                                    .switch_text
                                        float right
                                        color #ddd
                                &.on
                                    background #02a774
                                >.switch_circle
                                    position absolute
                                    top -1px
                                    left -1px
                                    width 16px
                                    height 16px
                                    border 1px solid #ddd
                                    border-radius 50%
                                    background #fff
                                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                                    transition transform .3s
                                    &.right
                                        transform translateX(27px)
                        .login_hint
                            margin-top 12px
                            color #999
                            font-size 14px
                            line-height 20px
                            >a
                                color #02a774
                    .login_submit
                        display block
                        width 100%
                        height 42px
                        margin-top 30px
                        border-radius 4px
                        background #4cd96f
                        color #fff
                        text-align center
                        font-size 16px
                        line-height 42px
                        border 0
                .about_us
                    display block
                    font-size 12px
                    margin-top 20px
                    text-align center
                    color #999
            .go_back
                position absolute
                top 5px
                left 5px
                width 30px
                height 30px
                >.iconfont
                    font-size 20px
                    color #999
</style>
