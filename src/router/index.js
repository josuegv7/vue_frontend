import Vue from 'vue';
import Router from 'vue-router';
import Items from '@/components/Items.vue';
import Projects from '@/components/Projects.vue';
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
            path: '/projects',
            name: 'Projects',
            component: Projects,
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
        }

    ],
});