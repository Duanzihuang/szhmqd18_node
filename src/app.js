//1.0 导入express
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

//2.0 创建app
const app = express()

//node中处理静态资源
app.use(express.static(path.join(__dirname,"statics")))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//3.0 集成路由中间件
const accountRouter = require(path.join(__dirname,"./routers/accountRouter.js"))
app.use('/account',accountRouter)

//4.0 开启
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }

    console.log('start OK')
})