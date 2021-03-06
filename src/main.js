// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import firebase from 'firebase'
import store from './store/index'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);
Vue.use(VueFire);
Vue.config.productionTip = false;

let app;

firebase.auth().onAuthStateChanged(function (user) {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            components: {App},
            template: '<App/>'
        });
    }
    
    let userMail = user ? user.email : null;
    store.commit('setUserMail', userMail);
});

/* eslint-disable no-new */

