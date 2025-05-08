<template>
    <div class="official-register-container">
        <el-radio-group v-model="registerRequest.accountType" class="register-mode-switch">
            <el-radio-button :value="true">邮箱注册</el-radio-button>
            <el-radio-button :value="false">手机注册</el-radio-button>
        </el-radio-group>

        <el-form label-position="top">
            <el-form-item required>
                <el-input
                    v-model="registerRequest.nickname"
                    placeholder="用户昵称 6-12位字符,不含特殊符号"
                    clearable
                    @blur="validateForm"
                />
            </el-form-item>

            <el-form-item required>
                <el-input
                    v-model="registerRequest.account"
                    :placeholder="registerRequest.accountType ? '请输入邮箱' : '请输入手机号'"
                    :type="registerRequest.accountType ? 'email' : 'tel'"
                    clearable
                    @blur="validateForm"
                />
            </el-form-item>

            <el-form-item required>
                <div class="code-row">
                    <el-input
                        v-model="registerRequest.code"
                        placeholder="验证码 6位数字验证码"
                        maxlength="6"
                        @blur="validateForm"
                    />
                    <el-button
                        type="primary"
                        :disabled="isSendCoding"
                        @click="sendCode"
                        class="send-code-btn"
                    >
                        {{ isSendCoding ? `${time}秒后重发` : '获取验证码' }}
                    </el-button>
                </div>
            </el-form-item>

            <el-form-item required>
                <el-input
                    v-model="registerRequest.password"
                    type="password"
                    placeholder="密码 至少8位,包含字母和数字"
                    show-password
                    clearable
                    @blur="validateForm"
                />
            </el-form-item>

            <el-form-item>
                <el-button
                    type="primary"
                    :loading="isLoading"
                    @click="register"
                    class="register-btn"
                >
                    {{ isLoading ? '注册中...' : '立即注册' }}
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.official-register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 30px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.register-mode-switch {
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
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

.register-btn {
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

:deep(.el-input__wrapper),
:deep(.el-button) {
    min-width: 100px !important;
    transition: none !important;
}

:deep(.el-form-item__label) {
    font-weight: 500;
    color: #333;
    padding-bottom: 8px;
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
import { auth, SendCodeRequest, AuthRequest } from '../../api/http/auth';
import { userApi } from '../../api/http/user';
import { ref } from 'vue';
import { setToken } from '../../util/tokenUtil';
import { useUserData } from '../../stores/user-stroe';
import { useRouter } from 'vue-router';
import { useCodeSceneStore } from '../../stores/code-scene.store';
import { ElNotification } from 'element-plus';

const isShowCard = ref(true);
const time = ref(60);
const isSendCoding = ref(false);
const router = useRouter();
const isLoading = ref(false);
const userData = useUserData();
const registerRequest = ref({
    nickname: "",
    account: "",
    accountType: true,
    code: "",
    password: "",
});
const codeSceneStore = useCodeSceneStore();

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
    })
}

function erroring(msg) {
    ElNotification({
        title: "Error",
        message: msg,
        type: "error"
    })
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
}

function isValidCode(code) {
    const codeRegex = /^\d{6}$/;
    return codeRegex.test(code);
}

function isValidNickname(username) {
    const allowedChars = /^[a-zA-Z0-9_]+$/;
    const isLengthValid = username.length >= 6 && username.length <= 12;
    const hasNoSpecialChars = allowedChars.test(username);
    return isLengthValid && hasNoSpecialChars;
}

function validateForm() {
    if (registerRequest.value.accountType) {
        if (!isValidEmail(registerRequest.value.account)) {
            warning("请输入有效的邮箱地址");
            return false;
        }
    } else {
        if (!isValidPhone(registerRequest.value.account)) {
            warning("请输入有效的手机号码");
            return false;
        }
    }

    if (!isValidPassword(registerRequest.value.password)) {
        warning("密码必须至少包含8个字符,并且至少包含一个字母和一个数字");
        return false;
    }

    if (!isValidCode(registerRequest.value.code)) {
        warning("验证码必须是6位数字");
        return false;
    }
    if (!isValidNickname(registerRequest.value.nickname)) {
        warning("用户名称不符合规范 不能包括特殊字符 以及在6-12个字符之间");
        return false;
    }
    return true;
}

async function getUserData(id) {
    try {
        if (!id) return;
        const data = await userApi.getUserDataBase(id);
        console.log(data);
        if (data) {
            userData.init(data.id, data.nickname, data.avatar_url, data.gender, data.description);
        }
    } catch (err) {
        if (err.response) {
            erroring(err.response.data.message);
        } else {
            erroring("网络错误，请稍后再试");
        }
        console.log("getUser error :", err);
    }
}

async function sendCode() {
    if (registerRequest.value.accountType) {
        if (!isValidEmail(registerRequest.value.account)) {
            warning("请输入有效的邮箱地址");
            return;
        }
    } else {
        if (!isValidPhone(registerRequest.value.account)) {
            warning("请输入有效的手机号码");
            return;
        }
    }

    isLoading.value = true;
    const request = new SendCodeRequest(
        registerRequest.value.account,
        registerRequest.value.accountType,
        codeSceneStore.scenes.REGISTER.code
    );
    startTimer();
    try {
        const response = await auth.sendCode(request);
        if (response) {
            successful("验证码已经发送 请查收");
        }
    } catch (error) {
        if (error.response) {
            erroring(error.response.data.message);
        } else {
            erroring("网络错误，请稍后再试");
        }
        console.log("sendCode error :", error);
    } finally {
        isLoading.value = false;
    }
}

async function register() {
    if (!validateForm()) {
        return;
    }

    isLoading.value = true;
    const request = new AuthRequest(
        registerRequest.value.nickname,
        !registerRequest.value.accountType ? registerRequest.value.account : null,
        registerRequest.value.accountType ? registerRequest.value.account : null,
        registerRequest.value.code,
        registerRequest.value.password
    );

    try {
        const response = await auth.register(request);
        console.log(response);
        if (response) {
            const token = response.data.token;
            const id = response.data.id;
            setToken(token);
            await getUserData(id);
            successful("注册成功 正在跳转主页");
            router.replace({ path: "/" });
        }
    } catch (error) {
        if (error.response) {
            erroring(error.response.data.message);
        } else {
            erroring("网络错误，请稍后再试");
        }
        console.log("register error :", error);
    } finally {
        isLoading.value = false;
    }
}
</script>    