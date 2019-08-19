import Vue from 'vue';
import Router from 'vue-router';
import Items from '@/components/Items.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/items',
            name: 'Items',
            component: Items,
        }
    ],
});