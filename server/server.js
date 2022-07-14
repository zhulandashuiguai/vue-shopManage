// 搭建express服务器
const express = require('express')

const app = express()
    //post 请求表单数据
app.use(express.urlencoded({ extended: true }))

//静态文件托管 ----  访问：http:localhost:8989/xxx.jpg
app.use(express.static('upload'))
    // 路由
const router = require('./router.js')
app.use(router)

app.listen(8989, () => {
    console.log('8989');
})