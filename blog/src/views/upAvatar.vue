<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-10 18:23:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-14 15:34:07
-->
<template>
  <div>
    <div class="up-avatar">
        <div class="alert alert-info" role="alert">上传头像</div>
      <!-- <form enctype="multipart/form-data" name="fileInfo"> -->
        <div class="form-group">
        <!-- <label for="exampleInputFile">File input</label> -->
        
        <input type="file" id="exampleInputFile" name="file" accept="image/*" multiple/>
        <br><br>
        <button class="btn btn-info" @click="uploadAvatar">上传</button>
      </div>
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
export default {
    name:"UpAvatar",
  props: {},
  data() {
    return {
      file:"",
      userInfo:{}
    };
  },
  computed: {},
  created() {},
  mounted() {
    var userInfo=JSON.parse(localStorage.getItem("userInfo"))
    this.userInfo=userInfo
  },
  watch: {},
  methods: {
    uploadAvatar(obj){
      let formData=new FormData();
      formData.append("file",$("input[type='file']")[0].files[0]);
      formData.append('userId',this.userInfo.userId)
      console.log(formData.get("file"));
      $.ajax({
        url:"http://localhost:3000/uploadAvatar",
        data:formData,
        method:"POST",
        processData:false,
        contentType:false,
        success:res=>{
          console.log(res)
          if(res.code==1){
            var userInfo=this.userInfo
            userInfo.avatar=res.avatar;
            var newData=JSON.stringify(userInfo)
            localStorage.setItem("userInfo",newData)
            this.$router.go(0)
            alert("用户上传头像成功")
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
.up-avatar{
  margin-top: 60px;
}
</style>
