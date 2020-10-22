<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-16 21:09:11
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-16 21:20:00
-->
<template>
    <div>
        <div class="go-back" >
            <span class="glyphicon glyphicon-arrow-left" @click="goBack"></span>
        </div>
        <div class="container">
            <blog-list :blogLists="blogLists"></blog-list>
            <div class="alert alert-warning" role="alert">没有更多数据了</div>
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
            blogLists:[]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        var value=this.$route.query.searchValue
         $.ajax({
        url:"http://localhost:3000/search",
        type:'GET',
        data:{
          searchValue:value
        },
        success:res=>{
          console.log(res)  
          this.blogLists=res.data
        }

      })
    },
    watch: {

    },
    methods: {
        goBack(){
            this.$router.replace({path:"/index/home"})
        }
    },
    components: {
        BlogList
    },
};
</script>

<style scoped>
    .go-back>span{
    background: #bad6ee;
    border-radius: 50%;
    padding: 10px;
    position:fixed;
    top: 20px;
    left: 20px;
}
</style>
