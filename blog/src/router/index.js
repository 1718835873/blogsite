/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-10 09:15:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-16 21:12:17
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/Login"
import Home from "@/views/Home"
import ForgetCode from "@/views/ForgetCode"
import Personal from "@/views/Personal"
import Add from "@/views/Add"
import EditorNickname from "@/views/editorNickname"
import UpAvatar from "@/views/upAvatar"
import BlogDetail from "@/views/blogDetail"
import NotFound from "@/views/notFound"
import MyBlogList from "@/views/myBlogList"
import Index from "@/views/Index"
import Collect from "@/views/Collect"
import EditorBlog from "@/views/editorBlog"
import SearchValue from '@/views/searchValue';
import BlogList from "@/components/blogList";

Vue.use(Router)

var router= new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      redirect: "/login"
    },{
      path:"/login",
      name:"Login",
      component:Login
    },{
      path:"/index",
      name:"Index",
      component: Index,
      children:[
        
        {
          path: "home",
          name: "Home",
          component: Home,
          meta: { requireAuth: true },
          children: [
            {
              path: "blogs",
              name: "BlogList",
              component: BlogList
            },
            {
              path: "",
              redirect: "blogs"
            },
            
          ]
        },
        { path: "", redirect: "home" },
        {
          path: "personal",
          name: "Personal",
          component: Personal,
          children: [
            {
              path: "",
              redirect: "bloglist"
            },
            {
              path: "bloglist",//我的博客列表
              name: 'MyBlogList',
              component: MyBlogList
            }, {
              path: "collect",//我的收藏列表
              name: 'Collect',
              component: Collect
            }, {
              path: "add",
              name: "Add",
              component: Add//添加博客
            }, {
              path: "editorname",
              name: "EditorName",
              component: EditorNickname
            }, {
              path: "upavatar",
              name: "UpAvatar",
              component: UpAvatar,
            }
          ]
        }
      ]
    },
    {
      path:"/editorBlog",
      name:"EditorBlog",
      component: EditorBlog
    },
    {
      path:"/searchValue",
      name:"SearchValue",
      component: SearchValue
    },
    {
      path:"/forgetcode",
      name:"ForgetCode",
      component: ForgetCode
    },{
      path:"/blogdetail",
      name:"BlogDetail",
      component: BlogDetail
    },{
      path:"/404",
      name:"notFound",
      component: NotFound
    },{//定义404页面
      path:"*",
      redirect:"404"
    }
  ]
})

router.beforeEach((to,from,next)=>{
  let flag=sessionStorage.getItem("flag");
  // 先判断页面是否需要登录后才能进入
  if(to.meta.requireAuth==true){
    if(!flag){
      next({
       path: "/login"
      })
    }else{
      next();
    }
  }else{
    next()//不需要登录权限的路由直接进入下一步
  }
})
export default router;