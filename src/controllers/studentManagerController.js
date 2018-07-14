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

/**
 * 暴露出去，获取新增页面的方法
 */
exports.getAddStudentPage = (req,res) =>{
    xtpl.renderFile(path.join(__dirname,"../views/add.html"),{},(err,content)=>{
        res.send(content)
    })
}

/**
 * 暴露出去，获取新增学生方法
 */
exports.addStudent = (req,res) => {
    databasetool.insertOne('studentInfo',req.body,(err,result)=>{
        if(result == null) {//失败
            res.send('<script>alert("插入失败")</script>')
        }else {
            res.send('<script>location.href = "/studentmanager/list"</script>')
        }
    })
}