const xtpl = require('xtpl')
const path = require('path')
const databasetool = require(path.join(__dirname,"../tools/databasetool.js"))
/**
 * 暴露出去，查询学生列表的方法
 */
exports.getStudentListPage = (req,res) => {
    //1.获取到关键字的值
    const keyword = req.query.keyword || ""
    
    //2.调用databasetool.js的方法
    databasetool.findList('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
        xtpl.renderFile(path.join(__dirname,"../views/list.html"),{studentList:docs,keyword},(err,content)=>{
            res.send(content)
        })
    })
}