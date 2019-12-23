/*
 * @Author: huangjianyong
 * @Date: 2019-06-11 16:16:42
 * @LastEditors: Sexy
 * @LastEditTime: 2019-08-29 15:03:38
 * @Description: vue自定义指令，节流功能
 */

const DEFAULT_DELAY = 500; //500ms

function throttle(fn, gap = DEFAULT_DELAY, type) {
  if (Object.prototype.toString.call(fn) !== '[object Function]')
    throw Error('请传入函数!');
  let last_run = null;
  return (...arg) => {
    let now = new Date();
    if (!last_run || now - last_run > gap * 1) {
      fn(...arg, type);
      last_run = new Date();
    }
  };
}

export default {
  install(Vue) {
    let t_fn;
    Vue.directive('throttle', {
      bind(el, { arg, value, modifiers }, vnode) {
        let gap =
          modifiers && Object.keys(modifiers).length != 0
            ? Object.keys(modifiers)[1]
            : DEFAULT_DELAY;
        var type;
        switch (parseInt(Object.keys(modifiers)[0])) {
          case 0: //红包类型
            type = 0;
            break;
          case 1: //个人宝箱30
            type = 30;
            break;
          case 2: //个人宝箱50
            type = 50;
            break;
          case 3: //个人宝箱100
            type = 100;
            break;
          case 4: //团队宝箱300w
            type = 300;
            break;
          case 5: //团队宝箱800w
            type = 800;
            break;
          case 6: //团队宝箱1000w
            type = 1000;
            break;
          case 8: //个人宝箱双倍宝箱1000w
            type = 200;
            break;
        }
        t_fn = throttle(value.bind(vnode), gap, type);
        el.addEventListener(arg, t_fn);
      },
      unbind(el, { arg }) {
        el.removeEventListener(arg, t_fn);
      }
    });
  }
};
