import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';
import {createRouter,createWebHistory} from 'vue-router';

const routes=[
    {
        path: '/',
        name: 'Home',
        component: () => import('../pages/home/Home.vue')
    },
    {
        path:"/video/:categoryName",
        component:()=>import("../pages/video/Video.vue")
    },
    {
        path : "/video-detail/:videoId",
        component : ()=>import("../pages/video/VideoDetail.vue")
    },
    {
        path:"/direct-seeding",
        component:()=>import("../pages/direct-seeding/DirectSeeding.vue")
    },
    {
        path:"/news",
        component:()=>import("../pages/news/News.vue")
    },
    {
        path : "/profile",
        component :()=>import("../pages/profile/Profile.vue")
    },
    {
        path:"/recharge",
        component:()=>import("../pages/recharge/Recharge.vue")
    },
    {   
        path: '/login',
        component: ()=>import("../components/auth/LoginForm.vue") 
    },
    {
        path : '/register',
        component :()=>import("../components/auth/RegisterForm.vue")
    },
    {
        path:"/popularity-ranking",
        component:()=>import("../pages/video/PopularityRanking.vue")
    },
    {
        path:"/dynamic",
        component:()=>import("../pages/dynamic/Dynamic.vue")
    },
    {
        path:"/message",
        component:()=>import('../pages/message/Message.vue'),
        children:[
            {
                path:"reply",
                component:()=>import("../pages/message/child/Reply.vue")
            },
            {
                path:"like",
                component:()=>import("../pages/message/child/Like.vue")
            },
            {
                path:"system",
                component:()=>import('../pages/message/child/System.vue')
            },
            {
                path:"server",
                component:()=>import('../pages/message/child/Server.vue')
            },
            {
                path:"letter",
                component:()=>import("../pages/message/child/Letter.vue")
            }
        ]
    }
];

const router=createRouter({
    history:createWebHistory(),
    routes
});

export default router;