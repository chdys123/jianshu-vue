import { createRouter, createWebHistory } from 'vue-router'

// 没有登录不能访问到后台界面。需要配置路由守卫。

const routes=[
    {
        path:"/",
        name:"Web",
        component:()=>import("../views/Web/index.vue")
    },
    {
        path:"/admin",
        name:"Admin",
        component:()=>import("../views/Home/index.vue"),
        children:[
            {
                path:'user/personal',
                name:'UserPersonal',
                component:()=>import("../views/User/personal.vue"),
                meta:{
                    title:"个人资料"
                }
            },
            {
                path:'user/password',
                name:'UserPassword',
                component:()=>import("../views/User/password.vue"),
                meta:{
                    title:"修改密码"
                }
            },
            {
                path:"article",
                name:"AdminArticle",
                component:()=>import("../views/Article/index.vue"),
                meta:{
                    title:"文章列表"
                }
            },
            {
                path:"article/add",
                name:"ArticleAdd",
                component:()=>import("../views/Article/add.vue"),
                meta:{
                    title:"发布文章"
                }
            },
            {
                path:"comment",
                name:"Comment",
                component:()=>import("../views/Comment/index.vue"),
                meta:{
                    title:"评论管理"
                }
            },
            {
                path:"fans",
                name:"Fans",
                component:()=>import("../views/Fans/index.vue"),
                meta:{
                    title:"粉丝管理"
                }
            },
            {
                path:"star",
                name:"Star",
                component:()=>import("../views/Star/index.vue"),
                meta:{
                    title:"点赞管理"
                }
            }
        ]
    },
    {
        path:'/login',
        name:"Login",
        component:()=>import("../views/Login/index.vue")
    }


]

const router=createRouter({
    history:createWebHistory(),
    routes
})

export default router