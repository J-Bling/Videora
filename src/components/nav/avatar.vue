<template>
    <div class="avatar-container">
    <el-popover
        placement="bottom"
        :width="300"
        trigger="hover"
        popper-class="avatar-popover"
    >
        <template #reference>
        <div class="avatar-trigger">
            <el-avatar 
            :size="36"
            :src="user.avatar_url || visitor.avatar_url"
            class="avatar-image"
            />
            <span class="avatar-name">{{ user.nickname || visitor.nickname }}</span>
        </div>
        </template>
        <div class="avatar-card">
        <div class="card-header">
            <el-avatar 
            :size="64" 
            :src="user.avatar_url || visitor.avatar_url"  
            class="card-avatar"
            />
            <div class="card-info">
            <h4>{{ user.nickname || visitor.nickname }}</h4>
            <el-tag v-if="user.id" type="success" size="small">已登录</el-tag>
            <el-tag v-else type="info" size="small">游客</el-tag>
            </div>
        </div>

        <el-divider />

        <div class="card-actions">
            <template v-if="user.id">
            <el-button 
                type="primary" 
                size="small" 
                @click="goToProfile('/profile')"
                plain
            >
                <el-icon><User /></el-icon> 个人主页
            </el-button>
            <el-button 
                size="small" 
                @click="Settings"
                plain
            >
                <el-icon><Setting /></el-icon> 账号设置
            </el-button>
            <el-button 
                type="danger" 
                size="small" 
                @click="logout"
                plain
            >
                <el-icon><SwitchButton /></el-icon> 退出登录
            </el-button>
            </template>
            <auth v-else />
        </div>
        </div>
    </el-popover>
    </div>
</template>
<script setup>
import { User, Setting, SwitchButton } from '@element-plus/icons-vue'
import {useUserData} from '../../stores/user-stroe';
import {storeToRefs} from 'pinia'
import { useRouter,useRoute } from 'vue-router';
import {ref} from 'vue';
import auth from '../auth/auth.vue';
import setting from './setting.vue';
import {removeToken} from '../../util/tokenUtil';


const isShowCard=ref(false);
const showCard=()=>{
    isShowCard.value=!isShowCard.value;
};
const router = useRouter();
const route = useRoute();

const userData= useUserData();
const {user,visitor} = storeToRefs(userData);


const goToProfile = (url) => {
    if(route.path!==url){
        router.replace({path:url});
    }
};

const Settings = () => {
    //设置 弹出setting组件
};

const logout = () => {
    user.value.logout();
    removeToken();
    router.push({path:'/'});
};

</script>
<style scoped>
.avatar-container {
    display: flex;
    align-items: center;
    margin-left: 20px;
}

.avatar-trigger {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 18px;
    transition: all 0.3s;

    &:hover {
    background-color: var(--el-color-primary-light-9);
    }
}

.avatar-name {
    margin-left: 8px;
    font-size: 14px;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
:deep(.avatar-popover) {
    padding: 0 !important;
    border-radius: 8px;
}

.avatar-card {
    padding: 16px;
}

.card-header {
    display: flex;
    align-items: center;
    padding-bottom: 12px;
}

.card-avatar {
    margin-right: 16px;
}

.card-info {
    flex: 1;
    
    h4 {
    margin: 0 0 6px 0;
    font-size: 16px;
    }
}

.card-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    .el-button {
    width: 100%;
    margin: 0;
    }
}
</style>