<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-10 17:56:25
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-14 13:27:52
-->
<template>
    <div class="area">
        <div class="alert alert-info" role="alert">修改昵称</div>
        <div class="editor-nickname form-horizontal">
            <!-- <h3>修改昵称</h3> -->
            <div class="form-group">
                <label for="newName" class="col-sm-2 control-label">新昵称</label>
                <div class="col-sm-8">
                <input type="text" class="form-control" placeholder="请输入新昵称" v-model="userName">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button class="btn btn-success" @click="eidtor">修改</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"EditorNickname",
    props: {

    },
    data() {
        return {
            userName:"",
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
        eidtor(){

            var userName=this.userName;
            if(!userName){
                alert("请输入新昵称")
                return;
            }

            $.ajax({
                url:"http://localhost:3000/editorNickname",
                method:"POST",
                data:{userId:this.userInfo.userId,userName:userName},
                success:res=>{
                    console.log(res)
                    if(res.code==1){
                        var userInfo=this.userInfo;
                        userInfo.userName=res.data
                        var newData=JSON.stringify(userInfo);
                        console.log(newData)
                        localStorage.setItem("userInfo",newData)
                        alert("用户修改昵称成功")
                    }else{
                        alert("用户修改昵称失败")
                    }
                    
                    this.userName=""
                },
                error:err=>{
                    console.log(err)
                }
            })
        },
    },
    components: {

    },
};
</script>

<style scoped>
.area{
    margin-top: 60px;
}
</style>
