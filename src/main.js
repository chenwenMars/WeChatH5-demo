import Vue from 'vue';
import App from './App.vue';

import 'normalize.css';
import '@/assets/css/index.scss';

import router from '@/router.js';
import '@/assets/js/axios.js';

import mixin from './assets/js/mixin';
Vue.mixin(mixin);

import Vconsole from 'vconsole';
if (
  process.env.VUE_APP_WORLD === 'test' ||
  process.env.VUE_APP_WORLD === 'serve'
) {
  new Vconsole();
}

Vue.config.productionTip = false;

import loadSentry from '@/rpf/un/loadSentry';
loadSentry('null').then(() => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
});
