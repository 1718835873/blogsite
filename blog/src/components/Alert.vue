<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-11 18:06:01
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-11 20:09:11
-->
<template>
    <div>
        <div class="container">
            <div class="alert-area">
            <!-- 我是提示信息 -->
            <div class="alert alert-danger" role="alert">{{alertMsg}}</div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        alertMsg:{
            type:String
        }
    },
    data() {
        return {

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

    },
    components: {

    },
};
</script>

<style scoped>
.alert-area{
    position:absolute;
    width: 70%;
    left: 50%;
    transform: translateX(-50%);
    top: 30px;
}
</style>
