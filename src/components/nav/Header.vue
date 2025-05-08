<template>
    <el-header class="official-header">
        <div class="header-container">
            <div class="left-nav">
                <div class="logo">
                    <img src="https://www.logosc.cn/uploads/icon/2019/06/28/38d5f0eb-575f-47cc-a985-b90c164120da.png" alt="logo" height="30">
                </div>
                <el-menu
                    :default-active="activeIndex"
                    @select="handleMenuItemClick"
                    class="no-collapse-menu"
                    :ellipsis="false"
                    mode="horizontal"
                >
                    <el-menu-item index="/direct-seeding" class="custom-menu-item">
                        <el-icon><VideoCamera /></el-icon>
                        <span>直播</span>
                    </el-menu-item>
                    <el-menu-item index="/news" class="custom-menu-item">
                        <el-icon><Reading /></el-icon>
                        <span>新闻</span>
                    </el-menu-item>
                    <el-sub-menu index="/" class="custom-menu-item" @click="goToHome">
                        <template #title>
                            <el-icon><House /></el-icon>
                            <span>首页</span>
                        </template>
                        <el-menu-item v-for="(category,idx) in categorys" :key="idx"
                         :index="`/video/${decodeURIComponent(category.name)}`">
                            {{ category.name }}
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
            
            <div class="search-area">
                <el-input
                    placeholder="Search"
                    prefix-icon="Search"
                    class="search-input"
                ></el-input>
            </div>
            
            <div class="right-tools">
                <div class="tool-container">
                    <div class="vip">
                        <button @click="handleMenuItemClick('/recharge')">大会员</button>
                    </div>
                    <notification />
                    <dynamic />
                    <favorite />
                    <create-center />
                    <el-divider direction="vertical" />
                    <avatar />
                </div>
            </div>
        </div>
    </el-header>
</template>

<script setup>
import { House, VideoCamera, Reading } from '@element-plus/icons-vue'
import { computed ,ref,onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Notification from './Notification.vue'
import Dynamic from './Dynamic.vue'
import Favorite from './Favorite.vue'
import CreateCenter from './CreateCenter.vue'
import Avatar from './Avatar.vue'
import {useVideoCategoryStore} from '../../stores/video-category.store';

const categorys=ref([]);
const route = useRoute()
const router = useRouter()
const videoCategory=useVideoCategoryStore();

const activeIndex = computed(() => route.path)

const goToHome = () => {
    if (route.path!== '/') {
        router.push('/')
    }
}

const handleMenuItemClick = (index) => {
    router.push(index)
}

onMounted(()=>{
    for(let category in videoCategory.categories){
        categorys.value.push(videoCategory.categories[category]);
    }
});
</script>

<style scoped>
.official-header {
    height: 60px;
    background-color: #ffffff;
    color: #333333;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-container {
    width: 100%;
    min-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.left-nav {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    min-width: 400px; 
}

.logo {
    margin-right: 20px;
}

.search-area {
    flex: 1;
    margin: 0 20px;
    min-width: 300px;
}

.search-input {
    width: 100%;
    max-width: 400px;
    background-color: #f8f9fa;
    color: #333333;
    border: 1px solid #ced4da;
}

.right-tools {
    display: flex;
    align-items: center;
    flex: 0 0 auto; 
    min-width: 300px;
}

.tool-container {
    display: flex;
    align-items: center;
    gap: 15px;
}

.notification-badge {
    margin-right: 5px;
}

.no-collapse-menu {
    flex: 1 1 auto;
    border-bottom: none !important;
    display: flex !important;
    overflow: visible !important;
}

.no-collapse-menu .el-menu-item,
.no-collapse-menu .el-sub-menu {
    flex-shrink: 0 !important;
    padding: 0 15px !important;
    transition: all 0.3s;
}

.custom-menu-item {
    width: auto !important;
    max-width: none !important;
}

.el-menu-item:hover {
    background-color: #f8f9fa;
    transform: scale(1.02);
}

.el-divider--vertical {
    height: 1.5em;
    background-color: #ced4da;
}
</style>    