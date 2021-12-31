import { createRouter, createWebHistory } from 'vue-router'

// 没有登录不能访问到后台界面。需要配置路由守卫。

const routes = [
    // 文章列表页面
    {
        path: "",
        name: "index",
        component: () => import("../views/Web/index.vue"),
        meta: {
            title: "简书"
        }
    },
    // 文章详情
    {
        path: '/article',
        name: "article",
        component: () => import("../views/Web/article.vue"),
        meta: {
            title: "文章详情"
        }

    },
    // 作者主页
    {
        path: '/authod',
        name: "authod",
        component: () => import("../views/Web/authod.vue"),
        meta: {
            title: "作者主页"
        }
    },
    // 搜索页面
    {
        path: "/serach",
        name: "serach",
        component: () => import("../views/Web/serach.vue")
    },
    // 普通用户后台
    {
        path: "/user",
        name: "user",
        component: () => import("../views/user/index1.vue"),
        children: [
            // 路由组件
            {
                path: "menu",
                name: "menu",
                component: () => import("../views/user/menu.vue"),
                children: [
                    // 作品管理
                    {
                        path: "manger/article",
                        name: "mangerArticle",
                        component: () => import("../views/user/manger/article.vue"),
                    },
                    // 粉丝数据
                    {
                        path: "data/fans",
                        name: "dataFans",
                        component: () => import("../views/user/data/fans.vue")
                    },
                    // 设置
                    {
                        path: "setup",
                        name: "setup",
                        component: () => import("../views/user/setup/index.vue")
                    },
                ]
            },
            // 创作
            {
                path: "create",
                name: "create",
                component: () => import("../views/user/create/index.vue")
            },
        ]
    },
    // 登录与注册
    {
        path: '/login',
        name: "Login",
        component: () => import("../views/Login/index.vue")
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes,

})

router.beforeEach((to, from) => {
    // 返回 false 以取消导航
    // document.title=to.matched[0].meta.title

    // 如果登录
    if (localStorage.user) {
        return true
    } else {
        // 没有登录
        if (to.name == "Login") {
            return true
        } else {
            // 重定向到登录页面
            return {
                path: "/login"
            }
        }
    }
})


router.afterEach((to, from) => {
    window.scrollTo(0, 0)
})

export default router