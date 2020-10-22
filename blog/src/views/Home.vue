<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-10 11:54:04
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-13 20:21:36
-->
<template>
  <div class="home-area">
    
    <div class="content-area">
        <div class="container">
            <div class="blog-list">
                <router-view :blogLists="blogLists" :blogListState="1"></router-view>
            </div>
        </div>
    </div>
    <div class="container" style="text-align:center">
       <nav aria-label="Page navigation">
  <ul class="pagination">
    <li>
      <a href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li v-for="(item,index) in pageNumber" :key="index" @click="goPage(item)"><a href="#">{{item}}</a></li>
    <li>
      <a href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
    </div>
  </div>
</template>
<script>

export default {
  name: "Home",
  components: {

  },
  data() {
    return {
      userName:"",
      limit:5,//每页显示5条数据
      page:1,//当前页数
      totalNum:1,//总共条数
      pageNumber:1,//页码
      blogLists:[],//博客数据
    }
  },
  mounted() {
    var userInfo=JSON.parse(localStorage.getItem("userInfo"))
    this.userName=userInfo.userName;
    var userId=userInfo.userId;
    this.getBlog(this.limit,this.page);
  },
  methods: {
   
      // 点击页码
      goPage(pageNum){
        this.getBlog(this.limit,pageNum)
      },

      getBlog(limit,page){
        var userInfo=JSON.parse(localStorage.getItem("userInfo"))
        this.userName=userInfo.userName;
        var userId=userInfo.userId;
        $.ajax({
          url:"http://localhost:3000/getAllBlogs",
          data:{
            limit:limit,
            page:page
          },
          method:"GET",
          success:res=>{
            console.log(res)
            this.blogLists=res.data
            this.totalNum=res.totalNum;
            // 计算一下页吗
            var pageNumber=Math.ceil(this.totalNum/5)
            console.log("页码",pageNumber)
            this.pageNumber=pageNumber
            this.page=res.page;
          },
          error:err=>{
            console.log(err)
          }
        })
      }
  },
};
</script>
<style scope="scope">
.active-tag{
    font-weight: bold;
    color:rebeccapurple  !important;
}

.content-area{
    margin-top: 60px;
}
.avatar{
    width: 20px;
    height: 20px;
    
}
.username{
  color:#9b6cf3;
}

</style>