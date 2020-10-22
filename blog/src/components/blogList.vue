<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-10 15:51:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-13 21:18:18
-->
<template>
    <div class="area">
        <div class="blog-group" v-for="(item) in blogLists" :key="item.blogId"  @click="goBlogDetail(item.blogId)">
            <div class="left-img">
                <img :src="item.avatar.length>0?item.avatar:avatar" alt="">
            </div>
            <div class="right-area">
                <p><a href="#">{{item.userName}}</a>发表博客: <a href="#">{{item.blogName}}</a> &nbsp;&nbsp;
                <span>{{item.publishTime|formateDate}}</span><span class="glyphicon glyphicon-trash" @click.stop="del(item.blogId)" v-show="blogListState==2"></span></p>
                <p class="blog-txt" v-html="item.blogTxt"></p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name:"BlogList",
    props: {
        blogLists:{
            type:Array
        },
        blogListState:{//控制垃圾桶的出现，如果是2 表示查看自己的博客列表可以删除,否者不可以
            type:Number
        }
    },
    data() {
        return {
            avatar:require("../assets/avatar.png")
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
         goBlogDetail(blogId){
             // 真实使用时需要传递博文编号
             console.log(blogId)
             this.$router.push({path:"/blogdetail",query:{blogId:blogId}})
         },
        //  删除博客
        del(blogId){
            alert(blogId)
        }
    },
    components: {

    },
};
</script>

<style scoped>
.blog-group{
    margin-top: 30px;
    display: flex;
    border-bottom: 1px dashed #c0c0c0;
}
.left-img{
    margin-right: 20px;
}
.left-img img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #f0f0f0;
}
.glyphicon-trash{
    display: inline-block;
    margin-left: 40px;
    color: orangered;
}
</style>
