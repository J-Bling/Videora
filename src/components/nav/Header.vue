<template>
    <el-header class="main-header">
    <div class="header-container">
        <div class="left-nav">
        <div class="logo">
            <img src="https://www.logosc.cn/uploads/icon/2019/06/28/38d5f0eb-575f-47cc-a985-b90c164120da.png" alt="logo" height="30">
        </div>
        <el-menu
            :default-active="activeIndex.toString()"
            mode="horizontal"
            @select="handleMenuItemClick"
            class="no-collapse-menu"
        >
            <el-menu-item index="1" class="custom-menu-item">
            <nav-tabs />
            </el-menu-item>
            <el-menu-item index="2" class="custom-menu-item">
            <el-icon><VideoCamera /></el-icon>
            <span>直播</span>
            </el-menu-item>
            <el-menu-item index="3" class="custom-menu-item">
            <el-icon><Reading /></el-icon>
            <span>新闻</span>
            </el-menu-item>
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
            <vip />
            <el-badge :value="12" class="notification-badge">
            <notification />
            </el-badge>
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

<style scoped>
.header-container {
    width: 100%;
    min-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.main-header {
    height: 60px;
    background-color: #ffffff;
    color: #0d0f0e;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
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

.no-collapse-menu .el-menu-item {
    flex-shrink: 0 !important;
    padding: 0 15px !important;
}

.custom-menu-item {
    width: auto !important;
    max-width: none !important;
}

.el-menu-item:hover {
    background-color: rgba(210, 44, 44, 0.1) !important;
}

.el-divider--vertical {
    height: 1.5em;
    background-color: #30119f;
}
</style>
<script setup>
import {
  VideoCamera,
  Reading,
  Bell
} from '@element-plus/icons-vue';
import { ref } from 'vue';
import NavTabs from './NavTabs.vue';
import Vip from './Vip.vue';
import Notification from './Notification.vue';
import Dynamic from './Dynamic.vue';
import Favorite from './Favorite.vue';
import CreateCenter from './CreateCenter.vue';
import Avatar from './Avatar.vue';

const activeIndex = ref(1);

const handleMenuItemClick = (index) => {
    activeIndex.value = Number(index);
};
</script>