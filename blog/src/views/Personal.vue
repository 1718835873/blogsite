<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-10 16:13:09
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-14 13:32:39
-->
<template>
    <div>
        <div class="personal-area">
           <aside>
               <ul class="aside-group">
                   <li>
                       <img :src="userInfo.avatar?userInfo.avatar:avatar" class="navbar-brand"/>    
                        <span style="display:block">山吹同学</span>
                   </li>
                   <router-link class="aside-item" tag="li" to="bloglist">我的博客</router-link>
                   <router-link class="aside-item" tag="li" to="add">添加博客</router-link>
                   <router-link class="aside-item" tag="li" to="editorname">修改昵称</router-link>
                   <router-link class="aside-item" tag="li" to="upavatar">上传头像</router-link>
                   <router-link class="aside-item" tag="li" to="collect">我的收藏</router-link>
               </ul>
           </aside>


           <div class="main">
               <router-view></router-view>
           </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Personal",
    props: {

    },
    data() {
        return {
            avatar:require("@/assets/avatar.png"),
            userInfo:{}
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        var userInfo=JSON.parse(localStorage.getItem("userInfo"))
        this.userInfo=userInfo
    },
    watch: {

    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped>
.aside-group{
    text-align: center;
    width: 100px;
    background: papayawhip;
    position: fixed;
    top: 50px;
    padding-left: 0px;
    /* border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px; */


}
.aside-group li{
    list-style: none;
    height:50px;
    line-height:50px;
    border-bottom: 1px saddlebrown solid;

}
.main{
    margin-left: 150px;
}
.aside-group li:first-child{
    height: 130px;
    text-align: center;
    line-height: normal;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.aside-group li img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    padding: 0px;
    display: block;
}
.aside-group li>span{
    display: block;
    margin-top: 10px;
}
</style>
