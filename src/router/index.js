import { createRouter, createWebHistory } from 'vue-router'

// 没有登录不能访问到后台界面。需要配置路由守卫。

const routes=[
    // 文章展示页面
    {
        path:"/",
        name:"Web",
        component:()=>import("../views/Web/index.vue")
    },
    // 普通用户后台
    {
        path:"/user",
        name:"user",
        component:()=>import("../views/user/index.vue"),
        children:[
            // 主页
            {
                path:"mainPage",
                name:"mainPage",
                component:()=>import("../views/user/mainPage/index.vue")
            },
            // 创作
            {
                path:"create",
                name:"create",
                component:()=>import("../views/user/create/index.vue")
            },
            // 作品管理
            {
                path:"manger/article",
                name:"mangerArticle",
                component:()=>import("../views/user/manger/article.vue")
            },
            // 评论管理
            {
                path:"manger/comment",
                name:"mangerComment",
                component:()=>import("../views/user/manger/comment.vue")
            },
            // 作品数据
            {
                path:"data/article",
                name:"dataArticle",
                component:()=>import("../views/user/data/article.vue")
            },
            // 粉丝数据
            {
                path:"data/fans",
                name:"dataFans",
                component:()=>import("../views/user/data/fans.vue")
            },
            // 设置
            {
                path:"setup",
                name:"setup",
                component:()=>import("../views/user/setup/index.vue")
            },
            
        ]
    },
    // 管理员路由
    {

    },
    {
        path:'/login',
        name:"Login",
        component:()=>import("../views/Login/index.vue")
    },
    // 注册
    {

    }


]

const router=createRouter({
    history:createWebHistory(),
    routes
})

export default router