<template>
  <div class="official-auth-container">
      <el-button link @click="dialogVisible = true">登录/注册</el-button>
      <el-dialog
          v-model="dialogVisible"
          :title="isLogin ? '登录' : '注册'"
          width="450px"
          class="official-auth-dialog"
      >
          <component 
              :is="currentComponent"
              @close="dialogVisible = false"
              ref="authComponentRef"
          />
          <div class="official-auth-switch">
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
.official-auth-container {
  color: #007bff;
}

.official-auth-dialog {
  :deep(.el-dialog) {
      background-color: #fff;
      border: 1px solid #ced4da;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  :deep(.el-dialog__body) {
      padding: 20px 30px;
      color: #333;
  }

  .official-auth-switch {
      margin-top: 20px; 
      text-align: center;
  }
}

.el-button--text {
  padding: 0;
  color: #007bff;
  transition: all 0.3s;

  &:hover {
      background: transparent;
      color: #0056b3;
      transform: scale(1.02);
  }
}

.el-link {
  color: #007bff;
  transition: all 0.3s;

  &:hover {
      color: #0056b3;
      text-decoration: underline;
  }
}
</style>    