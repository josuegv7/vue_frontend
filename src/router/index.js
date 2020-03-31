import Vue from 'vue';
import Router from 'vue-router';
import Items from '@/components/Items.vue';
import Projects from '@/components/Projects.vue';
import Home from '@/components/Home.vue';
import SignUp from '@/components/SignUp.vue';
import SignIn from '@/components/SignIn.vue';
import FileUpload from '@/components/FileUpload.vue';
import Files from '@/components/Files.vue';

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
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUp,
        },
        {
            path: '/signin',
            name: 'SignIn',
            component: SignIn,
        },
        {
            path: '/files',
            name: 'Files',
            component: Files,
        },
        {
            path: '/fileupload',
            name: 'FileUpload',
            component: FileUpload,
        },

    ],
});