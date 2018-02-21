import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Login from '@/components/Login'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
    routes: [

        {
            path: '/list',
            name: 'List',
            component: List,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: '*',
            component: Login
        },
        {
            path: '/',
            component: Login
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
});

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser;
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('login');
    else if (!requiresAuth && currentUser) next('hello');
    else next()
});

export default router;
