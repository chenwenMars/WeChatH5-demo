import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
export default new VueRouter({
    routes:[
        {
            path: '/',
            name: 'loading',
            component: () => import('@/views/Loading.vue')
        }

    ]
})