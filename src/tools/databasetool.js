const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'szhmqd18';

/**
 * 这个模块是承上启下的，它里面暴露给控制器调用的方法，应该是通用
 */

 /**
  * 暴露出去的一个通用的插入一条文档的方法，这个方法是给所有控制器用的
  * 
  * 参数1：要操作的集合名称
  * 参数2：要操作的数据
  * 参数3：回调函数，通过回调函数，把操作数据库的结果(成功或是失败)传递给调用它的控制器
  */
exports.insertOne = (collectionName,params,callback) => {
     //1.连接
    MongoClient.connect(url, {useNewUrlParser: true},function(err, client) {
        const db = client.db(dbName);
    
        //获取集合，进行操作
        const collection = db.collection(collectionName);

        //调用collection插入一个的方法
        collection.insertOne(params,(err,result)=>{
            client.close();

            //调用回调函数，把结果告知控制器
            callback(err,result)
        })
    })
 }

  /**
  * 暴露出去的一个通用的查询一条文档的方法，这个方法是给所有控制器用的
  * 
  * 参数1：要操作的集合名称
  * 参数2：要操作的数据
  * 参数3：回调函数，通过回调函数，把操作数据库的结果(成功或是失败)传递给调用它的控制器
  */
 exports.findOne = (collectionName,params,callback) => {
     //1.连接
     MongoClient.connect(url, {useNewUrlParser: true},function(err, client) {
        const db = client.db(dbName);
    
        //获取集合，进行操作
        const collection = db.collection(collectionName);

        //调用数据库的查询一个的方法
        collection.findOne(params,(err,doc)=>{
            client.close()

            //通过回调函数把操作数据的结果，传递给调用它的控制器
            callback(err,doc)
        })
    })
 }

  /**
  * 暴露出去的一个通用的查询满足条件多条文档的方法，这个方法是给所有控制器用的
  * 
  * 参数1：要操作的集合名称
  * 参数2：要操作的数据
  * 参数3：回调函数，通过回调函数，把操作数据库的结果(成功或是失败)传递给调用它的控制器
  */
 exports.findList = (collectionName,params,callback) => {
     //1.连接
     MongoClient.connect(url, {useNewUrlParser: true},function(err, client) {
        const db = client.db(dbName);
    
        //获取集合，进行操作
        const collection = db.collection(collectionName);

        //查询多条数据
        collection.find(params).toArray((err,docs)=>{
            client.close()

            //通过回调，把结果传递给调用它的控制器
            callback(err,docs)
        })
     })
 }