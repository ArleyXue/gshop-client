/*
   发起异步请求
 */
import axios from "axios";
axios.defaults.withCredentials = true;

export default function ajaxax(url, data = {}, type = "GET") {
    return new Promise(function (resolve, reject) {
        let promise;
        if ("GET" === type) {
            // get请求
            // 拼接参数
            let dataStr = '';
            Object.keys(data).forEach(key => {
                dataStr += key + "=" + data[key] + "&";
            });
            // 拼接URL
            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
                url = url + "?" + dataStr;
            }
            // 发送请求
            promise = axios.get(url);
        } else {
            // post请求
            promise = axios.post(url, data);
        }
        promise.then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error)
        })
    })
}
