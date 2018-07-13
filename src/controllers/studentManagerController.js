const xtpl = require('xtpl')
const path = require('path')
const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'szhmqd18';

/**
 * 暴露出去，查询学生列表的方法
 */
exports.getStudentListPage = (req,res) => {
    //1.获取到关键字的值
    const keyword = req.query.keyword || ""
    
    // Use connect method to connect to the server
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        
    //获取数据库操作的对象
    const db = client.db(dbName);

    //拿到集合，查询集合中的所有数据
    const collection = db.collection('studentInfo');

    collection.find({name:{$regex:keyword}}).toArray((err,docs)=>{
        client.close();

        xtpl.renderFile(path.join(__dirname,"../views/list.html"),{studentList:docs,keyword},(err,content)=>{
            res.send(content)
        })
    })
  });
}