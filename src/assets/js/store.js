import Vue from 'vue';
export let store = Vue.observable({
  card_count: 1, //抽卡次数
  lottery_count: 0, //合成抽奖次数
  card_type: { x: 1, y: 2 }, //卡片类型
  userData: {}, //用户信息
  serveTime: new Date(), //当前的服务器时间
  appid: 'wxd80b3c4e39af79d7' //公众号的appid
});

export let mutations = {
  //定义一个方法 当点击合成抽奖的时候需要吧合成抽奖次数-1跟所有类型卡片-1；
  LotteryDowm() {
    //抽将次数减1
    store.lottery_count -= 1;
    //所有卡片-1
    Object.keys(store.card_type).forEach(item => {
      Vue.set(store.card_type, item, store.card_type[item] - 1);
    });
  }
};
