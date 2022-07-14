import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userinfo: {
            user: '',
            token: ''
        },

    },
    getters: {},
    mutations: {
        // 设置用户信息
        setUser(state, payload) {
            state.userinfo = payload;
        },
        // 清空
        clearUser(state) {
            state.userinfo = {
                user: '',
                token: ''
            }
        }

    },
    actions: {},
    modules: {}
})