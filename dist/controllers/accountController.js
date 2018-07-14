"use strict";var path=require("path"),captchapng=require("captchapng"),databasetool=require(path.join(__dirname,"../tools/databasetool.js"));exports.getLoginPage=function(e,s){s.sendFile(path.join(__dirname,"../views/login.html"))},exports.getImageVcode=function(e,s){var n=parseInt(9e3*Math.random()+1e3);e.session.vcode=n;var t=new captchapng(80,30,n);t.color(0,0,0,0),t.color(80,80,80,255);var o=t.getBase64(),a=new Buffer(o,"base64");s.writeHead(200,{"Content-Type":"image/png"}),s.end(a)},exports.getRegisterPage=function(e,s){s.sendFile(path.join(__dirname,"../views/register.html"))},exports.register=function(n,t){var o={status:0,message:"注册成功"},e=n.body.username;databasetool.findOne("accountInfo",{username:e},function(e,s){null!=s?(o.status=1,o.message="用户名已经存在!",t.json(o)):databasetool.insertOne("accountInfo",n.body,function(e,s){null==s&&(o.status=2,o.message="注册失败!"),t.json(o)})})},exports.login=function(n,t){var o={status:0,message:"登录成功"},e=n.body,a=e.username,s=e.password;if(e.vcode!=n.session.vcode)return o.status=1,o.message="验证码错误!",void t.json(o);databasetool.findOne("accountInfo",{username:a,password:s},function(e,s){null==s?(o.status=2,o.message="用户名或密码错误"):n.session.loginedName=a,t.json(o)})},exports.logout=function(e,s){e.session.loginedName=null,s.send('<script>location.href="/account/login"<\/script>')};