import Vue from "vue";
import moment from "moment";

// 时间格式化
Vue.filter("date-format", (value) => {
    return moment().format("YYYY-MM-DD HH:mm:ss")
});
