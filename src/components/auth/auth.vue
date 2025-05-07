<template>
    <div class="auth-container">
      <el-button link @click="dialogVisible = true">登录/注册</el-button>
      <el-dialog
        v-model="dialogVisible"
        :title="isLogin ? '登录' : '注册'"
        width="450px"
        class="auth-dialog"
      >
        <component 
          :is="currentComponent"
          @close="dialogVisible = false"
          ref="authComponentRef"
        />
        <div class="auth-switch">
          {{ isLogin ? '还没有帐号？' : '已有帐号？' }}
          <el-link 
            type="primary" 
            @click="toggleAuth"
            style="margin-left: 8px"
          >
            {{ isLogin ? '立即注册' : '立即登录' }}
          </el-link>
        </div>
      </el-dialog>
    </div>
</template>

<script setup>
import { ref, shallowRef, computed, nextTick } from 'vue'
import LoginComponent from './LoginForm.vue'
import RegisterComponent from './RegisterForm.vue'

const authComponentRef = ref(null)
const dialogVisible = ref(false)
const isLogin = ref(true)

const loginComponent = shallowRef(LoginComponent)
const registerComponent = shallowRef(RegisterComponent)

const currentComponent = computed(() => 
    isLogin.value ? loginComponent.value : registerComponent.value
)

const toggleAuth = async () => {
    isLogin.value = !isLogin.value
    await nextTick()
    if (authComponentRef.value?.clearForm) {
    authComponentRef.value.clearForm()
    }
}
</script>

<style scoped>
.auth-dialog {
  :deep(.el-dialog) {
    height: 500px !important;
  }
  
  :deep(.el-dialog__body) {
    height: calc(100% - 54px) !important;
    padding: 20px 30px;
    overflow-y: auto; 
    display: flex;
    flex-direction: column;
  }

  .auth-switch {
    margin-top: auto; 
    padding-top: 20px; 
    text-align: center;
  }
}

.el-button--text {
    padding: 0;
    &:hover {
        background: transparent;
    }
}
</style>