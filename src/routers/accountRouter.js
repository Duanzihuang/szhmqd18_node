//导入express
const express = require('express')
const path = require('path')

//创建路由对象
// http://www.expressjs.com.cn/4x/api.html#router
const accountRouter = express.Router()

const accountCTRL = require(path.join(__dirname,"../controllers/accountController.js"))

//当浏览器发送了 http://127.0.0.1:3000/account/login 交给对应的控制器 accountCTRL 的 getLoginPage 方法处理
accountRouter.get('/login',accountCTRL.getLoginPage)

//导出路由模块(路由中间件)
module.exports = accountRouter