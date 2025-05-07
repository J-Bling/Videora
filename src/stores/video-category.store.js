import { defineStore } from 'pinia';

export const useVideoCategoryStore = defineStore('videoCategory', {
  state: () => ({
    categories: {
        ANIMATION: { name: "动画", description: "动画、番剧、国创等内容" },
        MUSIC: { name: "音乐", description: "原创音乐、翻唱等" },
        DANCE: { name: "舞蹈", description: "宅舞、街舞、国风舞蹈等" },
        GAME: { name: "游戏", description: "游戏实况、攻略、电竞赛事等" },
        KNOWLEDGE: { name: "知识", description: "科普、人文历史、科技数码等" },
        TECHNOLOGY: { name: "科技", description: "编程、极客、技术教程等" },
        SPORTS: { name: "运动", description: "体育赛事、健身、户外运动等" },
        LIFE: { name: "生活", description: "日常、美食、旅行、搞笑等" },
        FOOD: { name: "美食", description: "美食制作、探店、吃播等" },
        FASHION: { name: "时尚", description: "美妆、穿搭、潮流等" },
        ENTERTAINMENT: { name: "娱乐", description: "综艺、明星、影视杂谈等" },
        MOVIE: { name: "影视", description: "电影、电视剧、影视剪辑等" },
        ORIGINAL: { name: "原创", description: "UP主原创视频" },
        DOCUMENTARY: { name: "纪录片", description: "人文自然、历史纪录等" },
        FAN_SUBTITLE: { name: "鬼畜", description: "鬼畜调教、音MAD等" },
        CAR: { name: "汽车", description: "汽车评测、改装、赛事等" },
        VLOG: { name: "VLOG", description: "个人生活记录、旅行日志等" }
    },
    currentCategory: 'ANIMATION'
  }),
});