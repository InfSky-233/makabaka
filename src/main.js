/*
 * @Author: InfSky-233 itrident@163.com
 * @Date: 2022-05-04 14:14:26
 * @LastEditors: InfSky-233 itrident@163.com
 * @LastEditTime: 2022-05-15 23:48:33
 * @FilePath: \la\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
