import Vue from 'vue';
import Router from 'vue-router';
import Items from '@/components/Items.vue';
import Home from '@/components/Home.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/items',
            name: 'Items',
            component: Items,
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
        }

    ],
});