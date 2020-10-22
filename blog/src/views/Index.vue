<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-13 20:17:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-16 21:14:43
-->
<template>
  <div>
    <div class="index">
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
          <p :class="['navbar-text',flag==1?'active-tag':'' ]" @click="goHome">首页</p>
          <p :class="['navbar-text',flag==2?'active-tag':'' ]" @click="goPersonal">个人中心</p>
          <form class="navbar-form navbar-left">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="请输入" v-model="searchValue" />
            </div>
            <a class="btn btn-info" @click="Search">搜索</a>
          </form>
          <p class="navbar-text navbar-right">
            欢迎，<span class="username">{{ userName }}</span>
          </p>
        </div>
      </nav>
      <div class="container">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {},
  data() {
    return {
      userName: "",
      flag:1,
      searchValue:"",//搜索的内容
    };
  },
  computed: {},
  created() {},
  mounted() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userName = userInfo.userName;

    // 获取当前路由
    // this.$nextTick(()=>{
      
    this.$forceUpdate()
    // })
  },
  updated() {
    var path=this.$route.path;
    console.log(path)
    
    // if(path==="/personal/bloglist"){
    //   this.flag=2
    //   console.log("---------------------------")
    //   this.$forceUpdate();
    //   console.log(this.flag)
    // }else{
    //   this.flag=1
    //   this.$forceUpdate();
    //   console.log("++++++++++++++++++++++++++++")
    // }
  },
  watch: {},
  methods: {
    //   首页
    goHome() {
      this.flag=1
      this.$router.push({ path: "/index/home" });
    },
    //   个人中心
    goPersonal() {
      this.flag=2
      this.$router.push({ path: "/index/personal" });
    },
    // Search 搜索
    Search(){
      var value=this.searchValue
      if(value.trim().length<1){
        alert("请输入要搜索的内容")
        return false;
      } 

      this.$router.push({
        path:"/searchValue",
        query:{
          searchValue:value
        }
      })
      
    }
  },
  components: {},
};
</script>

<style scoped>
</style>
