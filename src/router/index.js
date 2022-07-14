import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/Layout.vue'
import Login from '@/views/login/Login.vue'
import Home from '@/views/home/Home.vue'
import store from '@/store/index.js'
// 异步加载组件
const Goods = () =>
    import ('@/views/goods/Goods.vue')
const Goods1 = () =>
    import ('@/views/goods/goods/Goods1.vue')

const Params = () =>
    import ('@/views/params/Params.vue')
const Advert = () =>
    import ('@/views/advert/Advert.vue')
const Order = () =>
    import ('@/views/order/Order.vue')
const OrderList = () =>
    import ('@/views/order/orderList/OrderList.vue')
const OrderBackList = () =>
    import ('@/views/order/orderBackList/OrderBackList.vue')
    // 商品添加弹出页面
const AddGoods = () =>
    import ('@/views/goods/addGoods/AddGoods.vue')
const User = () =>
    import ('@/views/user/User.vue')
Vue.use(VueRouter)

const routes = [{
    path: '',
    component: Layout,
    meta: {
        title: '首页',
        // 是否需要登录
        isLogin: true
    },
    children: [
        { path: '/', component: Home, name: 'home', meta: { title: '' } },
        { //商品管理路由
            path: '/goods',
            component: Goods,
            name: 'goods',
            meta: { title: '商品管理' },
            redirect: '/goods/goods1',
            children: [
                { path: 'goods1', component: Goods1, name: 'goods', meta: { title: '商品管理' } },
                { path: 'addgoods', component: AddGoods, name: 'addGoods', meta: { title: '添加商品' } },
            ]
        },
        //添加弹出页面
        // { path: '/addgoods', component: AddGoods, name: 'addGoods', meta: { title: '添加商品' } },
        { path: '/params', component: Params, name: 'params', meta: { title: '规格参数' } },
        { path: '/advert', component: Advert, name: 'advert', meta: { title: '广告分类' } },

        { //订单路由
            path: '/order',
            component: Order,
            name: 'order',
            meta: { title: '订单管理' },
            redirect: '/order/orderlist',
            children: [{ path: 'orderlist', component: OrderList, name: 'orderlist', meta: { title: '订单列表' } },
                { path: 'orderback', component: OrderBackList, name: 'orderbacklist', meta: { title: '退货管理' } }
            ]
        },
        // 个人中心路由
        { path: '/user', component: User, name: 'user', meta: { title: '个人中心' } },
    ]
}, {
    path: '/login',
    component: Login,
}, ]

const router = new VueRouter({
    routes
})



export default router