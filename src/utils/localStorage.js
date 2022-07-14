import store from '@/store/index.js'
// 数据持久化
let user = localStorage.getItem('user')
if (user) {
    // json格式转为js对象格式
    user = JSON.parse(user)
    store.commit('setUser', user)
}