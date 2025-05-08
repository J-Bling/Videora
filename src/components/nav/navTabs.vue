<template>
    <div class="nav-tabs-container">
        <el-popover
            placement="bottom-start"
            :width="320"
            trigger="hover"
            popper-class="nav-popover"
        >
            <!-- <template #reference>
                <el-button
                    class="nav-tab"
                    :type="isActive('/') ? 'primary' : 'info'"
                    @click="pushRoute('/')"
                >
                    <el-icon><House /></el-icon>
                    首页
                </el-button>
            </template> -->  
            <div class="category-menu">
                <el-row :gutter="12">
                    <el-col 
                    v-for="(category, index) in categoryList" 
                    :key="index" 
                    :span="8"
                    >
                        <el-button
                            class="category-item"
                            :type="isActive(`/video/${category.name}`) ? 'primary' : 'info'"
                            @click="pushRoute(`/video/${encodeURIComponent(category.name)}`)"
                        >
                            <span class="category-name">{{ category.name }}</span>
                            <el-tooltip :content="category.description" placement="right">
                                <el-icon class="info-icon"><InfoFilled /></el-icon>
                            </el-tooltip>
                        </el-button>
                    </el-col>
                </el-row>
            </div>
        </el-popover>
    </div>
</template>

<script setup>
import { House, InfoFilled } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useVideoCategoryStore } from '../../stores/video-category.store'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const videoCcategory = useVideoCategoryStore().categories

const categoryList = computed(() => {
    return Object.values(videoCcategory)
})

const isActive = (path) => {
    const decodedPath = decodeURIComponent(path)
    const decodedRoutePath = decodeURIComponent(route.path)
    return decodedRoutePath === decodedPath
}

const pushRoute = (url) => {
    const decodedUrl = decodeURIComponent(url)
    const decodedRoutePath = decodeURIComponent(route.path)
    if(decodedUrl !== decodedRoutePath){
    router.push(url)
    }
}
</script>

<style scoped>
.nav-tabs-container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
}

.nav-tab {
    width: 100%;
    &:hover {
        color: var(--el-color-primary);
        border-bottom-color: var(--el-color-primary-light-5);
    }
    
    &.is-active {
        border-bottom-color: var(--el-color-primary);
    }
}

:deep(.nav-popover) {
    padding: 12px !important;
}

.category-menu {
    max-height: 400px;

}

.category-item {
    width: 100%;
    margin-bottom: 8px;
    justify-content: space-between;
    padding: 8px 12px;
    transition: all 0.2s;
    
    &:hover {
    background-color: var(--el-color-primary-light-9);
    }
}

.category-name {
    flex: 1;
    text-align: left;
}

.info-icon {
    color: var(--el-color-info);
    margin-left: 8px;
}
</style>