//接口的具体路径配置
const base = {
    // 基础域名
    host: 'http://localhost:8989',
    // 商品列表的接口
    goodsList: '/api/projectList', //商品列表
    // 搜索查询商品的接口
    search: '/api/search',
    // 类目选择的接口
    selectCategory: '/api/backend/itemCategory/selectItemCategoryByParentId',
    // 上传文件的服务器地址接口post请求
    uploadUrl: 'api/upload',
    // 添加商品的接口
    addGoods: '/api/backend/item/insertTbItem',
    // 删除商品的接口
    deleteGoods: 'api/backend/item/deleteItemById',
    // 编辑商品的接口
    updateGoods: '/api/backend/item/updateTbItem',
    // 登陆的接口
    login: '/api/login',
    // 规格参数列表
    params: '/api/backend/itemParam/selectItemParamAll',
    // 规格参数查询
    searchParams: '/api/params/search',
    // 规格参数添加
    addParams: '/api/backend/itemParam/insertItemParam',
    // 规格参数删除
    deleteParams: '/api/params/delete',
    // 统计数据接口
    statistic: '/api/statistical',
    // 月销售额统计
    sellTotal: '/api/sellTotal',
}

export default base;