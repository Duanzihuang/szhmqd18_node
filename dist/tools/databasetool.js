"use strict";var MongoClient=require("mongodb").MongoClient,ObjectId=require("mongodb").ObjectId;exports.ObjectId=ObjectId;var url="mongodb://localhost:27017",dbName="szhmqd18",getCollection=function(t,c){MongoClient.connect(url,{useNewUrlParser:!0},function(n,e){var o=e.db(dbName).collection(t);c(e,o)})};exports.insertOne=function(e,t,c){MongoClient.connect(url,{useNewUrlParser:!0},function(n,o){o.db(dbName).collection(e).insertOne(t,function(n,e){o.close(),c(n,e)})})},exports.findOne=function(e,t,c){MongoClient.connect(url,{useNewUrlParser:!0},function(n,o){o.db(dbName).collection(e).findOne(t,function(n,e){o.close(),c(n,e)})})},exports.findList=function(e,t,c){MongoClient.connect(url,{useNewUrlParser:!0},function(n,o){o.db(dbName).collection(e).find(t).toArray(function(n,e){o.close(),c(n,e)})})},exports.updateOne=function(n,e,t,c){getCollection(n,function(o,n){n.updateOne(e,{$set:t},function(n,e){o.close(),c(n,e)})})},exports.deleteOne=function(n,o,t){getCollection(n,function(n,e){e.deleteOne(o,function(n,e){t(n,e)})})};