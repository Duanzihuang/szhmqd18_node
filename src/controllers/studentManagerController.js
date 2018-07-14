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

/**
 * 暴露出去，获取修改学生的页面
 */
exports.getEditStudentPage = (req,res)=>{
    const _id = databasetool.ObjectId(req.params.studentId)

    databasetool.findOne('studentInfo',{_id},(err,doc)=>{
        xtpl.renderFile(path.join(__dirname,"../views/edit.html"),{studentInfo:doc},(err,content)=>{
            res.send(content)
        })
    })
}

/**
 * 暴露出去，修改学生的方法
 */
exports.editStudent = (req,res) => {
    //获取传递过来的参数
    const _id = databasetool.ObjectId(req.params.studentId)
    
    databasetool.updateOne('studentInfo',{_id},req.body,(err,result)=>{
        if(result == null) {//失败
            res.send('<script>alert("修改失败")</script>')
        }else {
            res.send('<script>location.href = "/studentmanager/list"</script>')
        }
    })
}

/**
 * 暴露出去，删除学生的方法
 */
exports.deleteStudent = (req,res) => {
    //获取传递过来的参数
    const _id = databasetool.ObjectId(req.params.studentId)

    //调用databasetool的删除一个的方法
    databasetool.deleteOne('studentInfo',{_id},(err,result)=>{
        if(result == null) {//失败
            res.send('<script>alert("删除失败")</script>')
        }else {
            res.send('<script>location.href = "/studentmanager/list"</script>')
        }
    })
}