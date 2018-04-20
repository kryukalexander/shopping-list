import Vue from 'vue'
import Vuex from 'vuex'
import storageAPI from "../setup/storageAPI";

Vue.use(Vuex);

let defaults = {
    showCheckedItems: true,
    showEditDate: true
};

let localSettings = new storageAPI(defaults, 'shopping-list-settings');

const store = new Vuex.Store({
    state: {
        settings: localSettings.fetch(),
        userMail: null
    },
    getters: {},
    mutations: {
        toggleSetting(state, key) {
            state.settings[key] = !state.settings[key];
            localSettings.save(state.settings);
        },
        
        setUserMail(state, value) {
            state.userMail = value;
        }
    },
    actions: {}
});

export default store;