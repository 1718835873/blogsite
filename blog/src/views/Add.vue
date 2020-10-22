<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-10 17:16:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-13 20:38:19
-->
<template>
    <div>
        <div class="add-area">
            <div class="alert alert-info" role="alert">添加博客</div>
            <div class="form-group">
                <label for="blogname">博客标题</label>
                <input type="text" class="form-control" placeholder="请输入博客标题" v-model="title">
            </div>
           <div class="form-group">
                <label for="blogtxt">博客正文</label>
               <div id="editor" class="editor"></div> 
           </div>

           <div class="form-group">
               <button class="btn btn-info" @click="addBlog">添加</button>
           </div>
        </div>
    </div>
</template>

<script>
import Editor from "wangeditor"
export default {
    name:"Add",
    props: {

    },
    data() {
        return {
            editor:"",
            blogContent:"",
            title:""
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        const editor=new Editor("#editor")
        this.editor=editor
        console.log(editor)
        var that=this
        editor.config.onchange = function (newHtml) {
            console.log('change 之后最新的 html', newHtml)
            that.blogContent=newHtml
        }
        // 配置触发 onchange 的时间频率，默认为 200ms
        editor.config.onchangeTimeout = 100 // 修改为 500ms
        editor.create()
    },
    watch: {

    },
    methods: {
        addBlog(){
           this.$nextTick(function(){
               if(!this.title){
                   alert("请输入博客标题")
                   return;
               }

               if(!this.blogContent){
                   alert("请输入博客内容")
                   return;
               }
                var userInfo=JSON.parse(localStorage.getItem("userInfo"))
                 // 开始添加博客
                 var sendData={
                     blogName:this.title,
                     blogTxt:this.blogContent,
                     userName:userInfo.userName,
                     userId:userInfo.userId,
                     avatar:userInfo.avatar
                 }
                 console.log("发送的数据",sendData)
                 $.ajax({
                     url:"http://localhost:3000/getBlog",
                     data:sendData,
                     method:"POST",
                     success:res=>{
                         console.log(res)
                         if(res.code==1){
                            this.title=""
                            this.blogContent=""
                            this.editor.txt.html("")

                             alert("添加博文成功")
                         }
                     },
                     error:err=>{
                        console.log(err)
                     }
                 })
           })
        },
        // 设置文本框内容为空
        setClear(){

        },
    },
    components: {

    },
};
</script>

<style scoped>
.add-area{
    margin-top: 60px;
}
</style>
