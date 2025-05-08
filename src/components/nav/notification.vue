<template>
    <el-menu
        :default-active="activeIndex"
        @select="handleMenuItemClick"
        :ellipsis="false"
        mode="horizontal"
    >
        <el-badge class="notification-badge">
            <el-sub-menu class="notification-badge" index="0">
                <template #title>
                    <el-icon><Message /></el-icon>
                    <span>消息 <span v-if="unreadCount>0" style="color: red;">{{ unreadCount }}</span></span>
                </template>
                <el-menu-item index="/message/reply">
                    <el-badge :value="notificationTypes[3].unreadCount" v-if="notificationTypes[3].unreadCount > 0">
                        回复了我
                    </el-badge>
                    <span v-else>回复了我</span>
                </el-menu-item>
                <el-menu-item index="/message/like">
                    <el-badge :value="notificationTypes[1].unreadCount + notificationTypes[2].unreadCount" v-if="notificationTypes[1].unreadCount + notificationTypes[2].unreadCount > 0">
                        收到的赞
                    </el-badge>
                    <span v-else>收到的赞</span>
                </el-menu-item>
                <el-menu-item index="/message/system">
                    <el-badge :value="notificationTypes[0].unreadCount" v-if="notificationTypes[0].unreadCount > 0">
                        系统消息
                    </el-badge>
                    <span v-else>系统消息</span>
                </el-menu-item>
                <el-menu-item index="/message/server">
                    <el-badge :value="notificationTypes[7].unreadCount" v-if="notificationTypes[7].unreadCount > 0">
                        我的消息
                    </el-badge>
                    <span v-else>我的消息</span>
                </el-menu-item>
                <el-menu-item index="/message/letter">
                    <el-badge :value="notificationTypes[5].unreadCount" v-if="notificationTypes[5].unreadCount > 0">
                        私信了我
                    </el-badge>
                    <span v-else>私信了我</span>
                </el-menu-item>
            </el-sub-menu>
        </el-badge>
    </el-menu>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { getScoket,MessageRequestOfRead } from '../../api/ws/listenNotification';
import { getToken } from '../../util/tokenUtil';
import { useNotificationType } from '../../stores/notification-type.store';
import { storeToRefs } from 'pinia';
import { Message } from '@element-plus/icons-vue';

const router = useRouter();
const notificationType = useNotificationType();
const { notificationTypes, unreadCount } = storeToRefs(notificationType);

const socket = ref(null);

function addUnread(code,msg) {
    for (let idx in notificationTypes.value) {
        if (code === notificationTypes.value[idx].code) {
            notificationTypes.value[idx].unreadCount++;
            notificationTypes.value[idx].messages.push(msg);
            return;
        }
    }
}


function collectMessage(notificationType){
    if(notificationType.messages.length===0){
        return null;
    }


    let ids = [];
    let user_id=null;
    for(let message of notificationType.messages){
        ids.push(message.message_id);
        user_id=message.user_id;
    }

    return new MessageRequestOfRead(user_id,ids);
}

/**
 * 
 * @param {MessageRequestOfRead} message 
 */
function readMessage(message){
    if(!socket.value || !message.messageIds || !message.messageIds.length >0) return ;
    socket.value.isReadNotification(message);
}

/**
 * @param {String[]} messages 
 */
function callback(messages) {
    for (let message of messages) {
        try {
            let msg = JSON.parse(message);
            addUnread(msg.type,msg);
        } catch (err) {
            console.error('Failed to parse message:', err);
        }
    }
    let count =0;
    for (let idx in notificationTypes.value){
        count+=notificationTypes.value[idx].unreadCount;
    }
    unreadCount.value =count;
    unreadCount.value -= notificationTypes.value[4].unreadCount;
    unreadCount.value -= notificationTypes.value[6].unreadCount;
}

const activeIndex = ref("");

/**
 * 
 * @param {String} index 
 */
function handleMenuItemClick(index) {
    activeIndex.value = index;
    let request=null;
    switch (index) {
        case '/message/reply':
            const replyCount = notificationTypes.value[3].unreadCount;
            request= collectMessage(notificationTypes.value[3]);
            if(request) readMessage(request);
            unreadCount.value -= replyCount;
            notificationTypes.value[3].unreadCount = 0;
            router.push('/message/reply');
            break;
        case '/message/like':
            const likeCount = notificationTypes.value[1].unreadCount + notificationTypes.value[2].unreadCount;
            request= collectMessage(notificationTypes.value[1]);
            if(request){
                let message = collectMessage(notificationTypes.value[2]);
                if(message) {
                    for(let id of message.messageIds){
                        request.messageIds.push(id);
                    }
                }
            }else{
                request=collectMessage(notificationTypes.value[2]);
            }

            if(request) readMessage(request);

            unreadCount.value -= likeCount;
            notificationTypes.value[1].unreadCount = notificationTypes.value[2].unreadCount = 0;
            router.push('/message/like');
            break;
        case '/message/system':
            const systemCount = notificationTypes.value[0].unreadCount;
            request= collectMessage(notificationTypes.value[0]);
            if(request) readMessage(request);
            unreadCount.value -= systemCount;
            notificationTypes.value[0].unreadCount = 0;
            router.push('/message/system');
            break;
        case '/message/server':
            const serverCount = notificationTypes.value[7].unreadCount;
            request= collectMessage(notificationTypes.value[7]);
            if(request) readMessage(request);
            unreadCount.value -= serverCount;
            notificationTypes.value[7].unreadCount = 0;
            router.push('/message/server');
            break;
        case '/message/letter':
            const letterCount = notificationTypes.value[5].unreadCount;
            request= collectMessage(notificationTypes.value[5]);
            if(request) readMessage(request);
            unreadCount.value -= letterCount;
            notificationTypes.value[5].unreadCount = 0;
            router.push('/message/letter');
            break;
        default:
            break;
    }
}

onMounted(() => {
    const token = getToken();
    if (token && !socket.value) {
        socket.value = getScoket(token);
        socket.value.connect(callback);
    }
});

onUnmounted(() => {
    if (socket.value) {
        socket.value.close();
        socket.value = null;
    }
});
</script>    