import { defineStore } from 'pinia';

export const useCodeSceneStore = defineStore('codeScene', {
  state: () => ({
        scenes: {
            LOGIN: { code: 1, value: "login" },
            REGISTER: { code: 2, value: "register" },
            RESET: { code: 3, value: "reset" }
        },
        currentScene: null
  }),
  
  getters: {
    // 获取所有场景类型
    allScenes(state) {
        return Object.keys(state.scenes);
    },
    
    // 获取场景详情
    getSceneDetails: (state) => (scene) => {
        return state.scenes[scene] || null;
    },
    
    // 根据code获取场景名称
    getSceneByCode: (state) => (code) => {
        return Object.keys(state.scenes).find(key => state.scenes[key].code === code);
    },
    
    // 根据value获取场景名称
    getSceneByValue: (state) => (value) => {
        return Object.keys(state.scenes).find(key => state.scenes[key].value === value);
    },
    
    // 获取当前场景详情
    currentSceneDetails(state) {
         return state.currentScene ? this.getSceneDetails(state.currentScene) : null;
    }
  },
  
  actions: {
    // 设置当前场景
    setCurrentScene(scene) {
        if (scene in this.scenes) {
            this.currentScene = scene;
        }
    },
    
    // 根据code设置当前场景
    setCurrentSceneByCode(code) {
        const scene = this.getSceneByCode(code);
        if (scene) {
            this.currentScene = scene;
        }
    },
    
    // 根据value设置当前场景
    setCurrentSceneByValue(value) {
        const scene = this.getSceneByValue(value);
        if (scene) {
            this.currentScene = scene;
        }
    },
    
    // 验证场景是否有效
    isValidScene(scene) {
        return scene in this.scenes;
    },
    
    // 验证code是否有效
    isValidCode(code) {
        return Object.values(this.scenes).some(s => s.code === code);
    },
    
    // 验证value是否有效
    isValidValue(value) {
        return Object.values(this.scenes).some(s => s.value === value);
    }
  }
});