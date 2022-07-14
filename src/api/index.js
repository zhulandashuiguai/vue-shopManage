//请求方法

import axios from 'axios'
import base from './base.js'
//
const qs = require('querystring')


const api = {
    //商品列表
    getGoodsList(params) { //需要传参，参数格式{page:xx}
        return axios.get(base.goodsList, { params })
    },
    // 搜索商品数据search
    getSearch(params) { //params格式：{search:xxx}
        return axios.get(base.search, { params })
    },
    //商品类目获取,传参格式：{id:cid}
    getSelectCategory(params) {
        return axios.get(base.selectCategory, { params })
    },
    // 添加商品的请求
    //  * 参数： title cid  category sellPoint price num descs paramsInfo image
    addGoods(params) {
        return axios.get(base.addGoods, {
            params
        })
    },
    // 删除商品的方法 根据id
    deleteGoods(params) { //参数格式{id:id}
        return axios.get(base.deleteGoods, { params })
    },
    // 编辑商品的方法
    updateGoods(params) {
        return axios.get(base.updateGoods, { params })
    },
    // 登录的方法
    login(params) { //params:{username:'',password:''}
        return axios.post(base.login, qs.stringify(params))
    },
    // 规格参数获取列表
    getParams(params) { //参数格式{page:xx}
        return axios.get(base.params, { params })
    },
    // 规格参数查询
    searchParams(params) { //参数格式：{search：val}
        return axios.get(base.searchParams, { params })
    },
    // 规格参数添加  参数：itemCatId,content,specsName
    addParams(params) {
        return axios.get(base.addParams, { params })
    },
    // 规格参数删除
    deleteParams(params) {
        return axios.get(base.deleteParams, { params })
    },
    // 统计数据
    getStatistic() {
        return axios.get(base.statistic)
    },
    // 月销售额统计
    getSellTotal() {
        return axios.get(base.sellTotal)
    }

}

export default api;