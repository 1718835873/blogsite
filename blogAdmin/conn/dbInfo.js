/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-11 15:30:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-11 21:07:26
 */
const  mysql=require("mysql");

module.exports={
    info:{
        host:"localhost",
        user:"root",
        password:'root',
        database:"blog"
    },
    dbConn:function(sql,sqlParams,callBack){
        let pool=mysql.createPool(this.info);
        pool.getConnection((err,connect)=>{
            if(err){
                console.log(err)
                return
            }
            connect.query(sql, sqlParams, callBack);
            connect.release();
        })
    }
}