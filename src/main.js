import Vue from 'vue'
import App from './App.vue'

import 'normalize.css';
import '@/assets/css/index.scss'

import router from '@/router.js';
import '@/assets/js/axios.js';
import mixin from "./assets/js/mixin";
Vue.config.productionTip = false;

Vue.mixin(mixin);
import loadSentry from '@/rpf/un/loadSentry';

loadSentry(
    'null'
).then(() => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
});
