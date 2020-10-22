<template>
  <div class="forget-code">
    <div class="form-horizontal form-area">
      <div class="form-group">
        <label for="username" class="col-sm-2 control-label">用户名</label>
        <div class="col-sm-8">
          <input
            type="text "
            class="form-control"
            id="username"
            placeholder="请输入用户名"
            v-model="username"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="password" class="col-sm-2 control-label">新密码</label>
        <div class="col-sm-8">
          <input
            type="password "
            class="form-control"
            id="password"
            placeholder="请输入新密码"
            v-model="password"
          />
        </div>
      </div>

      <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button class="btn btn-success" @click="login">登录</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgetCode",
  props: {},
  data() {
    return {
      username:"",
      password:""
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {

    login(){
      var that=this;
      var username=this.username;
      var password=this.password;
      if(!username){
                    alert("请输入用户名")
                    return;
                }
                if(!password){
                    alert("请输入密码")
                    return;
                }

                $.ajax({
                    url:"http://localhost:3000/forgetPassword",
                    type:"POST",
                    data:{
                        userName:username,
                        password

                    },
                    success:res=>{
                        console.log(res)
                        if(res.code==2){
                            alert(res.msg)
                        }else if(res.code==1){
                            alert(res.msg)
                            // window.open("./index.html")
                            that.$router.replace("/index")
                        }
                    },
                    error:err=>{
                        console.log(err)


                    }

                })
    }
  },
  components: {},
};
</script>

<style scoped>
.forget-code{
    height: 100vh;
    background: #f0f0f0;
}
.form-area{
    padding-top: 100px;
}
</style>
