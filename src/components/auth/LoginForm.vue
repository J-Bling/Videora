<template>
    <div class="official-login-container">
        <el-radio-group v-model="isLoginByPass" class="login-mode-switch">
            <el-radio-button :value="true">密码登录</el-radio-button>
            <el-radio-button :value="false">验证码登录</el-radio-button>
        </el-radio-group>
        <el-form label-position="top">
            <el-form-item>
                <div class="account-row">
                    <el-input
                        @click.stop
                        @submit.native.prevent
                        v-model="loginForm.account"
                        :placeholder="loginForm.accountType ? '邮箱' : '手机号'"
                        :type="loginForm.accountType ? 'email' : 'tel'"
                        clearable
                    />
                    <el-select
                        v-model="loginForm.accountType"
                        class="account-type-select"
                        :teleported="false" 
                    >
                        <el-option :value="true" label="邮箱" />
                        <el-option :value="false" label="手机" />
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item v-if="!isLoginByPass">
                <div class="code-row">
                    <el-input
                        v-model="loginForm.code"
                        placeholder="验证码"
                        maxlength="6"
                        class="code-input"
                    />
                    <el-button
                        type="primary"
                        :disabled="isSendCoding"
                        @click="sendCode"
                        class="send-code-btn"
                    >
                        {{ isSendCoding ? `${time}秒后重试` : "获取验证码" }}
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item v-if="isLoginByPass">
                <el-input
                    v-model="loginForm.password"
                    placeholder="密码"
                    show-password
                    type="password"
                />
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    :loading="isLoading"
                    @click="login"
                    class="login-btn"
                >
                    {{ isLoading ? '登录中...' : '立即登录' }}
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.official-login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 30px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.account-row {
    display: flex;
    gap: 10px;
}

.account-type-select {
    width: 100px;
    flex-shrink: 0;
}

.code-row {
    display: flex;
    gap: 10px;
}

.code-input {
    flex: 1;
}

.send-code-btn {
    width: 120px;
    flex-shrink: 0;
    background-color: #007bff;
    color: white;
    transition: all 0.3s;

    &:hover {
        background-color: #0056b3;
        transform: scale(1.02);
    }
}

.login-btn {
    width: 50%;
    display: block;
    margin: 20px auto 0;
    background-color: #28a745;
    color: white;
    transition: all 0.3s;

    &:hover {
        background-color: #218838;
        transform: scale(1.02);
    }

    &.is-loading {
        opacity: 0.8;
    }
}

.login-mode-switch {
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
}

:deep(.el-input__wrapper),
:deep(.el-button) {
    min-width: 100px !important;
    transition: none !important;
}

:deep(.el-input) {
    --el-input-height: 40px;

    .el-input__wrapper {
        border-radius: 4px;
        border: 1px solid #ced4da;

        &:hover {
            border-color: #007bff;
        }

        &.is-focus {
            border-color: #007bff;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
    }
}
</style>

<script setup>
import { ref } from 'vue';
import { useUserData } from '../../stores/user-stroe'; 
import { useRouter } from 'vue-router';
import { setToken } from '../../util/tokenUtil';
import { auth, AuthRequest, SendCodeRequest } from '../../api/http/auth';
import { useCodeSceneStore } from '../../stores/code-scene.store';
import { ElNotification } from 'element-plus';
import { setUser } from '../../util/userUtil';

const emit = defineEmits(['close']); 

const userData = useUserData();
const router = useRouter();
const codeSceneStore = useCodeSceneStore();
const isLoading = ref(false);
const isSendCoding = ref(false);
const time = ref(60);
const loginForm = ref({
    account: "",
    accountType: true,
    code: "",
    password: "",
});

function successful(msg) {
    ElNotification({
        title: "Success",
        message: msg,
        type: 'success',
    });
}

function warning(msg) {
    ElNotification({
        title: 'Warning',
        message: msg,
        type: "warning"
    });
}

function erroring(msg) {
    ElNotification({
        title: "Error",
        message: msg,
        type: "error"
    });
}

const isLoginByPass = ref(true);

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
}

function isValidPassword(password) {
    return password.length>=6;
}

function isValidCode(code) {
    const codeRegex = /^\d{6}$/;
    return codeRegex.test(code);
}

function validateForm() {
    if (loginForm.value.accountType) {
        if (!isValidEmail(loginForm.value.account)) {
            warning("请输入有效的邮箱地址");
            return false;
        }
    } else {
        if (!isValidPhone(loginForm.value.account)) {
            warning("请输入有效的手机号码");
            return false;
        }
    }

    if (isLoginByPass.value) {
        if (!isValidPassword(loginForm.value.password)) {
            warning("密码必须至少包含8个字符,并且至少包含一个字母和一个数字");
            return false;
        }
    } else {
        if (!isValidCode(loginForm.value.code)) {
            warning("验证码必须是6位数字");
            return false;
        }
    }

    return true;
}

function startTimer() {
    isSendCoding.value = true;
    const interval = setInterval(() => {
        time.value--;
        if (time.value <= 0) {
            clearInterval(interval);
            isSendCoding.value = false;
            time.value = 60;
        }
    }, 1000);
}

async function sendCode() {
    if (loginForm.value.accountType) {
        if (!isValidEmail(loginForm.value.account)) {
            warning("请输入有效的邮箱地址");
            return;
        }
    } else {
        if (!isValidPhone(loginForm.value.account)) {
            warning("请输入有效的手机号码");
            return;
        }
    }

    isLoading.value = true;
    const request = new SendCodeRequest(loginForm.value.account, loginForm.value.accountType, codeSceneStore.scenes.LOGIN.code);
    try {
        startTimer();
        const response = await auth.sendCode(request);
        if (response.message === 'ok') {
            successful("验证码发送成功");
        }
    } catch (error) {
        if (error.response) {
            console.error("Error sending code:", error);
            erroring(error.response.data.data);
        } else {
            console.error("Error sending code:", error);
            erroring("网络错误，请稍后再试");
        }
    } finally {
        isLoading.value = false;
    }
}

async function login() {
    if (!validateForm()) {
        return;
    }

    isLoading.value = true;
    
    const request = new AuthRequest('',
        loginForm.value.accountType ? null : loginForm.value.account,
        loginForm.value.accountType ? loginForm.value.account : null,
        loginForm.value.code,
        loginForm.value.password
    );
    try {
        const response = isLoginByPass.value ? await auth.loginByPass(request) : await auth.loginByCode(request);
        if (response.message === 'ok') {
            setToken(response.data.token);
            const user = response.data.user;
            if (user) {
                userData.init(user.id, user.nickname, user.avatar_url, user.gender, user.description);
                try{
                    setUser(JSON.stringify(user))
                }catch(err){

                }
            }
            successful("登录成功");
            router.push({ path: '/' });
            // window.location.reload() ;
        } else {
            erroring(response.message);
        }
    } catch (error) {
        if (error.response) {
            console.error("Error login", error);
            erroring(error.response.data.data);
        } else {
            console.error("Error login", error);
            erroring("网络错误，请稍后再试");
        }
    } finally {
        isLoading.value = false;
    }
}
</script>    