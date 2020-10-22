<!--
 * @Descripttion: 登录页面
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-10 09:18:54
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-16 17:32:48
-->
<template>
  <div class="login-area">
    <div class="alert-area" v-show="msg">
      <alert :alertMsg="msg"></alert>
    </div>
    <div class="form-horizontal box-area">
      <div class="form-group">
        <label for="username" class="col-sm-2 control-label">用户名</label>
        <div class="col-sm-8">
          <input type="text" v-model="username" class="form-control" id="username" placeholder="请输入用户名" />
        </div>
      </div>
      <div class="form-group">
        <label for="password" class="col-sm-2 control-label">密码</label>
        <div class="col-sm-8">
          <input type="password" v-model="password" class="form-control" id="password" placeholder="请输入密码" />
        </div>
      </div>

      <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
              <button class="btn btn-success" @click="Gologin">登录</button>
              <button class="btn btn-info" @click="register">注册</button>
              <a href="#" class="btn btn-link" @click="forgetCode">忘记密码</a>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import Alert from "@/components/Alert"
export default {
  name: "Login",
  components:{
    Alert
  },
  data() {
    return {
      username:"",
      password:"",
      msg:""
    };
  },
  methods: {
      Gologin(){
        var username=this.username;
        var password=this.password;
        if(!this.username){
          this.msg="请输入用户名."
          setTimeout(()=>{
            this.msg=""
          },1000)
          return false;
        }

        if(!this.password){
          this.msg="请输入密码."
          setTimeout(()=>{
            this.msg=""
          },1000)
          return false;
        }

        $.ajax({
          url:"http://localhost:3000/login",
          method:'POST',
          data:{
            "username":username,
            "password":password
          },
          success:res=>{
            console.log(res)
            if(res.code==1){
              this.msg=res.msg;
              localStorage.setItem("userInfo",res.data)
              // 登录注册 状态的存储
              sessionStorage.setItem("flag",1)
              setTimeout(()=>{
                this.msg=""
              },1000)
               this.$router.replace({path:"/index"})
              return;
            }else{
              this.msg=res.msg;
               setTimeout(()=>{
                this.msg=""
              },1000)
              return;
            }

          },
          error:err=>{
            console.log(err)
            this.msg="用户登录失败"
               setTimeout(()=>{
                this.msg=""
              },1000)
          }
        })

         
      },
      // 注册
      register(){
        var username=this.username;
        var password=this.password;
        if(!this.username){
          this.msg="请输入用户名."
          setTimeout(()=>{
            this.msg=""
          },1000)
          return false;
        }

        if(!this.password){
          this.msg="请输入密码."
          setTimeout(()=>{
            this.msg=""
          },1000)
          return false;
        }


        $.ajax({
          url:"http://localhost:3000/register",
          type:"POST",
          data:{
            "username":username,
            "password":password
          },
          success:(res)=>{
            this.msg=res.msg
            setTimeout(()=>{
              this.msg=""
            },1000)
            if(res.code==1){
              // 注册成功,将用户数据保存到数据库中,跳转到首页
              console.log(res.data)
              var saveData=JSON.stringify(JSON.parse(res.data))
              console.log(saveData)
                localStorage.setItem("userInfo",saveData)
                sessionStorage.setItem("flag",1)
                this.$router.replace({path:"/index"})
            }


          },
          error:(err)=>{
            console.log(err)
          }
        })
      },
    //   忘记密码
    forgetCode(){
        this.$router.push({
            path:"/forgetcode"
        })
    },
  },
};
</script>
<style scoped>
.login-area{
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    background: #f0f0f0;
}
.box-area{
    padding-top: 100px;
}
</style>>
