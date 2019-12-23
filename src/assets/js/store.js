import Vue from 'vue';
export default Vue.observable({
  count: 1, //抽奖次数
  userData: {}, //用户信息
  serveTime: new Date() //当前的服务器时间
});
