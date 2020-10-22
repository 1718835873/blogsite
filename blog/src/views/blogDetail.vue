<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-10 17:42:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-16 21:20:40
-->
<template>
    <div>
        <div class="go-back" >
            <span class="glyphicon glyphicon-arrow-left" @click="goBack"></span>
        </div>
        <div class="blog-detail-area">
            <div class="container">
                <div class="page-header">
                    <h3>{{blogDetail.blogName}}</h3>
                     <div>
                         <span class="glyphicon glyphicon-pencil" style="color:green;margin-right:20px" @click="editorBlog(blogDetail.blogId)" v-if="userInfo.userId==blogDetail.userId"></span>
                         <span class="glyphicon glyphicon-trash" style="color:orangered;"  @click="delBlog(blogDetail.blogId)"></span>
                        
                     </div>
                </div>
                <p v-html="blogDetail.blogTxt">
                 </p>
                <div class="footer well">
                    <div class="left-area">
                        <img :src="blogDetail.avatar?blogDetail.avatar:avatar" alt=""> <span class="text-info">{{blogDetail.userName}}</span>
                    </div>
                    <div class="right-area">
                        <span>{{blogDetail.publishTime|formateDate}}</span>
                        <span class="glyphicon glyphicon-heart" @click="love(blogDetail.blogId)" style="color:hotpink"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            blogId:"",
            blogDetail:{},
            userInfo:{},
            avatar:require("../assets/avatar.png")
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.blogId=this.$route.query.blogId;
        // 获取详情  根据博客id和用户id
        var userInfo=JSON.parse(localStorage.getItem("userInfo"))
        this.userInfo=userInfo;
        $.ajax({
            url:"http://localhost:3000/getBlogDetail",
            data:{
                blogId:this.blogId
            },
            type:"GET",
            success:res=>{
                this.blogDetail=res.data[0]
                console.log(res)
            }
        })
        
    },
    watch: {

    },
    methods: {
        // 返回
        goBack(){
            this.$router.go(-1)
        },
        // 修改博客操作
        editorBlog(blogId){
            this.$router.push({
                path:"/editorBlog",
                query:{blogId:blogId}
            })
        },
        // 删除博客操作
        delBlog(blogId){
            var userId=this.userInfo.userId;
            $.ajax({
                url:"http://localhost:3000/deleteBlog",
                type:"GET",
                data:{
                    userId,
                    blogId
                },
                success:res=>{
                    console.log(res)
                    if(res.code==1){
                        alert("删除博客成功")
                        this.$router.replace({path:"/personal"})
                    }else{
                        alert("删除博客失败")
                    }
                }
            })
        },

        // 搜藏
        love(blogId){
            var userId=this.userInfo.userId;
            var avatar=this.blogDetail.avatar;
            var blogName=this.blogDetail.blogName;
            var blogTxt=this.blogDetail.blogTxt;
            var publishTime=this.blogDetail.publishTime;
            var userName=this.blogDetail.userName
            console.log({userId,blogId,avatar,blogName,blogTxt,publishTime,userName})
            $.ajax({
                url:"http://localhost:3000/collectBlog",
                data:{userId,blogId,avatar,blogName,blogTxt,publishTime,userName},
                type:"POST",
                success:res=>{
                    console.log(res)
                    alert(res.msg)
                    
                },
                error:err=>{
                    alert('操作失败')
                }
            })
        }
    },
    components: {

    },
};
</script>

<style scoped>
.left-area >img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #f0f0f0;
}
.footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
}



.go-back>span{
    background: #bad6ee;
    border-radius: 50%;
    padding: 10px;
    position:fixed;
    top: 20px;
    left: 20px;
}
.page-header{
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.page-header >span{
    color: orangered;
    font-size: 20px;
}
</style>
