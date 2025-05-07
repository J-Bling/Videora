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
        component: ()=>import("../components/auth/auth.vue") 
    },
];

const router=createRouter({
    history:createWebHistory(),
    routes
});

export default router;