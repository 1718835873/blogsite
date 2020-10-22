<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-16 19:50:50
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-16 20:37:33
-->
<template>
  <div>
    <div class="container">
      <div class="alert alert-info" role="alert">修改博客</div>
      <div class="form-group">
        <label for="blogname">博客标题</label>
        <input
          type="text"
          class="form-control"
          placeholder="请输入博客标题"
          v-model="title"
        />
      </div>
      <div class="form-group">
        <label for="blogtxt">博客正文</label>
        <div id="editor" class="editor"></div>
      </div>

      <div class="form-group">
        <button class="btn btn-info" @click="editorBlog">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "wangeditor";
export default {
  props: {},
  data() {
    return {
      editor: "",
      blogContent: "",
      title: "",
      blogDetail:{}
    };
  },
  computed: {},
  created() {},
  mounted() {
    var editor = new Editor("#editor");
    editor.create();
    this.editor = editor;
    var blogId = this.$route.query.blogId;
    // 根据blogId获取博客详情
    $.ajax({
      url: "http://localhost:3000/getBlogDetail",
      data: { blogId },
      type: "GET",
      success: (res) => {
        console.log(res);
        this.blogDetail = res.data[0];
        this.blogContent = res.data[0].blogTxt;
        this.title = res.data[0].blogName;
        // 配置内容
        editor.txt.html(this.blogContent);
      },
    });

    // 配置 onchange 回调函数
    var that=this;
    editor.config.onchange = function (newHtml) {
    //   console.log("change 之后最新的 html", newHtml);
      that.blogContent = newHtml;
    };
    // 配置触发 onchange 的时间频率，默认为 200ms
    editor.config.onchangeTimeout = 100; // 修改为 500ms
  },
  watch: {},
  methods: {
    editorBlog() {
        var userId=this.blogDetail.userId
        var blogId=this.blogDetail.blogId;
        var blogName=this.title
        var blogTxt=this.blogContent;
        $.ajax({
            url:"http://localhost:3000/editorBlog",
            type:"POST",
            data:{
                userId,
                blogId,
                blogName,
                blogTxt
            },
            success:res=>{
                console.log(res)
                if(res.code==1){
                    alert(res.msg)
                    this.$router.replace({
                        path:"/index/home"
                    })
                }
            },
            error:err=>{
                console.log(err)
            }
        })
    },
  },
  components: {},
};
</script>

<style scoped>
</style>
