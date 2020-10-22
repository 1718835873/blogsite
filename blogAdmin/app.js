/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-11 15:29:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-17 13:32:54
 */
const express=require("express");
const app=express();
const cors=require("cors")
const path=require("path")
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// 设置静态资源路径


// 设置图片上传模块
const multer=require("multer");
const upload=multer({dest:"uploads/"})//配置图片文件的路径
const fs=require("fs")

//设置跨域请求
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use("/static",express.static(path.join(__dirname,"./uploads")))
const db=require("./conn/dbInfo.js");
const { create } = require("domain");
const { count } = require("console");




app.listen(3000,()=>{
    console.log("app is start!");
})

// 注册接口
app.post("/register",(req,res)=>{
    console.log("-----------")
    console.log(req.body)
    var username=req.body.username;
    var password=req.body.password;
    // 在数据库中查看是否有这个用户名存在

    var sql=`select * from user where userName=?`;
    var sqlArr=[username];
    var callBack=function(err,data1){
        if(err){
            console.log(err);
            res.send({
                msg:"注册失败",
                code:-1
            })
            return;
        }
        console.log(data1)
        console.log(data1.length)
        if(data1.length>=1){
            res.send({
                msg:"该用户名已经被使用",
                code:-1
            })
            return false;
        }else{
            // 插入数据
            // 自动生成用户Id
            var userId = "id" + parseInt((new Date()).getTime()) +""+parseInt(Math.random() * 1000)
            var createTime = parseInt((new Date()).getTime()/1000)
            var insertSql="insert into user set userId=?, userName=?,password=?,createTime=?";
            var insertData=[userId,username,password,createTime];
            var sendData = JSON.stringify({
                "userId": userId,
                "userName": username,
                "avatar": "",
                "states": 2,
                "createTime": createTime
            })
            var callback=function(err,data){
                if(err){
                    res.send({
                        code:-1,
                        msg:"注册用户失败"
                    })
                    return;
                }
                console.log("注册的数据",data)
                res.send({
                    msg:'注册用户成功',
                    code:1,
                    data: sendData
                })
                return;
            }

            db.dbConn(insertSql,insertData,callback)

        }


    }

    db.dbConn(sql,sqlArr,callBack)
})
// 登录接口

app.post("/login",(req,res)=>{
    var username=req.body.username;
    var password=req.body.password;
    var states=req.body.states || '2'
    console.log("状态------", states)
    // console.log("我是数据")
    // console.log("我是数据",req.body)

    // 首先在用户表中查找是否有这个用户
    var sql=`select * from user where userName=? and password=? and states=?`;
    var sqlArr = [username, password, states];
    var callBack=function(err,data){
        if(err){
            console.log("出错了",err)
            res.send({
                code:-1,
                msg:"登录失败"
            })
            return;
        }
        // console.log("------------------")
        console.log("conn", data)
        if(data.length!=1){
            res.send({
                code:2,
                msg:"用户或密码错误"
            })
            return;
        }
        var newData = JSON.stringify(data[0])

        res.send({
            code:1,
            data: newData,
            msg:"用户登录成功"
        })
    }

    db.dbConn(sql, sqlArr, callBack)
})


// 获取博客文章 并将它存入到article表中
app.post("/getBlog",(req,res)=>{
    console.log(req.body)
    let blogName=req.body.blogName;
    let blogTxt = req.body.blogTxt;
    let userName = req.body.userName;
    var userId = req.body.userId;
    var avatar=req.body.avatar
    let blogId = "blogid" + parseInt((new Date()).getTime()/1000)+""+parseInt(Math.random()*1000)
    let publishTime = parseInt((new Date()).getTime() / 1000)

    var sql ="insert into article set blogId=?,blogName=?,blogTxt=?,userName=?,userId=?,publishTime=?,avatar=?";
    var sqlArr = [blogId, blogName, blogTxt, userName, userId, publishTime, avatar];
    var callback=function(err,conn){
        if(err){
            res.send({
                code:-1,
                msg:"添加博客失败"
            })
            return;
        }
        console.log(conn.OkPacket)
        console.log(conn)
        res.send({
            code:1,
            msg:"添加博客成功"
        })
    }
    db.dbConn(sql,sqlArr,callback)
})


// 获取所有博文或者用户自己的博文（根据是否传递用户id判断)

app.get("/getAllBlogs",(req,res)=>{
    var userId = req.query.userId || "";
    console.log("用户id判断是否存在",userId)
    // console.log("用户Id",userId)
    var page=req.query.page;
    var limita=req.query.limit;
    var start=(page-1)*limita
    // 查询有多少条数据
    if(!userId){
        // 不存在
        var sql ="select COUNT(*) as total from article"
        var sqlArr=[]
    }else{
        var sql = "select COUNT(*) as total from article where userId=?";
        var sqlArr = [userId];
    }
    
    var callback=function(err,conn){
        if(err){
            console.log(err)
            res.send({
                code:-1,
                msg:"获取博客列表失败",
                msg:{}
            })
            return;
        }
        console.log(conn)
        console.log("--------------------------------------")
        var total=conn[0].total;//获取到的博客列表的数量
        console.log(total,"这里有数据")
        if (!userId) {
            // 不存在
            var querySql = `select * from article limit ${start}, ${limita} `
            var querySqlArr = []
        } else {
            var querySql = `select * from article where userId=? limit ${start}, ${limita} `;
            var querySqlArr = [userId];
        }
        var queryCallBack=function(err,data){
            if(err){
                console.log(err)
                res.send({
                    code: -1,
                    msg: "获取博客列表失败",
                    msg: {}
                })
                return;
            }
            console.log(limita,"limit")
            console.log("我是里面的-----------------------")
            res.send({
                code: 1,
                msg: "获取博客列表成功",
                data: data,
                page:page,
                limit: limita,
                totalNum:total
            })
        }
        db.dbConn(querySql,querySqlArr,queryCallBack);
        // return;
    }
    db.dbConn(sql,sqlArr,callback);
})

// 根据博客id获取博客详情
app.get("/getBlogDetail",(req,res)=>{
    var blogId=req.query.blogId;
    console.log("============", req.query)
    var sql="select * from article where blogId=?";
    var sqlArr=[blogId];
    var callback=function(err,data){
        if(err){
            console.log(err)
            res.send({
                code:-1,
                msg:"获取博客详情失败"
            })
        }
        console.log("==================================================")
console.log(data)
        res.send({
            code:1,
            msg:'获取博客详情成功',
            data:data
        })
    }
    db.dbConn(sql,sqlArr,callback)
})


// 根据用户Id用于修改昵称
app.post("/editorNickname",(req,res)=>{
    var userId = req.body.userId;
    var newNickname=req.body.userName;
    var sql="update user set userName=? where userId=?";
    var sqlArr = [newNickname,userId];
    var callback=function(err,conn){
        if(err){
            res.send({
                code:-1,
                msg:'用户修改昵称失败'
            })
            return;
        }

        res.send({
            code:1,
            msg:"用户修改昵称成功",
            data:newNickname
        })
    }

    db.dbConn(sql,sqlArr,callback);
})

// 根据用户Id 及用户上传的图片修改头像

app.post("/uploadAvatar",upload.single("file"),(req,res,next)=>{
    var userId=req.body.userId;
    

    // 先判断用户是否已经存在头像了，如果有为了节省空间，就不要上传了
    var sql="select avatar from user where userId=?";
    var sqlArr=[userId];
    var callback=function(err,data){
        if(err){
            res.send({
               code:-1,
               msg:"用户上传头像失败" 
            })
        }

        console.log("这是结果",data)
        if(!data.length){
            var file=req.file;
    console.log("++++++++++++++++++++++++++++++------------------+++++++++++++++++++++++")
    console.log("头像信息",file)
    var mime=file.mimetype.split('/')[1];
    fs.renameSync("./uploads/"+file.filename,"./uploads/"+file.filename+"."+mime);
    var newName="http://localhost:3000/static/"+file.filename+"."+mime;
            var updateSql="update user set avatar=? where userId=?";
            var updateSqlArr = [newName,userId];
            var updateCallback=function(err,data){
                if(err){
                    res.send({
                        code:-1,
                        msg:'用户上传头像失败'
                    })                    
                }
                res.send({
                    code:1,
                    msg:'用户上传头像成功',
                    avatar: newName
                })
            }
            db.dbConn(updateSql, updateSqlArr,updateCallback)
        }else{
            res.send({
                code:1,
                msg:"您已经有一张头像了。"
            })
        }
    }
    db.dbConn(sql,sql,callback)


})

// 根据用户id和博客id删除博客

app.get("/deleteBlog",(req,res)=>{
    var userId=req.query.userId;
    var blogId=req.query.blogId;

    var sql="delete from article where userId=? and blogId=?";
    var sqlArr=[userId,blogId];
    var callback=function(err,data){
        if(err){
            res.send({
                code:-1,
                msg:"删除博客失败"
            })
        }

        res.send({
            code:1,
            msg:"删除博客成功",
            data:data
        })
    }
    db.dbConn(sql,sqlArr,callback)
})


// 收藏博客 取消收藏
app.post("/collectBlog",(req,res)=>{
    // avatar,blogName,blogTxt,publishTime,userName
    var userId=req.body.userId;
    var blogId=req.body.blogId;
    var avatar=req.body.avatar;
// ,userName,blogName,blogTxt,publishTime
    var userName=req.body.userName;
    var blogName=req.body.blogName;
    var blogTxt=req.body.blogTxt;
    var publishTime=req.body.publishTime;
    // 首先判断该博客是否被用户收藏，如果被收藏就是取消收藏，否者就是收藏
    var sql="select * from collect where collectId=? and blogId=?";
    var sqlArr=[userId,blogId];
    var callback=function(err,data){
        if(err){
            res.send({
                code:-1,
                msg:'用户收藏失败'
            })
        }
        console.log("查询的数据----------------------------------")
        console.log(data)
        if(data.length<1){
            // 代表收藏表中没有这条博客  加入收藏
            var addlove="insert into collect (collectId,blogId,userName,blogName,blogTxt,publishTime,avatar) values (?,?,?,?,?,?,?)"
            var addloveArr = [userId, blogId, userName, blogName, blogTxt, publishTime, avatar];
            var addloveCallback=function(err,data){
                if(err){
                    res.send({
                        code:-1,
                        msg:'加入收藏失败'
                    })
                }
                res.send({
                    code:1,
                    msg:'加入收藏'
                })
            }
            db.dbConn(addlove,addloveArr,addloveCallback);
        }else{
            // 代表收藏表中有这条博客  取消收藏
            var dellove="delete from collect where collectId=? and blogId=?";
            var delloveArr=[userId,blogId];
            var delloveCallback=function(err,data){
                if(err){
                    res.send({
                        code:-1,
                        msg:'取消收藏失败'
                    })

                }
                res.send({
                    code:1,
                    msg:"取消收藏"
                })
            }
            db.dbConn(dellove,delloveArr,delloveCallback)
        }
    }
    db.dbConn(sql,sqlArr,callback);

})

// 获取我的收藏的博客
app.get("/getCollectBlog",(req,res)=>{
    var userId=req.query.userId;
    var sql="select * from collect where collectId=?";
    var sqlArr=[userId];
    var callback=function(err,data){
        if(err){
            res.send({
                code:-1,
                msg:"用户获取收藏博客失败"
            })
        }
        res.send({
            code:1,
            msg:"用户获取收藏博客成功",
            data: data
        })
    }
    db.dbConn(sql,sqlArr,callback)
})

// 修改博客操作

app.post("/editorBlog",(req,res)=>{
    var blogName=req.body.blogName;
    var blogTxt=req.body.blogTxt;
    var userId=req.body.userId;
    var blogId=req.body.blogId;

    var sql="update article set blogName=? ,blogTxt=? where userId=? and blogId=?";
    var sqlArr=[blogName,blogTxt,userId,blogId];
    var callback=function(err,data){
        if(err){
            res.send({
               code:-1,
               msg:"用户修改博客失败" 
            })
        }
        res.send({
            code:1,
            msg:"用户修改博客成功"
        })
    }
    db.dbConn(sql,sqlArr,callback)
})

// 用户搜索查询  关键字可以是  博主或者博客关键字

app.get("/search",(req,res)=>{
    var searchValue=req.query.searchValue;
    console.log(searchValue)
    console.log("--------------------------------")
    var sql=`select * from article where blogName like '%${searchValue}%' or userName like '%${searchValue}%'`;
    console.log(sql)
    var sqlArr=[];
    var callback=function(err,data){
        if(err){
            res.send({
                code:-1,
                msg:"用户搜索操作出错"
            })
        }
        res.send({
            code:1,
            msg:'用户搜索操作成功',
            data:data
        })
    }
    db.dbConn(sql,sqlArr,callback)
})


// 查询用户列表

app.get("/getUserLists",(req,res)=>{
    // 分页查询
    var page=req.query.page;
    var limit =req.query.limit;
    var start=(page-1)*limit;

    var total;
    // 首先查询有多少条数据
    var sqlCount ="select count(*) as total from user";
    var callBack=function(err,data){
        if(err){
            res.send({
                code:-1,
                msg:"用户获取列表失败"
            })
        }
        total=data[0].total;
        var sql=`select * from user limit ${start} , ${limit}`;
        console.log(sql);
        var sqlArr=[];
        var callback=function(err,data){
            if(err){
                res.send({
                    code:-1,
                    msg:"获取用户列表失败"
                })
            }
            res.send({
                code:1,
                msg:"获取用户列表成功",
                data:{
                    page:page,
                    total:total,
                    data:data
                }
            })
        }
        db.dbConn(sql,sqlArr,callback);

    }
    db.dbConn(sqlCount,[],callBack);
    
})

// 删除用户
app.get("/delUser",(req,res)=>{
    var userId=req.query.userId
    var sql="delete from user where userId=?";
    var sqlArr=[userId];
    var callback=function(err,data){
        if(err){
            res.send({
                code:-1,
                msg:"用户删除操作失败"
            })
        }
        res.send({
            code:1,
            msg:"用户删除操作成功"
        })
    }
    db.dbConn(sql,sqlArr,callback)
})

// 分页查询博客列表
app.get("/getBlogLists", (req, res) => {
    // 分页查询
    var page = req.query.page;
    var limit = req.query.limit;
    var start = (page - 1) * limit;

    var total;
    // 首先查询有多少条数据
    var sqlCount = "select count(*) as total from article";
    var callBack = function (err, data) {
        if (err) {
            res.send({
                code: -1,
                msg: "用户获取列表失败"
            })
        }
        total = data[0].total;
        var sql = `select * from article limit ${start} , ${limit}`;
        console.log(sql);
        var sqlArr = [];
        var callback = function (err, data) {
            if (err) {
                res.send({
                    code: -1,
                    msg: "获取博客列表失败"
                })
            }
            res.send({
                code: 1,
                msg: "获取博客列表成功",
                data: {
                    page: page,
                    total: total,
                    data: data
                }
            })
        }
        db.dbConn(sql, sqlArr, callback);

    }
    db.dbConn(sqlCount, [], callBack);

})

// 删除博客
app.get("/delBlog", (req, res) => {
    var blogId = req.query.blogId
    var sql = "delete from article where blogId=?";
    var sqlArr = [blogId];
    var callback = function (err, data) {
        if (err) {
            res.send({
                code: -1,
                msg: "用户删除操作失败"
            })
        }
        res.send({
            code: 1,
            msg: "用户删除操作成功"
        })
    }
    db.dbConn(sql, sqlArr, callback)
})

// 用户找回密码操作
app.post("/forgetPassword",(req,res)=>{
    var userName=req.body.userName;
    var password=req.body.password;

    // 先查询列表中是否有这个用户
    var sql="select * from user where userName=?";
    var sqlArr=[userName];
    var callback=function(err,data){
        if(err){
            res.send({
                code:-1,
                msg:"用户查询失败"
            })
        }
        console.log(data)
        if(data.length>0){
            // 存在该用户

            var insertSql="update user set password=? where userName=?";
            var insertArr=[password,userName];
            var updateCallback=function(err,data){
                if(err){
                    res.send({
                        code:-1,
                        msg:"修改密码失败"
                    })
                }
                res.send({
                    code:1,
                    msg:"用户修改密码成功",
                    data:data
                })
            }
            db.dbConn(insertSql,insertArr,updateCallback)
        }else{
            res.send({
                code:2,
                msg:'不存在该用户'
            })
        }
    }
    db.dbConn(sql,sqlArr,callback)
})