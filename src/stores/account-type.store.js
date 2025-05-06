import { defineStore } from 'pinia';

export const useAccountTypeStore = defineStore('accountType', {
  state: () => ({
    types: {
      EMAIL: { requiresVerification: true, code: 1 },
      PHONE: { requiresVerification: false, code: 0 }
    }
  }),
  
  getters: {
    // 获取所有账户类型
    allAccountTypes(state) {
        return Object.keys(state.types);
    },
    
    // 获取账户类型详情
    getAccountTypeDetails: (state) => (type) => {
        return state.types[type] || null;
    },
    
    // 根据code获取类型名称
    getTypeByCode: (state) => (code) => {
        return Object.keys(state.types).find(key => state.types[key].code === code);
    },
    
    // 检查类型是否需要验证
    requiresVerification: (state) => (type) => {
        return state.types[type]?.requiresVerification || false;
    }
  },
  
  actions: {
    // 验证账户类型是否有效
    isValidType(type) {
        return type in this.types;
    },
    
    // 根据code验证类型
    isValidCode(code) {
        return Object.values(this.types).some(t => t.code === code);
    }
  }
});