<template>
    <div class="official-avatar-container">
        <el-popover
            placement="bottom"
            :width="300"
            trigger="hover"
            popper-class="official-avatar-popover"
        >
            <template #reference>
                <div class="official-avatar-trigger">
                    <el-avatar 
                        :size="36"
                        :src="user.avatar_url || visitor.avatar_url"
                        class="official-avatar-image"
                    />
                    <span class="official-avatar-name">{{ user.nickname || visitor.nickname }}</span>
                </div>
            </template>
            <div class="official-avatar-card">
                <div class="official-card-header">
                    <el-avatar 
                        :size="64" 
                        :src="user.avatar_url || visitor.avatar_url"  
                        class="official-card-avatar"
                    />
                    <div class="official-card-info">
                        <h6>{{ user.nickname || visitor.nickname }}</h6>
                        <h4>{{ user.description || visitor.description }}</h4>
                        <el-tag v-if="user.id" type="success" size="small">已登录</el-tag>
                        <el-tag v-else type="info" size="small">游客</el-tag>
                    </div>
                </div>

                <el-divider />

                <div class="official-card-actions">
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
                    <official-auth v-else />
                </div>
            </div>
        </el-popover>
    </div>
</template>

<script setup>
import { User, Setting, SwitchButton } from '@element-plus/icons-vue'
import { useUserData } from '../../stores/user-stroe';
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import OfficialAuth from '../auth/auth.vue';
import SettingComponent from './Setting.vue';
import { removeToken } from '../../util/tokenUtil';
import { getUser } from '../../util/userUtil';


const isShowCard = ref(false);
const showCard = () => {
    isShowCard.value = !isShowCard.value;
};
const router = useRouter();
const route = useRoute();

const userData = useUserData();
try{
    const user = JSON.parse(getUser());
    if(user){
        userData.init(user.id,user.nickname,user.avatar_url,user.gender,user.description);
    }
}catch(err){

}
const { user, visitor } = storeToRefs(userData);

const goToProfile = (url) => {
    if (route.path!== url) {
        router.push({ path: url });
    }
};

const Settings = () => {
    // 设置 弹出 setting 组件
};

const logout = () => {
    userData.logout();
    removeToken();  
    router.push('/');
    window.location.reload() ;
};

</script>

<style scoped>
.official-avatar-container {
    display: flex;
    align-items: center;
    margin-left: 20px;
}

.official-avatar-trigger {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.3s;
    color: #007bff;
    border: 1px solid #007bff;

    &:hover {
        background-color: rgba(0, 123, 255, 0.1);
        transform: scale(1.02);
    }
}

.official-avatar-name {
    margin-left: 8px;
    font-size: 14px;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

:deep(.official-avatar-popover) {
    padding: 0 !important;
    border-radius: 8px;
    background-color: #fff;
    border: 1px solid #ced4da;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.official-avatar-card {
    padding: 16px;
}

.official-card-header {
    display: flex;
    align-items: center;
    padding-bottom: 12px;
    color: #333;
}

.official-card-avatar {
    margin-right: 16px;
}

.official-card-info {
    flex: 1;

    h4 {
        margin: 0 0 6px 0;
        font-size: 16px;
    }
}

.official-card-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    .el-button {
        width: 100%;
        margin: 0;
        color: #007bff;
        border: 1px solid #007bff;
        transition: all 0.3s;

        &:hover {
            background-color: rgba(0, 123, 255, 0.1);
            transform: scale(1.02);
        }
    }
}
</style>    