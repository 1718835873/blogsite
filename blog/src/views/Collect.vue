<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-13 20:43:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-16 19:28:31
-->
<template>
    <div>
        <div class="area">
            <div class="alert alert-info" role="alert">我的收藏</div>
            <blog-list :blogLists="blogLists"></blog-list>
        </div>
    </div>
</template>

<script>
import BlogList from "@/components/blogList"
export default {
    props: {

    },
    data() {
        return {
            blogLists:[],
            userInfo:{}
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        // 根据用户Id获取用户收藏的博客
        var userInfo=JSON.parse(localStorage.getItem("userInfo"))
        this.userInfo=userInfo;
        this.getBlogList(this.userInfo.userId)

    },
    watch: {

    },
    methods: {
        // 获取收藏博客列表
        getBlogList(userId){
            $.ajax({
                url:"http://localhost:3000/getCollectBlog",
                data:{
                    userId:userId
                },
                type:"GET",
                success:res=>{
                    if(res.code==1){
                    this.blogLists=res.data
                    }
                }
            })
        }
    },
    components: {
        BlogList
    },
};
</script>

<style scoped>
.area{
    margin-top: 60px;
}
</style>
