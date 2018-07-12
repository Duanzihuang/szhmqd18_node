const path = require('path')
/**
 * 暴露了一个获取登录页面的方法，给路由调用
 */
exports.getLoginPage = (req,res)=>{
    res.sendFile(path.join(__dirname,"../views/login.html"))
}