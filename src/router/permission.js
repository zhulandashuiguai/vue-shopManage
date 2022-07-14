import store from '@/store/index.js'
import router from './index.js'
// 路由拦截（导航守卫）
router.beforeEach((to, from, next) => {
    // console.log('to----', to);
    // 需要登录
    if (to.matched.some(record => record.meta.isLogin)) {
        // 判断用户是否已经登录
        const token = store.state.userinfo.token
            // console.log('token-----', token);
        if (token) {
            next()
        } else {
            next('/login');
        }
    } else {
        // 不需要登录
        next()
    }
})