import { defineStore } from 'pinia';


export const useNotificationType = defineStore('notificationType', {
  state: () => ({
        notificationTypes: {
            0: { code: 0, name: "系统通知" ,unreadCount: 0,messages:[]},
            1: { code: 1, name: "点赞你的视频",unreadCount: 0,messages:[]},
            2: { code: 2, name: "点赞你的评论",unreadCount: 0,messages:[]},
            3: { code: 3, name: "回复你的评论",unreadCount: 0,messages:[]},
            4: { code: 4, name: "关注了你",unreadCount: 0,messages:[]},
            5: { code: 5, name: "私信了你",unreadCount: 0,messages:[]},
            6: { code: 6, name: "你订阅的频道有新的动态",unreadCount: 0,messages:[]},
            7: { code: 7, name: "服务器公告",unreadCount: 0,messages:[]}
        },
        unreadCount: 0,
        lastNotification: null
  }),
  
  getters: {

    allNotificationTypes(state) {
        return Object.values(state.notificationTypes);
    },
    
    getNotificationName(state) {
        return (code) => state.notificationTypes[code]?.name || '未知通知类型';
    },
    
    lastNotificationDetails(state) {
        return state.lastNotification !== null 
            ? state.notificationTypes[state.lastNotification]
            : null;
    }
  },
  
  actions: {
    setUnreadCount(count) {
        this.unreadCount = count;
    },
    
    incrementUnreadCount() {
        this.unreadCount++;
    },
    
    resetUnreadCount() {
        this.unreadCount = 0;
    },
    
    setLastNotification(code) {
        if (this.notificationTypes[code] !== undefined) {
            this.lastNotification = code;
        }
    },
    
    findNotificationCodeByName(name) {
        const entry = Object.entries(this.notificationTypes).find(
            ([_, value]) => value.name === name
        );
        return entry ? parseInt(entry[0]) : undefined;
    }
  }
});