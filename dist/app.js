"use strict";var express=require("express"),path=require("path"),bodyParser=require("body-parser"),session=require("express-session"),app=express();app.use(express.static(path.join(__dirname,"statics"))),app.use(bodyParser.urlencoded({extended:!1})),app.use(bodyParser.json()),app.use(session({secret:"keyboard cat",resave:!0,saveUninitialized:!0,cookie:{maxAge:6e5}})),app.all("*",function(e,s,r){if(e.url.includes("account"))r();else{if(!e.session.loginedName)return void s.send('<script>alert("您还没有登录，请先登录");location.href="/account/login"<\/script>');r()}});var accountRouter=require(path.join(__dirname,"./routers/accountRouter.js")),studentManagerRouter=require(path.join(__dirname,"./routers/studentManagerRouter.js"));app.use("/account",accountRouter),app.use("/studentmanager",studentManagerRouter),app.listen(3000,"127.0.0.1",function(e){e&&console.log(e),console.log("start OK")});